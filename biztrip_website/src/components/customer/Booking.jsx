import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BiCalendarEvent} from "react-icons/bi";
import {FaDotCircle, FaBus} from "react-icons/fa";
import {TbArrowsLeftRight} from "react-icons/tb";
import {MdLocalAirport, MdCommute} from "react-icons/md";
import DatePicker, {registerLocale} from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import vi from "date-fns/locale/vi";
import {useDispatch} from "react-redux";
import {
    fetchGetAllLocation,
    fetchGetScheduleByDepartureAnDestination
} from "../../redux/slices/scheduleSlice.jsx";
import moment from "moment";
import {handleConvertStringToSlug} from "../../utils/helper.jsx";
import {toast} from "react-toastify";

registerLocale("vi", vi)

const Booking = () => {
    const queryParams = new URLSearchParams(location.search)
    const date = queryParams.get('date')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date())
    const [reverseLocation, setReverseLocation] = useState(false)
    const [initialState, setInitialState] = useState({
        departures: [],
        destinations: [],
    })
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [filteredDepartures, setFilteredDepartures] = useState([]);
    const [openDepartureMenu, setOpenDepartureMenu] = useState(false)
    const [openDestinationMenu, setOpenDestinationMenu] = useState(false)
    const [departureName, setDepartureName] = useState("")
    const [destinationName, setDestinationName] = useState("")
    const [departureId, setDepartureId] = useState(0)
    const [destinationId, setDestinationId] = useState(0)
    const [keywordDestination, setKeywordDestination] = useState("")
    const [keywordDeparture, setKeywordDeparture] = useState("")
    const departureRef = useRef();
    const destinationRef = useRef();

    useEffect(() => {
        const startDateLocal = JSON.parse(localStorage.getItem('startDate'))
        const schedule = JSON.parse(localStorage.getItem('schedule'))
        if (schedule && startDateLocal) {
            setDepartureId(schedule.departureId)
            setDestinationId(schedule.destinationId)
            setDepartureName(schedule.departureName)
            setDestinationName(schedule.destinationName)
            setStartDate(moment(startDateLocal.startDate).toDate())
        }
        const test = async () => {
            await handleGetListLocation()
        }
        test()
    }, [])

    useEffect(() => {
        if (date) {
            const parsedDate = moment(date, 'DD-MM-YYYY')
            if (parsedDate._isValid) {
                const startDate = moment(date, 'DD-MM-YYYY').toDate()
                setStartDate(startDate)
            }
        }
    }, [date])

    useEffect(() => {
        const handler = (event) => {
            if (openDepartureMenu && departureRef.current && !departureRef.current.contains(event.target)) {
                setOpenDepartureMenu(false)
            } else if (openDestinationMenu && destinationRef.current && !destinationRef.current.contains(event.target)) {
                setOpenDestinationMenu(false)
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        }
    }, [openDepartureMenu, openDestinationMenu])

    useEffect(() => {
        const filteredDestination = initialState.destinations.filter((item) =>
            item.name.toLowerCase().includes(keywordDestination.toLowerCase())
        );
        setFilteredDestinations(filteredDestination);
        const filteredDeparture = initialState.departures.filter((item) =>
            item.name.toLowerCase().includes(keywordDeparture.toLowerCase())
        );
        setFilteredDepartures(filteredDeparture);
    }, [initialState.departures, keywordDeparture, initialState.destinations, keywordDestination]);

    const handleReverseLocation = () => {
        setReverseLocation((reverseLocation) => !reverseLocation)
        const temp = departureName
        const temId = departureId
        setDepartureId(destinationId)
        setDestinationId(temId)
        setDepartureName(destinationName)
        setDestinationName(temp)
    }
    const handleSelectDate = (e) => {
        setStartDate(e)
    }
    const handleGetListLocation = async () => {
        const sortField = ''
        const sortDir = ''
        const keyword = ''
        const res = await dispatch(fetchGetAllLocation({sortField, sortDir, keyword})).unwrap()
        if (res && res.code === 200) {
            if (res.data.length > 0) {
                setInitialState(prevState => (
                    {
                        ...prevState,
                        departures: res.data,
                        destinations: res.data,
                    }
                ))
            }
        }
    }
    const handleOnChangeDeparture = (e) => {
        setKeywordDeparture(e.target.value)
        setDepartureName(e.target.value)
        setOpenDepartureMenu(true)
    }
    const handleOnClickDeparture = (item) => {
        setDepartureName(item.name)
        setDepartureId(item.id)
    }
    const handleOnChangeDestination = (e) => {
        setKeywordDestination(e.target.value)
        setDestinationName(e.target.value)
        setOpenDestinationMenu(true)
    }
    const handleOnClickDestination = (item) => {
        setDestinationName(item.name)
        setDestinationId(item.id)
    }
    const handleGoBookingCoachPage = async (e) => {
        e.preventDefault()
        const convertDate = moment(startDate).format("DD-MM-YYYY")
        const res = await dispatch(fetchGetScheduleByDepartureAnDestination({departureId, destinationId})).unwrap()
        if (res && res.code === 200 && res.data !== null) {
            localStorage.setItem('schedule', JSON.stringify({
                departureId: departureId,
                departureName: departureName,
                destinationId: destinationId,
                destinationName: destinationName,
            }));
            localStorage.setItem('startDate', JSON.stringify({
                startDate: startDate
            }))
            navigate(`/v1/danh-sach-xe/xe-tu-${handleConvertStringToSlug(departureName)}-di-${handleConvertStringToSlug(destinationName)}-${res?.data?.scheduleCode}?date=${convertDate}`,
                {
                    state: {
                        scheduleId: res?.data?.id,
                        departureId: departureId,
                        departureName: departureName,
                        destinationId: destinationId,
                        destinationName: destinationName
                    }
                })
        } else {
            toast.error("Không tìm thấy lộ trình!")
            navigate("/")
        }
    }
    return (
        <div className={`w-full md:w-full min-h-[1px] bg-white rounded-xl shadow-lg p-0 mt-[1.5rem]`}>
            <div className={`w-full h-20 bg-white rounded-t-xl border-b-[1px]`}>
                <div className={`flex h-full items-center justify-center`}>
                    <div
                        className={`cursor-pointer px-8 flex items-center justify-center mr-6 text-primaryColor border-b-4 border-primaryColor h-full`}>
                        <FaBus className={`w-5 h-5 mr-4`}/>
                        <span className={`font-semibold`}>Xe khách</span>
                    </div>
                    <div
                        className={`cursor-pointer px-8 flex items-center justify-center mr-6 text-gray-600 relative`}>
                        <MdLocalAirport className={`w-7 h-7 mr-4`}/>
                        <span>Máy bay</span>
                        <span
                            className={`absolute text-xs text-black font-semibold -top-5 -right-9 px-1.5 py-0.5 rounded-md bg-warningColor`}>Sắp ra mắt</span>
                    </div>
                    <div
                        className={`cursor-pointer px-8 flex items-center justify-center text-gray-600 relative`}>
                        <MdCommute className={`w-7 h-7 mr-4`}/>
                        <span>Thuê xe</span>
                        <span
                            className={`absolute text-xs text-black font-semibold -top-5 -right-9 px-1.5 py-0.5 rounded-md bg-warningColor`}>Sắp ra mắt</span>
                    </div>
                </div>
            </div>
            <div className={`p-3 grid w-full grid-cols-4 gap-2`}>
                <div className={`col-span-3 md:block rounded-xl border-[1px] border-borderColor mr-3 relative`}>
                    <div className={`h-full flex justify-center items-center`}>
                        <div className={`w-1/3 border-r-2 border-borderColor relative`}>
                            <div className={`relative`}>
                                <div className={`flex flex-row pl-4`}>
                                    <div className={`flex flex-col justify-center items-center`}>
                                        <FaDotCircle className={`w-6 h-6 text-primaryColor`}/>
                                    </div>
                                    <div className={`py-2.5 pr-8 pl-6`}>
                                        <div onClick={() => setOpenDepartureMenu(!openDepartureMenu)}
                                             ref={departureRef}
                                             className={`flex flex-col justify-around grow shrink basis-0 cursor-pointer`}>
                                            <label htmlFor={`departure`}
                                                   className={`text-xs text-lightColor cursor-pointer`}>Nơi
                                                xuất phát</label>
                                            <input
                                                className={`leading-6 font-semibold w-full border-none p-0 mt-0.5 text-base text-black`}
                                                placeholder={" "}
                                                type={"text"}
                                                id={"departure"}
                                                autoComplete={`off`}
                                                value={departureName || ""}
                                                onChange={handleOnChangeDeparture}/>
                                            <ul className={`absolute shadow-md top-20 bg-white w-full h-64 left-0 overflow-y-scroll rounded-md p-4 ${openDepartureMenu ? 'block' : 'hidden'}`}>
                                                <li className={`font-semibold px-1 mb-1.5 cursor-text`}>Tỉnh -
                                                    Thành phố
                                                </li>
                                                {
                                                    filteredDepartures.length > 0 ?
                                                        filteredDepartures.map((item) => {
                                                            if (item?.locationParent === null && item?.status === true) {
                                                                return <li
                                                                    onClick={() => handleOnClickDeparture(item)}
                                                                    key={item?.name}
                                                                    className={`${'location-' + item?.id} font-medium text-sm hover:px-4 hover:bg-gray-200 duration-300 transition-all ease-in-out px-2.5 py-1`}>{item?.name}</li>
                                                            }
                                                        }) :
                                                        <li className={`font-medium text-sm duration-300 transition-all ease-in-out px-2.5 py-1`}>
                                                            Không có dữ liệu
                                                        </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={handleReverseLocation}
                                 className={`${reverseLocation ? 'rotate-180' : ''} duration-300 absolute z-[4] right-0 top-1/2 cursor-pointer translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                                <div
                                    className={`w-9 h-9 flex items-center pr-0 justify-center rounded-full bg-gray-300 text-black`}>
                                    <TbArrowsLeftRight className={`w-5 h-5`}/>
                                </div>
                            </div>
                        </div>
                        <div className={`w-1/3 border-r-2 border-borderColor`}>
                            <div className={`relative`}>
                                <div className={`flex flex-row pl-8`}>
                                    <div className={`flex flex-col justify-center items-center`}>
                                        <FaDotCircle className={`w-6 h-6 text-dangerColor-default_2`}/>
                                    </div>
                                    <div className={`py-2.5 pr-8 pl-6`}>
                                        <div onClick={() => setOpenDestinationMenu(!openDestinationMenu)}
                                             ref={destinationRef}
                                             className={`flex flex-col justify-around grow shrink basis-0 cursor-pointer`}>
                                            <label htmlFor={`destination`}
                                                   className={`text-xs text-lightColor cursor-pointer`}>Nơi
                                                đến</label>
                                            <input
                                                className={`leading-6 font-semibold w-full border-none p-0 mt-0.5 text-base text-black`}
                                                placeholder={" "}
                                                type={"text"}
                                                autoComplete={`off`}
                                                id={"destination"}
                                                value={destinationName || ""}
                                                onChange={(e) => handleOnChangeDestination(e)}/>
                                            <ul className={`z-10 shadow-md absolute top-20 bg-white w-full h-64 left-0 overflow-y-scroll rounded-md p-4 ${openDestinationMenu ? 'block' : 'hidden'}`}>
                                                <li className={`font-semibold px-1 mb-1.5 cursor-text`}>Tỉnh -
                                                    Thành phố
                                                </li>
                                                {
                                                    filteredDestinations.length > 0
                                                        ?
                                                        filteredDestinations.map((item) => {
                                                            if (item?.locationParent === null && item?.status === true) {
                                                                return <li
                                                                    onClick={() => handleOnClickDestination(item)}
                                                                    key={item?.name}
                                                                    className={`${'location-' + item?.id} font-medium text-sm hover:px-4 hover:bg-gray-200 duration-300 transition-all ease-in-out px-2.5 py-1`}>{item?.name}</li>
                                                            }
                                                        }) :
                                                        <li className={`font-medium text-sm duration-300 transition-all ease-in-out px-2.5 py-1`}>
                                                            Không có dữ liệu
                                                        </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`w-1/3 grow shrink basis-0 z-[2]`}>
                            <div className={`relative`}>
                                <div className={`pl-4 flex flex-row cursor-pointer`}>
                                    <div className={`flex flex-col justify-center items-center p-0`}>
                                        <BiCalendarEvent className={`w-6 h-6 text-primaryColor`}/>
                                    </div>
                                    <div
                                        className={`w-full flex items-start flex-col justify-start pl-6`}>
                                        <p className={`text-lightColor text-xs font-normal leading-4 mb-0.5`}>
                                            Ngày đi
                                        </p>
                                        <DatePicker calendarStartDay={1}
                                                    dateFormat={`EEEE, dd/MM/yyyy`}
                                                    minDate={new Date()}
                                                    locale="vi"
                                                    selected={startDate}
                                                    onChange={handleSelectDate}
                                                    className={`border-none outline-none ml-0 pl-0 py-0 font-semibold focus:ring-0`}
                                                    calendarClassName={`border-none shadow-lg`}
                                                    dayClassName={() => {
                                                        return 'border-r-2 border-b-2 first:border-l-2 m-0 font-medium mr-0 w-10 h-10 leading-none inline-flex justify-center items-center rounded-none'
                                                    }}
                                                    weekDayClassName={() => {
                                                        return 'm-0 font-medium mr-0 w-10 h-10 leading-none inline-flex justify-center items-center mt-0'
                                                    }}
                                                    fixedHeight>
                                        </DatePicker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-span-1 grow text-center`}>
                    <button onClick={handleGoBookingCoachPage}
                            className={`w-full h-auto rounded-lg bg-primaryColor hover:bg-primaryColor_hover py-5 px-auto duration-300 whitespace-normal font-base text-white block font-semibold`}>
                                        <span className={`inline-block`}>
                                            Tìm chuyến
                                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Booking;