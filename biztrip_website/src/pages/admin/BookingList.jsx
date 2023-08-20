import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetAllBookingTicket, selectBookingTicket} from "../../redux/slices/bookingTicketSlice.jsx";
import {produce} from "immer";
import moment from "moment";
import Banner from "../../components/admin/Banner.jsx";
import {listBreadcrumb, tbodyActionView} from "../../utils/data.jsx";
import Table from "../../components/admin/Table.jsx";
import Paginate from "../../components/admin/Paginate.jsx";
import {fetchGetDistanceById} from "../../redux/slices/distanceSlice.jsx";
import {fetchGetScheduleById} from "../../redux/slices/scheduleSlice.jsx";

const BookingList = () => {
    useDocumentTitle("Quản lý đơn đặt vé", true)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const bookingTickets = useSelector(selectBookingTicket)
    const status = useSelector((state) => state.bookingTicket.status)
    const totalItems = useSelector((state) => state.bookingTicket.totalItems)
    const totalPages = useSelector((state) => state.bookingTicket.totalPages)
    const [tbodyData, setTbodyData] = useState([])
    const [sortField, setSortField] = useState("updatedAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)
    const [keyword, setKeyword] = useState("")
    const [distance, setDistance] = useState('')
    const [coach, setDCoach] = useState('')
    useEffect(() => {
        dispatch(fetchGetAllBookingTicket({pageNumber, perPage, sortField, sortDir, keyword}))
    }, [navigate, dispatch, pageNumber, perPage, sortField, sortDir])
    useEffect(() => {
        if (bookingTickets && bookingTickets.length >= 0) {
            const nextState = produce([], draft => {
                bookingTickets.map((item) => {
                    if (item.state !== 'Pending') {
                        const test = async () => {
                            await handleFindDistanceById(item?.distanceId)
                        }
                        test()
                        draft.push({
                            id: item?.id,
                            items: [
                                item?.reservationCode,
                                distance,
                                coach,
                                moment(item?.date).format("DD/MM/YYYY"),
                                item?.passengerName,
                                item?.passengerEmail,
                                item?.passengerPhone,
                                item?.note,
                                item?.price,
                                {
                                    state: item?.state
                                },
                            ]
                        })
                    }
                })
            })
            setTbodyData(nextState)
        }
    }, [bookingTickets, distance, coach])

    const handleFindDistanceById = async (id) => {
        if (id !== 0) {
            const res = await dispatch(fetchGetDistanceById({id})).unwrap()
            if (res && res.code === 200) {
                setDCoach(res?.data?.coach?.name)
                const schedule = await dispatch(fetchGetScheduleById({id: res?.data?.schedule?.id})).unwrap()
                if (schedule && schedule.code === 200) {
                    setDistance(`${schedule?.data?.departure?.name} - ${schedule?.data?.destination?.name}`)
                }
            }
        }
    }

    const theadData = [
        '#',
        {field: 'reservationCode', name: 'Mã vé'},
        {field: 'distance', name: 'Lộ trình'},
        {field: 'coach', name: 'Xe'},
        {field: 'date', name: 'Ngày đi'},
        {field: 'passengerName', name: 'Tên người đặt'},
        {field: 'passengerEmail', name: 'Email'},
        {field: 'passengerPhone', name: 'SĐT'},
        {field: 'note', name: 'Ghi chú'},
        {field: 'price', name: 'Tổng tiền'},
        {field: 'state', name: 'Trạng thái'},
        'Action'
    ]
    return (
        <>
            <Banner dataBreadcrumb={listBreadcrumb("Quản lý đơn đặt vé")}
                    title={"Danh sách đơn đặt vé"}
                    perPage={perPage}
                    sortField={sortField}
                    sortDir={sortDir}
                    pageNumber={pageNumber}
                    setKeyword={setKeyword}
                    keyword={keyword}
                    fetchData={fetchGetAllBookingTicket}/>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`block justify-end items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex`}>
                <div className={`flex items-centers justify-center mr-8`}>
                    <label htmlFor={`filter`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Lọc</label>
                    <select id={`filter`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                        <option>...</option>
                        <option>Trạng thái: Active</option>
                        <option>Trạng thái: Disable</option>
                    </select>
                </div>
                <div className={`flex items-centers justify-center`}>
                    <label htmlFor={`perPage`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Hiển
                        thị</label>
                    <select id={`perPage`} value={perPage} onChange={(e) => setPerPage(+e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                        <option value={15}>15</option>
                    </select>
                </div>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="500">
                <Table theadData={theadData}
                       tbodyData={tbodyData}
                       tbodyAction={tbodyActionView}
                       pageNumber={pageNumber}
                       perPage={perPage}
                       sortField={sortField}
                       sortDir={sortDir}
                       fetchAll={fetchGetAllBookingTicket}
                       status={status}
                       setSortField={setSortField}
                       setSortDir={setSortDir}
                       firstItemPerPage={firstItemPerPage}/>
                {
                    totalItems > 0 && totalPages > 0 ?
                        <Paginate pageNumber={pageNumber}
                                  setPageNumber={setPageNumber}
                                  sortField={sortField}
                                  sortDir={sortDir}
                                  fetchData={fetchGetAllBookingTicket}
                                  totalPages={totalPages}
                                  perPage={perPage}
                                  totalItems={totalItems}
                                  firstItemPerPage={firstItemPerPage}
                                  setFirstItemPerPage={setFirstItemPerPage}
                                  lastItemPerPage={lastItemPerPage}
                                  setLastItemPerPage={setLastItemPerPage}/> :
                        <></>
                }
            </div>
        </>
    );
};

export default BookingList;