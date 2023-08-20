import React, {useEffect, useRef, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {produce} from "immer";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Banner from "../../../components/admin/Banner.jsx";
import {listBreadcrumb} from "../../../utils/data.jsx";
import {
    fetchAllSchedule,
    fetchGetAllLocation,
    fetchGetScheduleByDepartureAnDestination
} from "../../../redux/slices/scheduleSlice.jsx";
import {TbArrowsLeftRight} from "react-icons/tb";
import {BiCalendarEvent, BiSelectMultiple} from "react-icons/bi";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import vi from "date-fns/locale/vi";
import SyncLoader from "react-spinners/SyncLoader";
import ReactTyped from "react-typed";

registerLocale("vi", vi)

const DivisionPage = () => {
    useDocumentTitle("Quản lý phân công", true)
    const theadData = [
        '#',
        {field: 'scheduleCode', name: 'Mã tuyến đường'},
        {field: 'departure', name: 'Điểm xuất phát'},
        {field: 'destination', name: 'Điểm đến'},
        'Action'
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [tbodyData, setTbodyData] = useState([])
    let firstItemPerPage = 1
    const [date, setDate] = useState(new Date())
    const [departureId, setDepartureId] = useState(0)
    const [destinationId, setDestinationId] = useState(0)
    const [status, setStatus] = useState("")
    const [departureName, setDepartureName] = useState("")
    const [openDepartureMenu, setOpenDepartureMenu] = useState(false)
    const [openDestinationMenu, setOpenDestinationMenu] = useState(false)
    const [destinationName, setDestinationName] = useState("")
    const [keywordDestination, setKeywordDestination] = useState("")
    const [keywordDeparture, setKeywordDeparture] = useState("")
    const departureRef = useRef();
    const destinationRef = useRef();
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [filteredDepartures, setFilteredDepartures] = useState([]);
    const [reverseLocation, setReverseLocation] = useState(false)
    const [initialState, setInitialState] = useState({
        departures: [],
        destinations: [],
    })

    useEffect(() => {
        const test = async () => {
            await handleGetListLocation()
            if (departureId === 0 && destinationId === 0) {
                const res = await dispatch(fetchAllSchedule({
                    pageNumber: 1,
                    perPage: 100,
                    sortField: 'updatedAt',
                    sortDir: 'desc'
                })).unwrap()
                if (res && res.code === 200 && res.data !== null) {
                    const nextState = produce([], draft => {
                        res.data.map(item => {
                            draft.push({
                                id: item?.id,
                                items: [
                                    item?.scheduleCode,
                                    item?.departure?.name,
                                    item?.destination?.name,
                                ]
                            })
                        })
                    })
                    setTbodyData(nextState)
                }
            } else {
                const res = await dispatch(fetchGetScheduleByDepartureAnDestination({
                    departureId,
                    destinationId
                })).unwrap()
                console.log(res)
                if (res && res.code === 200 && res.data !== null) {
                    const nextState = produce([], draft => {
                        draft.push({
                            id: res.data?.id,
                            items: [
                                res.data?.scheduleCode,
                                res.data?.departure?.name,
                                res.data?.destination?.name,
                            ]
                        })
                    })
                    setTbodyData(nextState)
                }
            }
        }
        test()
    }, [date, departureId, destinationId, status])


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
        setDate(e)
    }
    const handleGetListLocation = async () => {
        const res = await dispatch(fetchGetAllLocation({sortField: '', sortDir: '', keyword: ''})).unwrap()
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
    const handleResetDepartureAndDestination = (e) => {
        e.preventDefault()
        setDepartureId(0)
        setDestinationId(0)
        setDestinationName("")
        setDepartureName("")
    }
    const handleGoDetailDivision = (scheduleId, date, departureName, destinationName) => {
        console.log(departureName)
        navigate('detail', {
            state: {
                scheduleId: scheduleId,
                date: date,
                scheduleDeparture: departureName,
                scheduleDestination: destinationName
            }
        })
    }
    return (
        <>
            <Banner dataBreadcrumb={listBreadcrumb("Quản lý phân công")}
                    title={"Danh sách tuyến đường"}/>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`block z-50 relative items-center py-4 px-2 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:py-5 lg:px-2.5 sm:flex`}>
                <div className={`relative`}>
                    <div className={`flex flex-row`}>
                        <div className={`py-2.5 pl-4`}>
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
                                <ul className={`absolute shadow-md top-16 bg-white w-full h-64 left-0 overflow-y-scroll border-[1px] border-borderColor rounded-md p-4 ${openDepartureMenu ? 'block' : 'hidden'}`}>
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
                    <div onClick={handleReverseLocation}
                         className={`${reverseLocation ? 'rotate-180' : ''} duration-300 absolute right-0 top-1/2 cursor-pointer translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                        <div
                            className={`w-9 h-9 flex items-center pr-0 justify-center rounded-full bg-gray-300 text-black`}>
                            <TbArrowsLeftRight className={`w-5 h-5`}/>
                        </div>
                    </div>
                </div>
                <div className={`relative`}>
                    <div className={`flex flex-row pl-8`}>
                        <div className={`py-2.5 pl-4`}>
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
                                <ul className={`shadow-md absolute top-16 bg-white w-full h-64 left-0 overflow-y-scroll border-[1px] border-borderColor rounded-md p-4 ${openDestinationMenu ? 'block' : 'hidden'}`}>
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
                <div className={`flex items-centers justify-center mr-8`}>
                    <div className={`relative`}>
                        <div className={`flex flex-row cursor-pointer`}>
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
                                            selected={date}
                                            onChange={handleSelectDate}
                                            className={`border-none outline-none ml-0 pl-0 py-0 font-semibold focus:ring-0`}
                                            calendarClassName={`border-none shadow-lg -top-4`}
                                            dayClassName={() => {
                                                return 'border-r-2 border-b-2 first:border-l-2 m-0 font-medium mr-0 w-10 h-10 leading-none inline-flex justify-center items-center rounded-none'
                                            }}
                                            weekDayClassName={() => {
                                                return 'm-0 font-medium mr-0 w-10 h-10 leading-none inline-flex justify-center items-center mt-0'
                                            }}
                                            popperClassName={() => {
                                                return ''
                                            }}

                                            fixedHeight>
                                </DatePicker>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleResetDepartureAndDestination}
                        className={`bg-gray-300 px-4 py-0.5 rounded flex items-center justify-center hover:bg-gray-400 duration-300`}>Reset
                </button>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="500" className={`relative z-0`}>
                <div className={`flex flex-col my-6 mx-4 rounded-2xl shadow-lg shadow-gray-200`}>
                    <div className={`overflow-x-auto rounded-2xl`}>
                        <div className={`inline-block min-w-full align-middle`}>
                            <div className={`overflow-hidden shadow-lg`}>
                                <table className={`w-full text-sm text-left text-gray-500`}>
                                    <thead
                                        className={`text-xs text-gray-700 capitalize bg-gray-50`}>
                                    <tr>
                                        {
                                            theadData.map((item, index) => {
                                                if (typeof item === "object") {
                                                    return (
                                                        <th key={`th-${index}`} scope={`col`} className={`px-4 py-2`}
                                                            title={item.field}>
                                                            <div className={`flex items-center`}>
                                                                {item.name}
                                                            </div>
                                                        </th>
                                                    )
                                                }
                                                return (
                                                    <th key={`th-${index}`} scope={`col`} className={`px-4 py-2`}
                                                        title={item}>
                                                        <div className={`flex items-center`}>
                                                            {item}
                                                        </div>
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        status === "loading" ?
                                            <tr className={`w-full relative`}>
                                                <td colSpan={theadData.length}
                                                    className={`text-center align-middle w-full  py-8`}>
                                                    <SyncLoader loading={true} color="#374151"
                                                                className={`absolute left-1/2 -translate-y-1/2`}/>
                                                </td>
                                            </tr> :
                                            tbodyData && tbodyData.length > 0 ?
                                                tbodyData.map((data, index) => {
                                                    return (
                                                        <tr key={`tr-${index}`}
                                                            className={`bg-white border-b hover:bg-gray-50 text-gray-600 font-normal`}>
                                                            <td className="px-4 py-2">{firstItemPerPage++}</td>
                                                            {
                                                                data && data.items &&
                                                                data.items.map((item, index) => {
                                                                    if (typeof item === "string") {
                                                                        return (
                                                                            <td key={`td-${index}`}
                                                                                className={`px-4 py-2`}>{item}</td>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                            <td className="px-4 py-2">
                                                                <div className={`flex items-center`}>
                                                                    <div
                                                                        className={`inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded bg-primaryColor hover:bg-primaryColor_hover mr-3`}>
                                                                        <button className={``}
                                                                                onClick={() => handleGoDetailDivision(data?.id, date, data.items[1], data.items[2])}>
                                                                            <BiSelectMultiple className={`w-5 h-5`}/>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) :
                                                <tr>
                                                    <td colSpan={theadData.length}
                                                        className={`text-center py-8 text-dangerColor-default_2 text-base font-semibold`}>
                                                        Chưa có dữ liệu<ReactTyped
                                                        loop
                                                        typeSpeed={300}
                                                        backSpeed={50}
                                                        strings={["...!"]}
                                                        smartBackspace
                                                        shuffle={false}
                                                        backDelay={1}
                                                        fadeOut={false}
                                                        fadeOutDelay={100}
                                                        loopCount={0}
                                                        showCursor
                                                        cursorChar="|"
                                                    />
                                                    </td>
                                                </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DivisionPage;