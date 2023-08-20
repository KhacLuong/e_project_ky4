import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import Booking from "../../../components/customer/Booking.jsx";
import Filter from "./Filter.jsx";
import Coaches from "./Coaches.jsx";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchGetScheduleByCode,
} from "../../../redux/slices/scheduleSlice.jsx";
import {fetchGetCoachByDistanceByScheduleAndTime} from "../../../redux/slices/coachSlice.jsx";
import {convertLocalDateToGlobalDate} from "../../../utils/helper.jsx";
import {toast} from "react-toastify";
import moment from "moment";
import {Context} from "../../../context/ContextProvider.jsx";
import {fetchGetListLocationByParentId} from "../../../redux/slices/locationSlice.jsx";

const BookingCoach = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const date = queryParams.get('date')
    const scheduleIdState = location.state?.scheduleId
    const departureIdState = location.state?.departureId
    const departureNameState = location.state?.departureName
    const destinationIdState = location.state?.destinationId
    const destinationNameState = location.state?.destinationName
    const [scheduleId, setScheduleId] = useState(scheduleIdState)
    const [departureId, setDepartureId] = useState(departureIdState)
    const [destinationId, setDestinationId] = useState(destinationIdState)
    const [departureName, setDepartureName] = useState(departureNameState)
    const [destinationName, setDestinationName] = useState(destinationNameState)
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [sortField, setSortField] = useState("startTime")
    const [sortDir, setSortDir] = useState("asc")
    const [timeSlot, setTimeSlot] = useState("")
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(10000000)
    const [price, setPrice] = useState([0, 10000000]);
    const [availableSeat, setAvailableSeat] = useState(1)
    const [typeRow, setTypeRow] = useState("")
    const [pickUp, setPickUp] = useState("")
    const [dropOff, setDropOff] = useState("")
    const [rating, setRating] = useState(0)
    const [listCoach, setListCoach] = useState([])
    const [listPickUp, setListPickUp] = useState([])
    const [listDropOff, setListDropOff] = useState([])
    const totalItems = useSelector((state) => state.coach.totalItems)
    const totalPages = useSelector((state) => state.coach.totalPages)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)
    const scheduleCode = location.pathname.substring(location.pathname.lastIndexOf('-') + 1);
    const [listFilter, setListFilter] = useState([])
    useDocumentTitle(`Đặt vé xe từ ${departureName} đi ${destinationName} | BizTrip`, true)

    useEffect(() => {
        setFirstItemPerPage(perPage * (pageNumber - 1) + 1)
        if (pageNumber === totalPages) {
            setLastItemPerPage(totalItems)
        } else {
            const lastItemPerPage = perPage * pageNumber
            setLastItemPerPage(lastItemPerPage)
        }
    }, [perPage, pageNumber, totalPages])

    useEffect(() => {
        localStorage.setItem('startDate', JSON.stringify({
            startDate: moment(date, 'DD-MM-YYYY').toDate()
        }));
    }, [date])

    useEffect(() => {
        if (!scheduleId) {
            const test = async () => {
                const res = await dispatch(fetchGetScheduleByCode({code: scheduleCode})).unwrap()
                if (res && res.code === 200) {
                    setScheduleId(res?.data?.id)
                    setDepartureId(res?.data?.departure?.id)
                    setDestinationId(res?.data?.destination?.id)
                    setDepartureName(res?.data?.departure?.name)
                    setDestinationName(res?.data?.destination?.name)
                    await handleFindListCoachInSchedule(res?.data?.id, res?.data?.departure?.id, res?.data?.destination?.id)
                    await handleGetListDeparture(res?.data?.departure?.id)
                    await handleGetListDestination(res?.data?.destination?.id)
                } else {
                    toast.error("Không tìm thấy lộ trình!")
                    navigate("/")
                }
            }
            test()
        } else {
            const test = async () => {
                await handleFindListCoachInSchedule(scheduleId, departureId, destinationId)
                await handleGetListDeparture(departureId)
                await handleGetListDestination(destinationId)
            }
            test()
        }
    }, [scheduleIdState, date, departureIdState, destinationIdState, priceMin, priceMax, timeSlot, typeRow, availableSeat, pickUp, dropOff, rating, perPage, sortField, sortDir, pageNumber])

    const handleFindListCoachInSchedule = async (scheduleId, departureId, destinationId) => {
        const parsedDate = moment(date, 'DD-MM-YYYY')
        if (parsedDate._isValid) {
            const isBeforeCurrentDate = parsedDate.isBefore(moment(), 'day')
            if (isBeforeCurrentDate) {
                navigate("/")
                toast.error("Không tìm thấy lộ trình!")
            } else {
                const resCoach = await dispatch(fetchGetCoachByDistanceByScheduleAndTime({
                    scheduleId,
                    departureInSchedule: departureId,
                    destinationInSchedule: destinationId,
                    date: convertLocalDateToGlobalDate(date),
                    pageNumber,
                    perPage,
                    sortField,
                    sortDir,
                    timeSlot: encodeURIComponent(timeSlot),
                    priceMin,
                    priceMax,
                    availableSeat,
                    typeRow: encodeURIComponent(typeRow),
                    pickUp: encodeURIComponent(pickUp),
                    dropOff: encodeURIComponent(dropOff),
                    rating
                })).unwrap()
                if (resCoach && resCoach.code === 200 && resCoach.data !== null) {
                    setListCoach(resCoach?.data)
                } else {
                    setListCoach([])
                }
            }
        } else {
            navigate("/")
            toast.error("Không tìm thấy lộ trình!")
        }
    }

    const handleGetListDeparture = async (departureId) => {
        const res = await dispatch(fetchGetListLocationByParentId({parentId: departureId, keyword: ""})).unwrap()
        if (res && res?.code === 200) {
            setListPickUp(res?.data)
        }
    }
    const handleGetListDestination = async (destinationId) => {
        const res = await dispatch(fetchGetListLocationByParentId({parentId: destinationId, keyword: ""})).unwrap()
        if (res && res.code === 200) {
            setListDropOff(res?.data)
        }
    }

    const handleClickToPage = async (event) => {
        const pageNumber = +event.selected + 1
        setPageNumber(pageNumber)
        if ((+event.selected + 1) === totalPages) {
            setTurnOffPrevNextBtn(true)
            setLastItemPerPage(totalItems)
        }
    }
    const {openBookingNewTicketModal, openLoginModal, openModalCoach} = useContext(Context)

    return (
        <section
            className={`w-full my-24 ${openBookingNewTicketModal || openLoginModal || openModalCoach ? 'pr-[0.4rem]' : ''}`}>
            <div className={`flex max-w-7xl flex-col items-center mx-auto relative`}>
                <Breadcrumb dataBreadcrumb={dataBreadcrumb(departureName, destinationName, date)}/>
                <Booking/>
                <div
                    className={`w-full mt-7 mb-8 text-[#484848] flex items-center text-lg font-bold`}>BizTrip
                    - Cam kết hoàn 150% nếu nhà xe không giữ vé
                </div>
                <div className={`grid grid-cols-4 gap-6 w-full`}>
                    <Filter listCoach={listCoach}
                            listPickUp={listPickUp}
                            listDropOff={listDropOff}
                            setAvailableSeat={setAvailableSeat}
                            price={price}
                            setPrice={setPrice}
                            setPriceMax={setPriceMax}
                            setPriceMin={setPriceMin}
                            setTimeSlot={setTimeSlot}
                            timeSlot={timeSlot}
                            setTypeRow={setTypeRow}
                            setPickUp={setPickUp}
                            setDropOff={setDropOff}
                            setRating={setRating}
                            scheduleId={scheduleId}
                            listFilter={listFilter}
                            setListFilter={setListFilter}
                            dispatch={dispatch}/>
                    <Coaches departureName={departureName}
                             scheduleCode={scheduleCode}
                             scheduleId={scheduleId}
                             destinationName={destinationName}
                             departureId={departureId}
                             destinationId={destinationId}
                             date={date}
                             listCoach={listCoach}
                             perPage={perPage}
                             setPerPage={setPerPage}
                             setSortField={setSortField}
                             setSortDir={setSortDir}
                             totalItems={totalItems}
                             totalPages={totalPages}
                             lastItemPerPage={lastItemPerPage}
                             firstItemPerPage={firstItemPerPage}
                             turnOffPrevNextBtn={turnOffPrevNextBtn}
                             listFilter={listFilter}
                             handleClickToPage={handleClickToPage}/>
                </div>
            </div>
        </section>
    );
};
const dataBreadcrumb = (departureName, destinationName, date) => {
    return [
        {
            name: "Trang chủ",
            path: "/"
        },
        {
            name: "Vé xe khách",
            path: "/"
        },
        {
            name: `Xe từ ${departureName} đi ${destinationName} ngày ${date}`,
            path: ""
        }
    ]
}
export default BookingCoach;