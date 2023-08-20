import React, {useEffect, useReducer, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    convertLocalDateToGlobalDate,
    groupByPosition,
    handleConvertStringToSlug
} from "../../../utils/helper.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import LayoutSeat from "./LayoutSeat.jsx";
import LayoutLocation from "./LayoutLocation.jsx";
import LayoutInfo from "./LayoutInfo.jsx";
import {SEAT_INITIAL_STATE, seatReducer} from "../../../reducer/coachReducer.jsx";
import 'react-tabs/style/react-tabs.css';
import {toast} from "react-toastify";
import {fetchGetSeatByCoachIdAndTime} from "../../../redux/slices/coachSlice.jsx";
import moment from "moment";

const BookingSeat = () => {
    const account = useSelector(state => state.auth.account)

    const [seatsReducer, seatDispatch] = useReducer(seatReducer, SEAT_INITIAL_STATE)
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date')
    const scheduleCode = location.pathname.substring(location.pathname.lastIndexOf('-') + 1);
    const scheduleId = useLocation().state?.scheduleId
    const departureId = useLocation().state?.departure?.id
    const destinationId = useLocation().state?.destination?.id
    const departureName = useLocation().state?.departure?.name
    const destinationName = useLocation().state?.destination?.name

    const coachId = useLocation().state?.coach?.coachId
    const name = useLocation().state?.coach?.name
    const priceFrom = useLocation().state?.coach?.priceFrom
    const distanceId = useLocation().state?.distance?.distanceId
    const defaultDropOff = useLocation().state?.distance?.defaultDropOff
    const defaultPickUp = useLocation().state?.distance?.defaultPickUp
    const pickUpDtoList = useLocation().state?.distance?.pickUpDtoList
    const dropOffDtoList = useLocation().state?.distance?.dropOffDtoList
    const startTimeOfDistance = useLocation().state?.distance?.startTimeOfDistance
    const endTimeOfDistance = useLocation().state?.distance?.endTimeOfDistance
    const [coachLayout, setCoachLayout] = useState([])
    const [activeTab, setActiveTab] = useState(0);
    const [rows, setRows] = useState(0)
    const maxBoxesPerRow = 5
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [formState, setFormState] = useState({
        userId: 0,
        email: "",
        fullName: "",
        phoneNumber: "",
        note: "",
        pickUpPointId: defaultPickUp.id,
        dropOffPointId: defaultDropOff.id,
        distanceId: distanceId,
        date: moment(date, 'DD-MM-YYYY'),
        coachId: coachId,
        startTimeOfDistance: startTimeOfDistance,
        endTimeOfDistance: endTimeOfDistance,
    })
    useDocumentTitle(`Đặt vé xe từ ${departureName} đi ${destinationName} | BizTrip`, true)
    useEffect(() => {
        if (account && account.user) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    userId: account?.user?.id,
                    email: account?.user?.email,
                    phoneNumber: account?.user?.phoneNumber,
                    fullName: account?.user?.fullName
                }
            })
        }
    }, [account])
    useEffect(() => {
        if (coachId && coachId > 0) {
            const test = async () => {
                const res = await dispatch(fetchGetSeatByCoachIdAndTime({
                    coachId,
                    date: convertLocalDateToGlobalDate(date),
                    startTimeOfDistance: encodeURIComponent(startTimeOfDistance),
                    endTimeOfDistance: encodeURIComponent(endTimeOfDistance)
                })).unwrap()
                if (res && res.code === 200) {
                    setRows(res.data.length / maxBoxesPerRow)
                    setCoachLayout(groupByPosition(res.data))
                }
            }
            test()
        } else {
            navigate("/")
        }
    }, [coachId])
    const handleGoNext = () => {
        if (seatsReducer.seatsState.length > 0) {
            setActiveTab(prev => prev === 2 ? 2 : prev + 1);
        } else {
            toast.error("Vui lòng chọn ít nhất 1 vị trí")
        }
    };
    const handleGoPrevious = () => {
        setActiveTab(prev => prev === 0 ? prev = 0 : prev - 1)
    }

    const dataBreadcrumb = (departureName, departureId, destinationName, destinationId, convertDate) => {
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
                name: `Xe từ ${departureName} đi ${destinationName} ngày ${convertDate}`,
                path: `/v1/danh-sach-xe/xe-tu-${handleConvertStringToSlug(departureName)}-di-${handleConvertStringToSlug(destinationName)}-${scheduleCode}?date=${convertDate}`,
                data: {
                    scheduleId: scheduleId,
                    departureId: departureId,
                    departureName: departureName,
                    destinationId: destinationId,
                    destinationName: destinationName,
                }
            },
            {
                name: `${name}`,
                path: '/'
            }
        ]
    }
    const dataTab = [
        {
            label: "Chỗ mong muốn",
            value: 0,
            component: <LayoutSeat rows={rows}
                                   maxBoxesPerRow={maxBoxesPerRow}
                                   coachLayout={coachLayout}
                                   departureName={departureName}
                                   destinationName={destinationName}
                                   dispatch={seatDispatch}
                                   seatsReducer={seatsReducer}
                                   handleGoNext={handleGoNext}
                                   setCoachLayout={setCoachLayout}
                                   priceFrom={priceFrom}
                                   name={name}
                                   startTimeOfDistance={startTimeOfDistance}
                                   endTimeOfDistance={endTimeOfDistance}
                                   selectedBoxes={selectedBoxes}
                                   setSelectedBoxes={setSelectedBoxes}/>
        },
        {
            label: "Điểm đón trả",
            value: 1,
            component: <LayoutLocation handleGoNext={handleGoNext}
                                       handleGoPrevious={handleGoPrevious}
                                       setFormState={setFormState}
                                       formState={formState}
                                       seatsReducer={seatsReducer}
                                       pickUpDtoList={pickUpDtoList}
                                       dropOffDtoList={dropOffDtoList}
                                       defaultPickUp={defaultPickUp}
                                       defaultDropOff={defaultDropOff}/>
        },
        {
            label: "Thông tin",
            value: 2,
            component: <LayoutInfo activeTab={activeTab}
                                   handleGoPrevious={handleGoPrevious}
                                   seatsReducer={seatsReducer}
                                   dispatch={dispatch}
                                   formState={formState}
                                   setFormState={setFormState}/>
        }
    ]

    return (
        <section className={`w-full mt-24 mb-20`}>
            <div className={`flex max-w-7xl flex-col items-center mx-auto relative`}>
                <Breadcrumb
                    dataBreadcrumb={dataBreadcrumb(departureName, departureId, destinationName, destinationId, date)}/>
                <div className={`w-full px-[40px] rounded-2xl pb-[30px] bg-gray-100 shadow-lg`}>
                    <div className={``}>
                        <div className={`bg-gray-100 py-[30px]`}>
                            <h3 className={`font-semibold text-xl`}>
                                {
                                    activeTab === 0 ? "Chọn chỗ cho chuyến đi của bạn" :
                                        activeTab === 1 ? "Chọn địa điểm đón và trả" : "Nhập thông tin cơ bản"
                                }
                            </h3>
                        </div>
                        <Tabs selectedIndex={activeTab} onSelect={() => {
                        }} className={`overflow-visible h-full`}>
                            <TabList className="w-full flex rounded-none bg-transparent">
                                {
                                    dataTab.map(({label, value}) => (
                                        <Tab value={value}
                                             key={value}
                                             style={{
                                                 backgroundImage: `${value !== activeTab ? `repeating-linear-gradient(0deg, #adadad, #adadad 15px, transparent 15px, transparent 24px, #adadad 24px), repeating-linear-gradient(90deg, #adadad, #adadad 15px, transparent 15px, transparent 24px, #adadad 24px), repeating-linear-gradient(180deg, #adadad, #adadad 15px, transparent 15px, transparent 24px, #adadad 24px)` : ''}`,
                                                 backgroundSize: `2px 100%, 100% 2px, 2px 100% , 100% 2px`,
                                                 backgroundPosition: `0 0, 0 0, 100% 0, 0 100%`,
                                                 backgroundRepeat: `no-repeat`
                                             }}
                                             className={`py-3 cursor-pointer px-4 font-semibold mr-4 rounded-t-lg ${value !== activeTab ? 'text-[#adadad]' : 'text-black border-b-0 border-[2px] border-white outline-none'}`}>
                                            {label}
                                        </Tab>
                                    ))
                                }
                            </TabList>
                            <div className={`h-full`}>
                                {
                                    dataTab.map(({value, component}) => (
                                        <TabPanel key={value}
                                                  value={value}
                                                  className={`w-full`}>
                                            {component}
                                        </TabPanel>
                                    ))
                                }
                            </div>
                        </Tabs>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BookingSeat;