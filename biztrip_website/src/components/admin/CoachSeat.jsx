import React, {useEffect, useState} from 'react'
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import {MdEventSeat, MdOutlineSave} from "react-icons/md"
import {TbSteeringWheel} from "react-icons/tb"
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"
import {fetchAllPriceTicket} from "../../redux/slices/priceTicketSlice.jsx"
import {produce} from "immer";
import {groupByPosition} from "../../utils/helper.jsx";
import {RiArrowLeftRightLine} from "react-icons/ri";

const CoachSeat = ({formState, setFormState}) => {
    const maxBoxesPerRow = 5
    const [rows, setRows] = useState(8)
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [boxType, setBoxType] = useState('space');
    const [typeRow, setTypeRow] = useState('')
    const [coachLayout, setCoachLayout] = useState(() => Array.from({length: rows}, () =>
        Array.from({length: maxBoxesPerRow}, () => ({
            id: 0,
            type: 'space',
            seatCode: '',
            priceTicketId: 0,
            price: 0,
            typeRow: null
        })))
    )
    const [priceTicket, setPriceTickets] = useState([])
    const [priceTicketId, setPriceTicketId] = useState(0)
    const [price, setPrice] = useState(0)
    const [isAnyBoxSelected, setIsAnyBoxSelected] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (formState.id !== 0 && formState.seats.length > 0) {
            const nextState = produce([], draft => {
                formState.seats.length > 0 && formState.seats.map(item => {
                    draft.push({
                        id: item?.id,
                        type: item?.type,
                        seatCode: item?.seatCode,
                        position: item?.position,
                        priceTicketId: item?.priceTicketId ? item?.priceTicketId?.id : 0,
                        price: item?.priceTicketId ? item?.priceTicketId?.fare : 0,
                        typeRow: item?.typeRow
                    })
                })
            })
            setRows(nextState.length / maxBoxesPerRow)
            setCoachLayout(groupByPosition(nextState))
        }
    }, [formState.id])

    useEffect(() => {
        const test = async () => {
            const res = await dispatch(fetchAllPriceTicket({})).unwrap()
            if (res && res.code === 200) {
                setPriceTickets(res.data)
            }
        }
        test()
    }, [])


    useEffect(() => {
        setIsAnyBoxSelected(selectedBoxes.length > 0);
    }, [selectedBoxes]);
    const handleBoxClick = (rowIndex, columnIndex) => {
        const boxKey = `${rowIndex}-${columnIndex}`;
        const isSelected = isSelectedBox(rowIndex, columnIndex);
        if (isSelected) {
            setSelectedBoxes((prevSelectedBoxes) =>
                prevSelectedBoxes.filter((box) => box !== boxKey)
            );
        } else {
            setSelectedBoxes((prevSelectedBoxes) => [...prevSelectedBoxes, boxKey]);
        }
        const selectedBoxData = coachLayout[rowIndex][columnIndex];
        setBoxType(selectedBoxData.type);
        setPriceTicketId(selectedBoxData.priceTicketId || 0);
        setPrice(selectedBoxData.price || 0)
        setTypeRow(selectedBoxData.typeRow || null)
    };
    const isSelectedBox = (rowIndex, columnIndex) => {
        const boxKey = `${rowIndex}-${columnIndex}`;
        return selectedBoxes.includes(boxKey);
    };
    const generateSeatCode = (rowIndex, columnIndex) => {
        const columnCode = String.fromCharCode(65 + columnIndex);
        const seatNumber = rowIndex + 1;
        return `${columnCode}${seatNumber}`;
    };
    const handleSetPriceForSeat = (e) => {
            const price = e.target.selectedOptions[0].text.match(/(\d+)/);
        setPrice(+price[0])
        setPriceTicketId(+e.target.value)
    }
    const handleSetTypeRow = e => {
        const {value} = e.target.selectedOptions[0]
        setTypeRow(value)
    }
    const handleSaveSeat = (e) => {
        e.preventDefault();
        if (priceTicketId === 0 && boxType === 'seat') {
            toast.error("Vui lòng chọn giá vé cho ghế")
            return
        }
        const updatedLayout = coachLayout.map((row, rowIndex) => {
            return row.map((position, columnIndex) => {
                const boxKey = `${rowIndex}-${columnIndex}`;
                if (selectedBoxes.includes(boxKey)) {
                    return {
                        id: position?.id ? position.id : 0,
                        type: boxType,
                        seatCode: boxType === 'seat' ? generateSeatCode(rowIndex, columnIndex) : '',
                        priceTicketId: boxType === 'seat' ? priceTicketId : 0,
                        price: boxType === 'seat' ? price : 0,
                        typeRow: boxType === 'seat' ? typeRow : null
                    };
                }
                return position;
            });
        });
        setCoachLayout(updatedLayout);
        setSelectedBoxes([]);
        setBoxType(null);
        setPriceTicketId(0);
        setTypeRow('')
    };
    const handleSaveAllSeat = (e) => {
        e.preventDefault();
        const dataToSend = coachLayout.flatMap((row, rowIndex) =>
            row.map((position, columnIndex) => {
                const positionIndex = rowIndex * maxBoxesPerRow + columnIndex + 1;
                return {
                    ...position,
                    position: positionIndex,
                };
            })
        );
        const listPrice = dataToSend.filter(item => {
            return item.type === "seat"
        })
        const minPrice = listPrice.reduce((min, item) => {
            if (item.price < min) {
                return item.price;
            }
            return min;
        }, listPrice[0].price);

        const total = dataToSend.filter(item => item.type === "seat").length
        setFormState((prev) => ({
            ...prev,
            totalSeats: total,
            seats: dataToSend,
            priceFrom: minPrice
        }))
        toast.success("Lưu sơ đồ xe thành công")
    };
    const handleAddRow = (e) => {
        e.preventDefault()
        setCoachLayout((prevLayout) => {
            const newLayout = [...prevLayout];
            const newRow = Array.from({length: maxBoxesPerRow}, () => ({
                id: 0,
                type: "space",
                seatCode: '',
                priceTicketId: 0,
                price: 0,
                typeRow: null
            }));
            newLayout.push(newRow);
            return newLayout;
        });
        setRows((prevRows) => prevRows + 1);
    }
    const handleRemoveLastRow = (e) => {
        e.preventDefault();
        const newRow = rows - 1;
        if (newRow < 4) {
            toast.error("Tối thiểu phải có 4 hàng");
        } else {
            setCoachLayout((prevLayout) => {
                const updatedLayout = [...prevLayout];
                updatedLayout.pop();
                return updatedLayout;
            });
            setRows(newRow);
        }
    };
    const renderCoachLayout = (coachLayout) => {
        const layout = [];
        const columnLabels = ['A', 'B', 'C', 'D', 'E'];
        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let column = 0; column < maxBoxesPerRow; column++) {
                const position = coachLayout[row][column];
                const boxKey = `${row}-${column}`;
                const isSelected = isSelectedBox(row, column);
                const label = column === 0 ? row + 1 : '';
                columns.push(
                    <div
                        key={boxKey}
                        className={`border-2 rounded-xl w-16 h-16 cursor-pointer text-sm hover:bg-primaryColor hover:text-white text-gray-500 transition-all duration-300 ease-in-out mr-1.5 last:mr-0 relative ${isSelected ? 'selected bg-successColor text-white' : 'bg-white'}`}
                        onClick={() => handleBoxClick(row, column)}
                    >
                        {
                            label && column === 0 && (
                                <span
                                    className="absolute flex top-1/2 -left-1/2 transform -translate-y-1/2 text-base font-semibold text-primaryColor">{label}</span>
                            )
                        }
                        <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                            {position.type === 'space' ? `${row * maxBoxesPerRow + column + 1}` :
                                <Icon type={position.type}/>}
                       </span>
                    </div>
                );
            }
            layout.push(
                <div key={row}
                     className={`flex justify-center items-center mb-4 relative mt-4`}>
                    {row === 0 && (
                        <div className="absolute w-full flex justify-between items-center top-0 left-0 -mt-8">
                            {columnLabels.map((label, index) => (
                                <span key={index}
                                      className="block w-16 h-16 font-semibold text-base text-center text-primaryColor">{label}</span>
                            ))}
                        </div>
                    )}
                    {
                        row === rows - 1
                            ? <div className={`absolute -left-10 top-32 flex justify-between w-[72%] flex-row-reverse`}>
                                <button onClick={(e) => handleRemoveLastRow(e)}
                                        className={`group/delete transition-all duration-300 cursor-pointer flex items-center bg-white border-[1px] text-sm rounded-md px-2 py-1 scale-[1.01] hover:scale-[1.03] hover:shadow-md`}>
                                    <AiFillMinusCircle
                                        className={`w-6 h-6 text-dangerColor-default_2 whitespace-nowrap group-hover/delete:text-dangerColor-hover_2 duration-300 transition-all ease-in-out mr-1.5`}/>
                                    Xóa hàng
                                </button>
                                <button onClick={(e) => handleAddRow(e)}
                                        className={`group/add transition-all duration-300 cursor-pointer flex items-center bg-white border-[1px] text-sm rounded-md px-2 py-1 scale-[1.01] hover:scale-[1.03] hover:shadow-md`}>
                                    <AiFillPlusCircle
                                        className={`w-6 h-6 text duration-300 transition-all ease-in-out text-successColor group-hover/add:text-successColor_hover mr-1.5`}/>
                                    Thêm hàng
                                </button>
                            </div>
                            : null
                    }
                    {columns}
                </div>
            );
        }
        return layout;
    };

    return (
        <div className={`relative`}>
            <div className={`inline-block min-w-full align-middle`}>
                <div className="grid grid-cols-2 gap-6 mb-1.5">
                    <div className={`col-span-1 flex justify-center`}>
                        <div className={`w-max bg-white shadow-md relative rounded-xl px-10 pb-8 pt-20`}>
                                <span
                                    className={`absolute bg-gray-300 w-full h-14 top-0 right-0 left-0 rounded-t-xl text-center`}>
                                    <p className={`mt-2.5 text-gray-800 text-xl font-medium`}>Tùy chỉnh sơ đồ xe</p>
                                </span>
                            {renderCoachLayout(coachLayout)}
                        </div>
                    </div>
                    <div className={`col-span-1 h-full flex flex-col relative`}>
                        {
                            isAnyBoxSelected && (
                                <div className="sticky w-96 top-24 right-0 bg-white shadow-xl p-4 rounded-xl">
                                    <div className={`flex flex-col mb-4`}>
                                        <label htmlFor="position-type"
                                               className={`block mb-2 text-sm font-medium text-gray-900`}>Loại vị
                                            trí</label>
                                        <select
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                            id="position-type"
                                            value={boxType || ''}
                                            onChange={(e) => setBoxType(e.target.value)}
                                        >
                                            <option value="space">Khoảng trống</option>
                                            <option value="entrance">Cửa ra / vào</option>
                                            <option value="seat">Ghế cho hành khách</option>
                                            <option value="driver">Ghế cho lái xe</option>
                                        </select>
                                    </div>
                                    {
                                        boxType && boxType === 'seat' &&
                                        <>
                                            <div className={`flex flex-col mb-6`}>
                                                <label htmlFor={`priceTicketId`}
                                                       className={`block mb-2 text-sm font-medium text-gray-900`}>Giá vé</label>
                                                <select id={`priceTicketId`}
                                                        value={+priceTicketId ? +priceTicketId : 0}
                                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                                        onChange={handleSetPriceForSeat}>
                                                    <option value={0}>Chọn</option>
                                                    {
                                                        priceTicket && priceTicket.length > 0 ?
                                                            priceTicket.map((priceTicket, index) => {
                                                                return <option value={priceTicket.id} key={`ticket-${index}`}>
                                                                    {priceTicket.title} - {priceTicket.fare}đ
                                                                </option>
                                                            }) : null
                                                    }
                                                </select>
                                            </div>
                                            <div className={`flex flex-col mb-6`}>
                                                <label htmlFor={`typeRow`}
                                                       className={`block mb-2 text-sm font-medium text-gray-900`}>Vị trí hàng ghế</label>
                                                <select id={`typeRow`}
                                                        value={typeRow}
                                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                                        onChange={handleSetTypeRow}>
                                                    <option value={''}>Chọn</option>
                                                    <option value={'Top'}>Hàng đầu</option>
                                                    <option value={'Middle'}>Hàng giữa</option>
                                                    <option value={'Bottom'}>Hàng cuối</option>
                                                </select>
                                            </div>
                                        </>
                                    }

                                    <div className={`flex items-center justify-end`}>
                                        <button onClick={handleSaveSeat}
                                                className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                            <MdOutlineSave className={`mr-2 -ml-1 w-4 h-4`}/>
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={`flex justify-end items-center`}>
                <button onClick={handleSaveAllSeat}
                        className=" duration-300 text-white bg-successColor hover:bg-successColor_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Lưu danh sách
                </button>
            </div>
        </div>
    )
};

const Icon = ({type}) => {
    return <div>{type === 'seat' ?
        <MdEventSeat className={`w-8 h-8`}/> :
        type === 'entrance' ? <RiArrowLeftRightLine className={`w-8 h-8`}/> :
            <TbSteeringWheel className={`w-8 h-8`}/>}</div>
};

export default CoachSeat