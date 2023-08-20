import React, {useEffect, useState} from 'react'
import Slider from "@mui/material/Slider"
import Checkbox from '@mui/material/Checkbox';
import parse from "html-react-parser"
import {AiOutlineMinus} from "react-icons/ai";
import {formatPriceToVND, renderStar} from "../../../utils/helper.jsx";
import {IoAddOutline, IoRemoveOutline} from "react-icons/io5";
import {toast} from "react-toastify";
import {LuFilter} from "react-icons/lu";
import {
    fetchGetCountOfDistanceInAfternoon,
    fetchGetCountOfDistanceInDawn,
    fetchGetCountOfDistanceInEvening,
    fetchGetCountOfDistanceInMorning
} from "../../../redux/slices/distanceSlice.jsx";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

const Filter = ({
                    listCoach,
                    price,
                    setPrice,
                    setAvailableSeat,
                    listDropOff,
                    listPickUp,
                    setTimeSlot,
                    timeSlot,
                    setPriceMin,
                    setPriceMax,
                    setTypeRow,
                    setPickUp,
                    setDropOff,
                    setRating,
                    dispatch,
                    scheduleId,
                    listFilter,
                    setListFilter
                }) => {
    const minDistance = 0
    const [count, setCount] = useState(1)
    const [type, setType] = useState('')
    const [countDawn, setCountDawn] = useState(0)
    const [countMorning, setCountMorning] = useState(0)
    const [countAfternoon, setCountAfternoon] = useState(0)
    const [countEvening, setCountEvening] = useState(0)
    useEffect(() => {
        const test = async () => {
            const dawn = await dispatch(fetchGetCountOfDistanceInDawn({scheduleId})).unwrap()
            if (dawn && dawn.code === 200) {
                setCountDawn(dawn.data)
            }
            const morning = await dispatch(fetchGetCountOfDistanceInMorning({scheduleId})).unwrap()
            if (morning && morning.code === 200) {
                setCountMorning(morning.data)
            }
            const afternoon = await dispatch(fetchGetCountOfDistanceInAfternoon({scheduleId})).unwrap()
            if (afternoon && afternoon.code === 200) {
                setCountAfternoon(afternoon.data)
            }
            const evening = await dispatch(fetchGetCountOfDistanceInEvening({scheduleId})).unwrap()
            if (evening && evening.code === 200) {
                setCountEvening(evening.data)
            }
        }
        test()
    }, [listCoach, scheduleId])
    const handleChangeTimeSlot = (e, time) => {
        e.preventDefault()
        if (timeSlot !== "" && timeSlot === time) {
            setTimeSlot("")
        } else {
            setTimeSlot(time)
        }
    }
    const handleFilterByPrice = () => {
        setPriceMin(price[0])
        setPriceMax(price[1])
    }
    const handleUpdatePrice = (e, data, activeThumb) => {
        if (!Array.isArray(data)) {
            return;
        }
        if (activeThumb === 0) {
            setPrice([Math.min(data[0], data[1] - minDistance), data[1]]);
        } else {
            setPrice([price[0], Math.max(data[1], price[0] + minDistance)]);
        }
    }
    const handleMinusAvailableSeat = (e) => {
        e.preventDefault();
        let minus = count - 1
        setCount(minus)
        if (minus < 1) {
            minus = 1
            setCount(minus)
            toast.error('Tối thiểu là 1')
        }
    }
    const handlePlusAvailableSeat = (e) => {
        e.preventDefault();
        let plus = count + 1
        setCount(plus)
        if (plus > 50) {
            plus = 50
            setCount(plus)
            toast.error('Tối đa là 50')
        }
    }
    const handleChangeCheckBox = (event, setState) => {
        const checkboxValue = event.target.value;

        setState((prevType) => {
            if (event.target.checked) {
                // Add the value to typeRow if the checkbox is checked
                if (!prevType) {
                    return checkboxValue;
                } else {
                    return prevType + '|' + checkboxValue;
                }
            } else {
                // Remove the value from typeRow if the checkbox is unchecked
                return prevType.replace(new RegExp('\\b' + checkboxValue + '\\b', 'g'), '').replace(/\|+/g, '|').replace(/^\||\|$/g, '');
            }
        });
    };
    const handleFilterByAvailableSeat = () => {
        setAvailableSeat(count)
        setTypeRow(type)
    }
    const handleCountCoachInListLocation = (location, listCoach, type) => {
        return location.map((location) => ({
            ...location,
            count: listCoach.reduce((acc, item) => {
                if (type === 'departure') {
                    return (
                        acc + item.pickUpDtoList.filter((point) => point.locationId === location.id).length
                    );
                } else if (type === 'destination') {
                    return (
                        acc + item.dropOffDtoList.filter((point) => point.locationId === location.id).length
                    );
                }
            }, 0),
        }));
    }
    const getTimeInMilliseconds = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(":");
        const date = new Date();
        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));
        date.setSeconds(Number(seconds));
        return date.getTime();
    }

    const countByTimeRange = (timeRange) => {
        const [start, end] = timeRange.split("-");
        const startTimeMilliseconds = getTimeInMilliseconds(start);
        const endTimeMilliseconds = getTimeInMilliseconds(end);

        return listCoach.reduce((count, item) => {
            const itemTimeMilliseconds = getTimeInMilliseconds(item.startTimeOfDistance);
            if (itemTimeMilliseconds >= startTimeMilliseconds && itemTimeMilliseconds <= endTimeMilliseconds) {
                return count + 1;
            }
            return count;
        }, 0);
    };

    function updateStarsCount(listCoach, stars) {
        return stars.map((star) => ({
            ...star,
            count: listCoach?.avgOfGeneralRating ? listCoach?.avgOfGeneralRating : 0
        }))
    }

    return (
        <div className={`col-span-1`}>
            <div className={`flex justify-between items-center border-[1px] p-2 rounded-md`}>
                <span className={`text-lg font-medium text-[#4d4d4d] flex items-center`}><LuFilter
                    className={`w-5 h-5 mr-1.5`}/>Lọc</span>
                {/*<button*/}
                {/*    className={`text-white bg-dangerColor-default_2 hover:bg-dangerColor-hover_2 duration-300 rounded-md px-3 py-1 text-sm cursor-pointer uppercase`}>Xóa*/}
                {/*    lọc*/}
                {/*</button>*/}
            </div>
            <div className={`border-[1px] p-[16px] text-base mt-3 rounded-md`}>
                <div className={`flex flex-col`}>
                    <p className={`font-medium text-base text-[#4d4d4d]`}>Giờ đi</p>
                    <div className={`grid grid-cols-2 gap-3 mt-3`}>
                        {
                            timeRanges.map((timeRange, index) => {
                                return (
                                    <button key={index} onClick={(e) => handleChangeTimeSlot(e, timeRange)}
                                            className={`${timeSlot === timeRange && "border-primaryColor_hover"} hover:shadow-md duration-300 w-full h-auto flex flex-col items-center justify-center p-2 border-[1px] border-borderColor rounded-md`}>
                                        <p className={`text-[#4d4d4d] mb-[4px] leading-4 text-sm`}>
                                            {index === 0 ? "Sáng sớm" : index === 1 ? "Buổi sáng" : index === 2 ? "Buổi chiều" : "Buổi tối"}
                                            <span className={`ml-1`}>
                                                {index === 0 ? '(' + countDawn + ')' : index === 1 ? '(' + countMorning + ')' : index === 2 ? '(' + countAfternoon + ')' : '(' + countEvening + ')'}
                                            </span>
                                        </p>
                                        <p className={`text-[#707070] text-sm leading-4 mb-0`}>
                                            {index === 0 ? "00:00 - 06:00" : index === 1 ? "06:01 - 12:00" : index === 2 ? "12:01 - 18:00" : "18:01 - 23:59"}
                                        </p>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={`mt-[26px] `}>
                    <p className={`font-medium text-base text-[#4d4d4d]`}>Giá vé</p>
                    <div className={`mx-auto`}>
                        <div className={`px-2`}>
                            <Slider
                                value={price}
                                onChange={(e, data, activeThumb) => handleUpdatePrice(e, data, activeThumb)}
                                getAriaLabel={() => 'Minimum distance'}
                                disableSwap
                                min={0}
                                max={10000000}
                                className={`text-primaryColor`}
                                valueLabelDisplay="off"
                                sx={{
                                    color: '#1861c5', '& .MuiSlider-rail': {
                                        background: '#1861c5', height: '2px'
                                    }, '& .MuiSlider-track': {
                                        borderRadius: '16px', background: '#1861c5', height: '2px'
                                    }, '& .MuiSlider-thumb': {
                                        background: '#fff', width: '15px', height: '15px', border: '2px solid #1861c5'
                                    },
                                }}
                            />
                        </div>
                        <div className={`text-[#4d4d4d] text-sm leading-normal font-medium flex items-center`}>
                            Từ:
                            <div className={`flex items-center text-[#141414] text-sm font-normal`}>
                                <span className={`mx-1`}>{formatPriceToVND(price[0])}</span><AiOutlineMinus
                                className={``}/><span
                                className={`mx-1`}>{formatPriceToVND(price[1])}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`flex justify-end items-center mt-2`}>
                        <button onClick={handleFilterByPrice}
                                className={`uppercase px-4 py-2 rounded-md border-[1px] bg-primaryColor text-white text-xs font-semibold hover:bg-primaryColor_hover transition duration-300 tracking-wider`}>
                            Lọc
                        </button>
                    </div>
                </div>
                <div className={`mt-[26px] flex flex-col`}>
                    <p className={`font-medium text-base text-[#4d4d4d]`}>Vị trí ghế</p>
                    <div className={`flex flex-col py-4 border-b-[1px]`}>
                        <div className={`flex flex-row justify-between items-center`}>
                            <p className={`text-[#141414] text-sm font-normal`}>Số ghế trống</p>
                            <div className={`flex items-center justify-center`}>
                                <button onClick={handleMinusAvailableSeat} data-action="decrement"
                                        className={`${count === 1 ? "bg-[#f7f7f7] text-[#00000040]" : "bg-[#edf3fd] text-primaryColor"} rounded-full w-8 h-8 mr-1 border-0 flex-row flex items-center justify-center p-0`}>
                                    <div className={`w-4 h-4 flex `}>
                                        <IoRemoveOutline/>
                                    </div>
                                </button>
                                <div className={`w-8 flex flex-row items-center justify-center h-6 mr-1`}>
                                    <p className={`text-[#141414] font-bold text-base`}>{count}</p>
                                </div>
                                <button onClick={handlePlusAvailableSeat} data-action="increment"
                                        className={`${count === 50 ? "bg-[#f7f7f7] text-[#00000040]" : "bg-[#edf3fd] text-primaryColor"} rounded-full bg-[#edf3fd] w-8 h-8 mr-1 border-0 flex-row flex items-center justify-center p-0`}>
                                    <div className={`w-4 h-4`}>
                                        <IoAddOutline/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col py-4 border-b-[1px]`}>
                        <div className={`flex flex-row justify-between items-center`}>
                            <p className={`text-[#141414] font-normal text-sm`}>Hàng ghế đầu</p>
                            <Checkbox className={`p-0`} name={`typeRow`} value={"Top"}
                                      onChange={(e) => handleChangeCheckBox(e, setTypeRow)} {...label} />
                        </div>
                    </div>
                    <div className={`flex flex-col py-4 border-b-[1px]`}>
                        <div className={`flex flex-row justify-between items-center`}>
                            <p className={`text-[#141414] font-normal text-sm`}>Hàng ghế giữa</p>
                            <Checkbox className={`p-0`} name={`typeRow`} value={"Middle"}
                                      onChange={(e) => handleChangeCheckBox(e, setTypeRow)} {...label} />
                        </div>
                    </div>
                    <div className={`flex flex-col py-4 border-b-[1px]`}>
                        <div className={`flex flex-row justify-between items-center`}>
                            <p className={`text-[#141414] font-normal text-sm`}>Hàng ghế cuối</p>
                            <Checkbox className={`p-0`} name={`typeRow`} value={"Bottom"}
                                      onChange={(e) => handleChangeCheckBox(e, setTypeRow)} {...label} />
                        </div>
                    </div>
                    <div className={`flex justify-end items-center mt-2`}>
                        <button onClick={handleFilterByAvailableSeat}
                                className={`uppercase px-4 py-2 rounded-md border-[1px] bg-primaryColor text-white text-xs font-semibold hover:bg-primaryColor_hover transition duration-300 tracking-wider`}>
                            Lọc
                        </button>
                    </div>
                </div>
                <div className={`mt-[26px] flex flex-col`}>
                    <p className={`font-medium text-base text-[#4d4d4d]`}>Điểm đón</p>
                    <input type={`text`} name={`departure`}
                           className={`w-full h-[28px] mt-3 text-ellipsis relative inline-block p-[4px_12px] text-[#000000a6] text-sm leading-6 bg-white border-[1px] border-borderColor rounded-md outline-primaryColor_hover`}
                           placeholder={`Tìm trong danh sách`}/>
                    <div className={`mt-4 max-h-[208px] overflow-x-auto text-sm`}>
                        <ul className={`overflow-x-hidden text-[#000000a6] leading-6 text-sm`}>
                            {
                                listPickUp && listPickUp.length > 0 && handleCountCoachInListLocation(listPickUp, listCoach, 'departure').map((item, index) => {
                                    if (item?.status) {
                                        return (
                                            <li key={index} className={`pt-[7px] py-1 outline-none flex items-center`}>
                                                <Checkbox name={`pickUpPoint`} value={item.id}
                                                          onChange={(e) => handleChangeCheckBox(e, setPickUp)}
                                                          className={`top-auto p-1 my-0 mr-[4px] ml-[2px]`} {...label} />
                                                <span
                                                    className={`inline-block m-0 py-0 px-[5px] text-[#000000a6] rounded leading-6`}>
                                                    <span>{item.name} ({item?.count})</span>
                                                </span>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={`mt-[26px] flex flex-col`}>
                    <p className={`font-medium text-base text-[#4d4d4d]`}>Điểm trả</p>
                    <input type={`text`} name={`destination`}
                           className={`w-full h-[28px] mt-3 text-ellipsis relative inline-block p-[4px_12px] text-[#000000a6] text-sm leading-6 bg-white border-[1px] border-borderColor rounded-md outline-primaryColor_hover`}
                           placeholder={`Tìm trong danh sách`}/>
                    <div className={`mt-4 max-h-[208px] overflow-x-auto text-sm`}>
                        <ul className={`overflow-x-hidden text-[#000000a6] leading-6 text-sm`}>
                            {
                                listDropOff && listDropOff.length > 0 && handleCountCoachInListLocation(listDropOff, listCoach, 'destination').map((item, index) => {
                                    if (item?.status) {
                                        return (
                                            <li key={index} className={`pt-[7px] py-1 outline-none flex items-center`}>
                                                <Checkbox name={`dropOffPoint`} value={item.id}
                                                          onChange={(e) => handleChangeCheckBox(e, setDropOff)}
                                                          className={`top-auto p-1 my-0 mr-[4px] ml-[2px]`} {...label} />
                                                <span
                                                    className={`inline-block m-0 py-0 px-[5px] text-[#000000a6] rounded leading-6`}>
                                                    <span>{item.name} ({item?.count})</span>
                                                </span>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={`mt-[26px] flex flex-col`}>
                    <p className={`font-medium text-base text-[#4d4d4d]`}>Đánh giá</p>
                    <div className={`flex flex-col mt-3`}>
                        {updateStarsCount(listCoach, stars).map((item, index) => {
                            return <div className="flex items-center" key={index}>
                                {parse(renderStar(item.star))}
                                <span className="w-1 h-1 mx-3 bg-gray-500 rounded-full"></span>
                                <button onClick={() => setRating(+item.star)}
                                        className="text-sm font-medium text-gray-900 underline hover:no-underline hover:text-primaryColor_hover duration-300">
                                    trở lên ({item.count})
                                </button>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const timeRanges = ["00:00:00-06:00:00", "06:01:00-12:00:00", "12:01:00-18:00:00", "18:01:00-23:59:59"];

const stars = [
    {
        star: 5, count: 0
    },
    {
        star: 4, count: 0
    },
    {
        star: 3, count: 0
    },
    {
        star: 2, count: 0
    },
    {
        star: 1, count: 0
    },
]
export default Filter;