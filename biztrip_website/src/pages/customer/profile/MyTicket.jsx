import React, {useEffect, useState} from 'react';
import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import moment from "moment";
import CountDownTime from "../../../components/customer/CountDownTime.jsx";
import {
    fetchGetBookingTicketByUserIdAndState
} from "../../../redux/slices/bookingTicketSlice.jsx";
import {useNavigate} from "react-router-dom";
import {formatTimeArray} from "../../../utils/helper.jsx";
import {HiArrowLongRight} from "react-icons/hi2";

const MyTicket = ({dispatch, userId}) => {
    const navigate = useNavigate()
    const [listBookingTicketPending, setListBookingTicketPending] = useState([])
    const [listBookingTicketConfirm, setListBookingTicketConfirm] = useState([])
    const [listBookingTicketUsed, setListBookingTicketUsed] = useState([])
    const [listBookingTicketPaid, setListBookingTicketPaid] = useState([])
    const [listBookingTicketCancel, setListBookingTicketCancel] = useState([])
    const [openModalNotification, setOpenModalNotification] = useState(false)
    const [isTimeExpire, setIsTimeExpire] = useState(false)
    useEffect(() => {
        if (userId) {
            const test = async () => {
                const resPending = await dispatch(fetchGetBookingTicketByUserIdAndState({
                    userId: userId,
                    state: "Pending"
                })).unwrap()
                setListBookingTicketPending(resPending.data)

                const resConfirm = await dispatch(fetchGetBookingTicketByUserIdAndState({
                    userId: userId,
                    state: "Confirm"
                })).unwrap()
                setListBookingTicketConfirm(resConfirm?.data)

                const resPaid = await dispatch(fetchGetBookingTicketByUserIdAndState({
                    userId: userId,
                    state: "Paid"
                })).unwrap()
                setListBookingTicketPaid(resPaid?.data)

                const resUsed = await dispatch(fetchGetBookingTicketByUserIdAndState({
                    userId: userId,
                    state: "Used"
                })).unwrap()
                setListBookingTicketUsed(resUsed?.data)

                const resCancel = await dispatch(fetchGetBookingTicketByUserIdAndState({
                    userId: userId,
                    state: "Cancel"
                })).unwrap()
                setListBookingTicketCancel(resCancel?.data)
            }
            test()
        }

    }, [userId])

    const dataTab = [
        {
            label: "Vé hiện tại",
            value: "tab-1",
            component: <ListTicketNow
                listBookingTicketPending={listBookingTicketPending}
                listBookingTicketConfirm={listBookingTicketConfirm}
                listBookingTicketPaid={listBookingTicketPaid}
                setOpenModalNotification={setOpenModalNotification}
                setIsTimeExpire={setIsTimeExpire}
                navigate={navigate}/>
        },
        {
            label: "Vé đã đi",
            value: "tab-2",
            component: <ListTicketUsed
                listBookingTicketUsed={listBookingTicketUsed}
                navigate={navigate}/>
        },
        {
            label: "Vé đã hủy",
            value: "tab-3",
            component: <ListTicketCancel
                listBookingTicketCancel={listBookingTicketCancel}
                navigate={navigate}/>
        }
    ]

    return (
        <div className={`h-full`}>
            <Tabs id={""} children={""} value="tab-1" className={`overflow-visible h-full`}>
                <TabsHeader
                    className="w-full rounded-none border-b border-blue-gray-50 bg-transparent"
                    indicatorProps={{
                        className: "bg-transparent border-b-[2px] border-primaryColor shadow-none mt-1 rounded-none",
                    }}>
                    {
                        dataTab.map(({label, value}) => (
                            <Tab value={value}
                                 key={value}
                                 className={`before:content[''] before:inline-block before:absolute before:w-0 before:bg-primaryColor before:h-[2px] before:bottom-[-4px] hover:before:w-full hover:before:duration-500 text-sm`}>
                                {label}
                            </Tab>
                        ))
                    }
                </TabsHeader>
                <TabsBody className={`overflow-visible`}
                          animate={{
                              initial: {x: 0},
                              mount: {x: 0},
                              unmount: {x: 100},
                          }}>
                    {
                        dataTab.map(({component, value}) => (
                            <TabPanel key={value}
                                      value={value}
                                      className={``}>
                                {component}
                            </TabPanel>
                        ))
                    }
                </TabsBody>
            </Tabs>
        </div>
    );
};
const ListTicketNow = (props) => {
    const handleGoPaymentPage = (reservationCode) => {
        props.navigate(`/v1/users/thanh-toan/${reservationCode}`)
    }
    return (
        <div className={`mt-4 pb-[60px] px-[20px]`}>
            {
                props.listBookingTicketPending && props.listBookingTicketPending.map((item, index) => {
                    const currentTime = moment(new Date)
                    if (currentTime.isBefore(moment(item?.timeToExpire))) {
                        return (
                            <div className={`mt-4`} key={index}
                                 onClick={() => handleGoPaymentPage(item?.reservationCode)}>
                                <div className={`mb-4 relative bg-white rounded`}>
                                    <div className={`border-[1px] border-b-0 py-1.5 px-2 inline-block`}>
                                        Mã vé: <span className={`font-medium`}>{item?.reservationCode}</span>
                                    </div>
                                    <button
                                        className={`w-full h-auto flex border-[1px] border-borderColor items-center justify-start p-0 m-0 cursor-pointer outline-0 leading-normal relative whitespace-nowrap text-center`}>
                                        <div className={`flex flex-1 flex-col items-start py-2 px-4`}>
                                            <div
                                                className={`font-semibold capitalize mb-2 text-sm leading-normal text-[#000000a6]`}>
                                                Ngày đi: <span>{moment(item?.date).format("dddd, DD/MM/YYYY")}</span>
                                            </div>

                                            <div
                                                className={`text-sm text-black font-normal flex items-center`}><span className={`font-medium`}>{item?.distance.scheduleDeparture}</span> <HiArrowLongRight className={`mx-2`}/> <span className={`font-medium`}>{item?.distance.scheduleDestination}</span>
                                            </div>
                                            <div
                                                className={`text-2xl mb-1.5 font-semibold leading-normal`}>{item?.pickUp?.locationName} ({formatTimeArray(item?.pickUp?.time, "HH:mm")}) - {item?.dropOff?.locationName} ({formatTimeArray(item?.dropOff?.time, "HH:mm")})</div>
                                            <div className={`text-sm mb-1.5 font-normal flex w-1/3 justify-between items-center`}>
                                                <div>
                                                    Xe: <span className={`font-medium`}>{item?.coach.name}</span>
                                                </div>
                                                <div>
                                                    Biển số xe: <span className={`font-medium`}>{item?.coach.plateNumber}</span>
                                                </div>
                                            </div>

                                            <p className={`text-sm font-normal mt-2`}>
                                                Vui lòng thanh toán trước:
                                                <span className={`text-dangerColor-default_2 ml-1 font-medium`}>
                                                    {moment(item?.timeToExpire).format("HH:mm dddd, DD/MM/YYYY")}
                                                </span>
                                            </p>
                                        </div>
                                    </button>
                                    <div
                                        className={`bg-warningColor text-white absolute py-1 px-2 top-1/2 right-3 font-normal rounded`}>Chưa
                                        thanh toán
                                    </div>
                                    <div
                                        className={`absolute bottom-3 right-3`}>
                                        <CountDownTime timeToAdd={item?.timeToAdd}
                                                       timeToExpire={item?.timeToExpire}
                                                       setOpenModalNotification={props.setOpenModalNotification}
                                                       setIsTimeExpire={props.setIsTimeExpire}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
            {
                props.listBookingTicketConfirm && props.listBookingTicketConfirm.map((item, index) => {
                    return (
                        <div key={index} className={`mt-4`}>
                            <div className={`mb-4 border-[1px] border-borderColor relative bg-white rounded`}>
                                <div
                                    className={`w-full h-auto flex items-center justify-start border-0 p-0 m-0 cursor-pointer outline-0 leading-normal relative whitespace-nowrap text-center`}>
                                    <div className={`flex flex-1 flex-col items-start py-2 px-4`}>
                                        <div
                                            className={`font-semibold capitalize mb-2 text-sm leading-normal text-[#000000a6]`}>
                                            Chuyến đi: <span>{moment(item?.date).format("dddd, DD/MM/YYYY")}</span></div>
                                        <div
                                            className={`text-2xl mb-1.5 font-semibold leading-normal`}>{item?.pickUp?.locationName} ({formatTimeArray(item?.pickUp?.time, "HH:mm")}) - {item?.dropOff?.locationName} ({formatTimeArray(item?.dropOff?.time, "HH:mm")})</div>
                                        <div className={`text-sm mb-1.5 text-black font-normal`}>Xe: <span className={`font-medium`}>{item?.coachName}</span></div>
                                        <div
                                            className={`text-sm text-black font-normal flex items-center`}><span className={`font-medium`}>{item?.distance.scheduleDeparture}</span> <HiArrowLongRight className={`mx-2`}/> <span className={`font-medium`}>{item?.distance.scheduleDestination}</span></div>
                                    </div>
                                </div>
                                <div
                                    className={`bg-primaryColor text-white absolute py-1 px-2 top-3 right-3 font-normal rounded`}>
                                    Thanh toán sau
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                props.listBookingTicketPaid && props.listBookingTicketPaid.map((item, index) => {
                    return (
                        <div key={index} className={`mt-4`}>
                            <div className={`mb-4 border-[1px] border-borderColor relative bg-white rounded`}>
                                <div
                                    className={`w-full h-auto flex items-center justify-start border-0 p-0 m-0 cursor-pointer outline-0 leading-normal relative whitespace-nowrap text-center`}>
                                    <div className={`flex flex-1 flex-col items-start py-2 px-4`}>
                                        <div
                                            className={`font-semibold capitalize mb-2 text-sm leading-normal text-[#000000a6]`}>
                                            Chuyến đi: <span>{moment(item?.date).format("dddd, DD/MM/YYYY")}</span></div>
                                        <div
                                            className={`text-2xl mb-1.5 font-semibold leading-normal`}>{item?.pickUp?.locationName} ({formatTimeArray(item?.pickUp?.time, "HH:mm")}) - {item?.dropOff?.locationName} ({formatTimeArray(item?.dropOff?.time, "HH:mm")})</div>
                                        <div className={`text-sm mb-1.5 text-black font-normal`}>Xe: <span className={`font-medium`}>{item?.coachName}</span></div>
                                        <div
                                            className={`text-sm text-black font-normal flex items-center`}><span className={`font-medium`}>{item?.distance.scheduleDeparture}</span> <HiArrowLongRight className={`mx-2`}/> <span className={`font-medium`}>{item?.distance.scheduleDestination}</span></div>
                                    </div>
                                </div>
                                <div
                                    className={`bg-successColor text-white absolute py-1 px-2 top-3 right-3 font-normal rounded`}>
                                    Đã thanh toán
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
const ListTicketUsed = (props) => {
    return (
        props.listBookingTicketUsed && props.listBookingTicketUsed.map((item, index) => {
            return (
                <div key={index} className={`mt-4`}>
                    <div className={`mb-4 border-[1px] border-borderColor relative bg-white rounded`}>
                        <div
                            className={`w-full h-auto flex items-center justify-start border-0 p-0 m-0 cursor-pointer outline-0 leading-normal relative whitespace-nowrap text-center`}>
                            <div className={`flex flex-1 flex-col items-start py-2 px-4`}>
                                <div
                                    className={`font-semibold capitalize mb-2 text-sm leading-normal text-[#000000a6]`}>
                                    Chuyến đi: <span>{moment(item?.date).format("dddd, DD/MM/YYYY")}</span></div>
                                <div
                                    className={`text-2xl mb-1.5 font-semibold leading-normal`}>{item?.pickUp?.locationName} ({formatTimeArray(item?.pickUp?.time, "HH:mm")}) - {item?.dropOff?.locationName} ({formatTimeArray(item?.dropOff?.time, "HH:mm")})</div>
                                <div className={`text-sm mb-1.5 text-black font-normal`}>Xe: <span className={`font-medium`}>{item?.coachName}</span></div>
                                <div
                                    className={`text-sm text-black font-normal flex items-center`}><span className={`font-medium`}>{item?.distance.scheduleDeparture}</span> <HiArrowLongRight className={`mx-2`}/> <span className={`font-medium`}>{item?.distance.scheduleDestination}</span></div>
                            </div>
                        </div>
                        <div
                            className={`bg-white text-dangerColor-default_2 border-[1px] border-dangerColor-default_2 absolute py-1 px-2 top-3 right-3 font-normal rounded`}>
                            Đã sử dụng
                        </div>
                    </div>
                </div>
            )
        })
    )

}
const ListTicketCancel = (props) => {
    return (
        props.listBookingTicketCancel && props.listBookingTicketCancel.map((item, index) => {
            return (
                <div key={index} className={`mt-4`}>
                    <div className={`mb-4 border-[1px] border-borderColor relative bg-white rounded`}>
                        <div
                            className={`w-full h-auto flex items-center justify-start border-0 p-0 m-0 cursor-pointer outline-0 leading-normal relative whitespace-nowrap text-center`}>
                            <div className={`flex flex-1 flex-col items-start py-2 px-4`}>
                                <div
                                    className={`font-semibold capitalize mb-2 text-sm leading-normal text-[#000000a6]`}>
                                    Chuyến đi: <span>{moment(item?.date).format("dddd, DD/MM/YYYY")}</span></div>
                                <div
                                    className={`text-2xl mb-1.5 font-semibold leading-normal`}>{item?.pickUp?.locationName} ({formatTimeArray(item?.pickUp?.time, "HH:mm")}) - {item?.dropOff?.locationName} ({formatTimeArray(item?.dropOff?.time, "HH:mm")})</div>
                                <div className={`text-sm mb-1.5 text-black font-normal`}>Xe: <span className={`font-medium`}>{item?.coachName}</span></div>
                                <div
                                    className={`text-sm text-black font-normal flex items-center`}><span className={`font-medium`}>{item?.distance.scheduleDeparture}</span> <HiArrowLongRight className={`mx-2`}/> <span className={`font-medium`}>{item?.distance.scheduleDestination}</span></div>
                            </div>
                        </div>
                        <div
                            className={`bg-dangerColor-default_2 text-white absolute py-1 px-2 top-3 right-3 font-normal rounded`}>
                            Đã huỷ vé
                        </div>
                    </div>
                </div>
            )
        })
    )
}
export default MyTicket;