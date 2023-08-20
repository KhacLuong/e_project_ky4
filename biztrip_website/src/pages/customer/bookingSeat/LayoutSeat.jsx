import React from 'react';
import img from "../../../assets/image/turn_02.jpg";
import {IoPersonSharp, IoTicketOutline} from "react-icons/io5";
import {IoMdClose} from "react-icons/io";
import {MdEventSeat} from "react-icons/md";
import {GiSteeringWheel} from "react-icons/gi";
import {toast} from "react-toastify";
import {RiArrowLeftRightLine, RiArrowLeftSLine} from "react-icons/ri";
import {convertCurrentTimeToTimeFormat, formatPriceToVND} from "../../../utils/helper.jsx";

const LayoutSeat = ({
                        rows, // số hàng
                        maxBoxesPerRow, // số cột tối đa = 5
                        coachLayout, // array ghế
                        departureName, // nơi đi
                        destinationName, // nơi đến
                        dispatch, // dispatch reducer
                        seatsReducer, // danh sách vé đã thêm
                        handleGoNext, // function chuyển tab
                        setCoachLayout, // cập nhật giao diện khi chọn vé
                        priceFrom,
                        name, // tên xe
                        startTimeOfDistance, // thời gian bắt đầu của chuyến đi
                        endTimeOfDistance, // thời gian kết thúc
                        selectedBoxes,
                        setSelectedBoxes}) => {

    const isSelectedBox = (rowIndex, columnIndex) => {
        const boxKey = `${rowIndex}-${columnIndex}`;
        return selectedBoxes.includes(boxKey);
    };
    const handleSelectSeat = (rowIndex, columnIndex, coachLayout) => {
        if (coachLayout[rowIndex][columnIndex].type === 'seat') {
            const boxKey = `${rowIndex}-${columnIndex}`;
            const isSelected = isSelectedBox(rowIndex, columnIndex)
            const updateCoachLayout = coachLayout.map((row, i) =>
                row.map((box, j) => {
                    if (i === rowIndex && j === columnIndex) {
                        return {
                            ...box,
                            isSelected: !isSelected && i === rowIndex && j === columnIndex,
                        }
                    } else {
                        return {
                            ...box
                        }
                    }
                })
            );
            setCoachLayout(updateCoachLayout)
            if (!isSelected && coachLayout[rowIndex][columnIndex].type === 'seat') {
                setSelectedBoxes((prevSelectedBoxes) => [...prevSelectedBoxes, boxKey])
                dispatch({
                    type: "INCREMENT",
                    payload: {
                        data: coachLayout[rowIndex][columnIndex],
                    }
                })
                toast.success("Chọn vé thành công")
            } else if (isSelected && coachLayout[rowIndex][columnIndex].type === 'seat') {
                setSelectedBoxes((prevSelectedBoxes) =>
                    prevSelectedBoxes.filter((box) => box !== boxKey)
                );
                dispatch({
                    type: "DECREMENT",
                    payload: {
                        data: coachLayout[rowIndex][columnIndex],
                    }
                })
            }
        }
    }
    const renderCoachLayout = (coachLayout) => {
        const layout = []
        const columnLabels = ['A', 'B', 'C', 'D', 'E']
        layout.push(
            <div key={`position-alphabet-top`} className={`flex justify-center items-center relative mb-8`}>
                {
                    columnLabels.map((label, index) => (
                        <span key={index}
                              className="w-16 text-center font-semibold text-lg h-7 text-black mr-1.5 last:mr-0 relative">{label}</span>
                    ))
                }
            </div>
        )
        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let column = 0; column < maxBoxesPerRow; column++) {
                const boxKey = `${row}-${column}`
                const position = coachLayout[row][column]
                const label = column === 0 ? row + 1 : ''
                columns.push(
                    <div key={boxKey}
                         className={`w-16 h-16 relative text-sm mr-1.5 last:mr-0 ${position.type === 'seat' ? '' : ''}`}>
                        {
                            label && column === 0 && (
                                <div
                                    className="absolute flex top-1/2 -left-2/3 transform -translate-y-1/2 font-semibold text-lg text-black">
                                    <span className={`flex items-center justify-center h-full w-full`}>{label}</span>
                                </div>
                            )
                        }
                        {
                            position.type === 'seat' &&
                            <div
                                className={`group/seat w-full h-full text-gray-500 relative rounded-xl`}>
                                {
                                    position.state === null &&
                                    <>
                                        <div onClick={() => handleSelectSeat(row, column, coachLayout)}
                                             className={`${position.isSelected ? 'selected bg-successColor text-white' : ''} relative transition-all duration-300 ease-in-out cursor-pointer hover:bg-primaryColor_hover hover:border-primaryColor_hover hover:text-white w-full h-full rounded-xl bg-[#ececec]`}>
                                            <span className={`flex items-center justify-center h-full w-full`}>
                                                <MdEventSeat className={`w-7 h-7`}/>
                                            </span>
                                        </div>
                                        <div
                                            className={`absolute whitespace-nowrap -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 opacity-90 rounded p-2 text-white group-hover/seat:block hidden transition-all duration-300 ease-in-out`}>
                                            <span
                                                className={`after:absolute after:content-[''] after:top-full after:left-1/2 after:w-0 after:h-0 after:border-[7px] after:-ml-[7px]  after:border-solid after:border-transparent after:border-t-gray-800 border-gray-800`}>
                                                Số ghế: {position.seatCode} - Giá: {position.priceTicketId.fare}
                                            </span>
                                        </div>
                                    </>
                                }
                                {
                                    position.state !== null &&
                                    <div
                                        className={`cursor-not-allowed w-full h-full rounded-xl relative ${position.state === 'Pending' ? 'bg-violetColor' : 'bg-dangerColor-default_2'}`}>
                                            <span className={`flex items-center justify-center h-full w-full`}>
                                                {
                                                    position.state === 'Pending'
                                                        ? <IoPersonSharp className={`w-7 h-7 text-white`}/>
                                                        : <IoMdClose className={`w-7 h-7 text-white`}/>
                                                }
                                            </span>
                                    </div>
                                }
                            </div>
                        }
                        {
                            position.type === 'driver' &&
                            <div
                                className={`group/seat w-full h-full relative cursor-not-allowed border-2 rounded-xl bg-[#ececec] text-gray-500`}>
                                 <span className={`flex items-center justify-center h-full w-full`}>
                                   <GiSteeringWheel className={`w-8 h-8`}/>
                                 </span>
                            </div>
                        }
                        {
                            position.type === 'entrance' &&
                            <div
                                className={`group/seat w-full h-full relative cursor-not-allowed border-2 rounded-xl bg-[#ececec] text-gray-500`}>
                                 <span className={`flex items-center justify-center h-full w-full`}>
                                   <RiArrowLeftRightLine className={`w-8 h-8`}/>
                                 </span>
                            </div>
                        }
                    </div>
                )
            }
            layout.push(
                <div key={row}
                     className={`flex justify-center items-center mb-4 relative mt-4`}>
                    {columns}
                </div>
            )
        }
        layout.push(
            <div key={`position-alphabet-bottom`} className={`flex justify-center items-center relative mt-8`}>
                {
                    columnLabels.map((label, index) => (
                        <span key={index}
                              className="w-16 text-center font-semibold text-lg h-7 text-black mr-1.5 last:mr-0 relative">{label}</span>
                    ))
                }
            </div>
        )
        return layout;
    }
    return (
        <>
            <div className={`grid grid-cols-8 gap-3 bg-white rounded-2xl rounded-tl-none p-3`}>
                <div
                    className={`col-span-6 flex flex-row items-center justify-start bg-gray-100 p-4 rounded-2xl`}>
                    <img src={img} alt={``} className={`h-12 mr-2 object-cover`}/>
                    <div className={`flex flex-col items-center justify-start`}>
                        <h4 className={`font-semibold text-lg w-full text-start text-primaryColor_hover`}>
                            Đối với mọi khách hàng
                        </h4>
                        <p className={`font-medium text-gray-600 w-full text-start`}>
                            Chúng tôi cam kết giữ đúng vị trí khách hàng đã chọn.
                        </p>
                    </div>
                </div>
                <div
                    className={`col-span-2 flex items-center justify-start bg-gray-100 flex-col p-4 rounded-2xl`}>
                    <h4 className={`font-semibold text-lg w-full text-start`}>{formatPriceToVND(priceFrom)}</h4>
                    <p className={`font-medium text-gray-600 w-full text-start`}>
                        lựa chọn tốt nhất cho bạn
                    </p>
                </div>
                <div className={`col-span-4 flex justify-between flex-col`}>
                    <div className={`flex flex-col mb-2`}>
                    <span className={`text-sm font-bold text-gray-500 mb-2 mt-4`}>
                        #{name}
                    </span>
                        <h5 className={`font-semibold text-base mb-2`}>
                            <span>
                                {departureName} <span
                                className={`font-normal`}>({convertCurrentTimeToTimeFormat(startTimeOfDistance, "HH:mm")})</span>
                            </span>
                            <span className={`mx-2`}>-</span>
                            <span>
                                {destinationName} <span
                                className={`font-normal`}>({convertCurrentTimeToTimeFormat(endTimeOfDistance, "HH:mm")})</span>
                            </span>
                        </h5>
                        <div className={`overflow-y-scroll h-[288px] pr-5`}>
                            {
                                seatsReducer && seatsReducer.seatsState.length > 0 && seatsReducer.seatsState.map((item, index) => (
                                    <div key={index}
                                         className={`w-full -mr-1 ml-1 mb-3 border-[1px] p-4 rounded-2xl flex items-center justify-between relative shadow`}>
                                        <div className={`flex items-center text-gray-500`}>
                                            <IoTicketOutline
                                                className={`text-successColor_hover w-7 h-7 mr-3`}/>
                                            Vị trí:<span
                                            className={`text-black font-semibold ml-1.5`}>{item?.seatCode}</span>
                                        </div>
                                        <div className={`text-gray-500`}>
                                            Giá vé:<span
                                            className={`text-black font-semibold ml-1.5`}>{item?.priceTicketId?.fare} VNĐ</span>
                                        </div>
                                        <span
                                            className={`absolute h-[70%] w-[3px] bg-successColor_hover -left-0 -translate-x-1/2 rounded-lg`}></span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className={`border-b-[1px] py-2`}>
                            <div className={`flex items-center`}>
                                <div
                                    className={`w-10 h-10 flex items-center justify-center bg-dangerColor-default_2 rounded-xl`}>
                                    <IoMdClose className={`w-5 h-5 text-white`}/>
                                </div>
                                <span className={`ml-4 font-semibold`}>Không có sẵn</span>
                            </div>
                        </div>
                        <div className={`border-b-[1px] py-2`}>
                            <div className={`flex items-center`}>
                                <div
                                    className={`w-10 h-10 flex items-center justify-center bg-[#ececec] rounded-xl`}>
                                    <MdEventSeat className={`w-5 h-5 text-gray-500`}/>
                                </div>
                                <span className={`ml-4 font-semibold`}>Còn trống</span>
                            </div>
                        </div>
                        <div className={`border-b-[1px] py-2`}>
                            <div className={`flex items-center`}>
                                <div
                                    className={`w-10 h-10 flex items-center justify-center bg-successColor rounded-xl`}>
                                    <MdEventSeat className={`w-5 h-5 text-white`}/>
                                </div>
                                <span className={`ml-4 font-semibold`}>Bạn đang chọn</span>
                            </div>
                        </div>
                        <div className={`py-2`}>
                            <div className={`flex items-center`}>
                                <div
                                    className={`w-10 h-10 flex items-center justify-center bg-violetColor rounded-xl`}>
                                    <IoPersonSharp className={`w-5 h-5 text-white`}/>
                                </div>
                                <span className={`ml-4 font-semibold`}>
                                    Người khác đang chọn
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-span-4 h-full flex justify-center `}>
                    <div
                        className={`bg-gray-100 w-full rounded-2xl px-4 flex items-center justify-center py-8`}>
                        <div className={`h-[550px] w-full overflow-y-scroll`}>
                            {renderCoachLayout(coachLayout)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-100 pt-[30px]`}>
                <div className={`flex justify-between items-center`}>
                    <div className={`w-1/2 flex items-center justify-between`}>
                        <h3 className={`font-semibold text-xl`}>Số
                            lượng: {seatsReducer.countSeat} vé</h3>
                        <h3 className={`font-semibold text-xl`}>Tổng
                            tiền: {formatPriceToVND(seatsReducer.total)}</h3>
                    </div>
                    <div className={`flex items-center`}>
                        <button
                            onClick={handleGoNext}
                            className={`flex items-center duration-300 text-white bg-primaryColor hover:bg-primaryColor_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center`}>
                            Tiếp tục
                            <RiArrowLeftSLine className={`rotate-180 mt-0.5 w-6 h-6`}/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutSeat;