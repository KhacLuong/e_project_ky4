import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context/ContextProvider.jsx";
import {useDispatch} from "react-redux";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {
    convertCurrentTimeToTimeFormat,
    convertMinutesToTime, formatPriceToVND, generateString, handleCalculateAverage,
    handleConvertStringToSlug
} from "../../../utils/helper.jsx";
import {useNavigate} from "react-router-dom";
import BookingNewTicketModal from "../../../components/customer/BookingNewTicketModal.jsx";
import {fetchGetBookingTicketByUserIdAndState} from "../../../redux/slices/bookingTicketSlice.jsx";
import {HiOutlineArrowNarrowRight} from "react-icons/hi";
import ReactPaginate from "react-paginate";
import {MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft} from "react-icons/md";

const Coaches = ({
                     scheduleCode,
                     scheduleId,
                     perPage,
                     setPerPage,
                     departureId,
                     destinationId,
                     departureName,
                     destinationName,
                     date,
                     listCoach,
                     setSortField,
                     setSortDir,
                     totalItems,
                     totalPages,
                     handleClickToPage,
                     lastItemPerPage,
                     firstItemPerPage,
                     turnOffPrevNextBtn,
                     listFilter
                 }) => {
    const navigate = useNavigate();
    console.log(listCoach)
    const {
        setOpenBookingNewTicketModal,
        setOpenModalCoach,
        setOpenLoginModal,
        userId,
        isAuthenticated,
        setCoach,
        setCoachDistance
    } = useContext(Context);

    const dispatch = useDispatch()
    const [currentBookingTicket, setCurrentBookingTicket] = useState([])

    const handleOpenCoachModal = (id, coach) => {
        setOpenModalCoach(true)
        setCoach(coach)
    }
    const handleGoBookingSeat = async (item, scheduleCode) => {
        if (isAuthenticated) {
            const resPending = await dispatch(fetchGetBookingTicketByUserIdAndState({
                userId: userId,
                state: "Pending"
            })).unwrap()
            if (resPending && resPending.code === 200 && resPending.data.length > 0) {
                setCoachDistance(item)
                setOpenBookingNewTicketModal(true)
                setCurrentBookingTicket(resPending.data)
            } else {
                const newCode = generateString(6).toString()
                navigate(`/v1/dat-ve/xe-tu-${handleConvertStringToSlug(departureName)}-di-${handleConvertStringToSlug(destinationName)}-${scheduleCode}?date=${date}`, {
                    state: {
                        scheduleId: scheduleId,
                        departure: {
                            id: departureId,
                            name: departureName
                        },
                        destination: {
                            id: destinationId,
                            name: destinationName
                        },
                        coach: {
                            coachId: item.coachId,
                            name: item.name,
                            priceFrom: item.priceFrom
                        },
                        distance: {
                            distanceId: item.distanceId,
                            defaultDropOff: item.defaultDropOff,
                            defaultPickUp: item.defaultPickUp,
                            pickUpDtoList: item.pickUpDtoList,
                            dropOffDtoList: item.dropOffDtoList,
                            startTimeOfDistance: item.startTimeOfDistance,
                            endTimeOfDistance: item.endTimeOfDistance
                        }
                    }
                })
            }
        } else {
            setOpenLoginModal(true)
        }
    }

    const handleChangeSort = (e) => {
        const {value} = e.target
        if (value) {
            const [field, order] = value.split("-")
            if (order) {
                setSortDir(order)
                setSortField(field)
            } else {
                setSortField(field)
            }
        } else {
            setSortField("startTime")
            setSortDir("asc")
        }
    }
    return (
        <>
            <BookingNewTicketModal departureId={departureId}
                                   departureName={departureName}
                                   destinationId={destinationId}
                                   destinationName={destinationName}
                                   currentBookingTicket={currentBookingTicket}
                                   date={date}
                                   scheduleCode={scheduleCode}
                                   scheduleId={scheduleId}/>
            <div className={`col-span-3`}>
                <div className={`text-[#484848] text-2xl font-medium relative`}>
                    <h1>Đặt mua vé xe đi {destinationName} từ {departureName} chất lượng cao và giá vé ưu đãi
                        nhất: </h1>
                    <span>{listCoach.length} chuyến</span>
                </div>
                <div className={`w-full`}>
                    <div className={`flex items-center justify-between mt-4 mb-6 bg-white sm:flex`}>
                        <div className={`inline-flex items-centers`}>
                            <label htmlFor="id={`perPage`} value={perPage}"
                                   className="text-[#484848] text-[14px] whitespace-nowrap flex items-center mr-2 font-semibold">
                                Hiển thị:
                            </label>
                            <select id={`perPage`}
                                    value={perPage}
                                    onChange={(e) => setPerPage(+e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                                {
                                    optionItemPerPage.map((item, index) => (
                                        <option key={index} value={item.value}>{item.text}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={`inline-flex items-centers w-1/4`}>
                            <label htmlFor="sort"
                                   className="text-[#484848] text-[14px] whitespace-nowrap flex items-center mr-2 font-semibold">
                                Sắp xếp theo:
                            </label>
                            <select id="sort"
                                    onChange={handleChangeSort}
                                    name={`sort`}
                                    className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 font-medium">
                                {
                                    optionSort.map((item, index) => (
                                        <option key={index} value={item.value}>{item.text}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`w-full`}>
                    {
                        listFilter.length > 0 && listFilter.map(item => (
                            <div className={`mr-4 bg-primaryColor`}>{item}</div>
                        ))
                    }
                </div>
                <div className={`w-full`}>
                    {
                        listCoach && listCoach.length > 0 && listCoach.map((item, index) => {
                            if (item?.status !== "disable" && item?.status !== "maintenance") {
                                return (
                                    <div key={index}
                                         className={`group/coach shadow-md rounded-md transition-all duration-500 border-[1px] hover:shadow-lg mb-10`}>
                                        <div className={`p-[16px]`}>
                                            <div className={`w-full bg-white min-h-[180px] flex`}>
                                                <div
                                                    className={`relative w-[180px] h-[180px] bg-cover bg-center bg-no-repeat mr-[16px] rounded-[4px]`}>
                                                    <img src={item.imagePath} alt={item.name}
                                                         className={`w-full h-full object-cover object-center-center absolute bottom-0 left-0 align-middle`}/>
                                                </div>
                                                <div className={`relative w-[calc(100%-180px)] min-h-[180px]`}>
                                                    <div
                                                        className={`text-[#484848] text-[14px] h-full flex flex-col justify-between`}>
                                                        <div className={`flex items-center`}>
                                                            <div
                                                                className={`text-[16px] text-[#484848] font-semibold mr-[8px]`}>{item.name}</div>
                                                            <div
                                                                className={`p-0 border-0 m-0 outline-0 leading-normal relative inline-block font-normal whitespace-nowrap text-center cursor-pointer`}>
                                                                <div
                                                                    className={`flex items-center bg-primaryColor text-white px-[6px] rounded py-0.5 `}>
                                                                    <svg aria-hidden="true"
                                                                         className="w-4 h-4 mr-1"
                                                                         fill="currentColor" viewBox="0 0 20 20"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <title>Rating star</title>
                                                                        <path
                                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                                        </path>
                                                                    </svg>
                                                                    <span
                                                                        className={`text-sm font-normal`}>{item?.avgOfGeneralRating} ({item?.listReview?.length})</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`mb-[20px]`}>
                                                            {item.description} {item.totalSeats} chỗ
                                                        </div>
                                                        <div className={`flex items-center text-[#707070]`}>
                                                            <svg className="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr"
                                                                 xmlns="http://www.w3.org/2000/svg" width="14" height="74"
                                                                 viewBox="0 0 14 74">
                                                                <path fill="none" stroke="#787878" strokeLinecap="round"
                                                                      strokeWidth="2"
                                                                      strokeDasharray="0 7" d="M7 13.5v46"></path>
                                                                <g fill="none" stroke="#484848" strokeWidth="3">
                                                                    <circle cx="7" cy="7" r="7" stroke="none"></circle>
                                                                    <circle cx="7" cy="7" r="5.5"></circle>
                                                                </g>
                                                                <path
                                                                    d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                                                                    fill="#787878"></path>
                                                            </svg>
                                                            <div
                                                                className={`flex flex-col items-start justify-between ml-2.5 h-20`}>
                                                                <div
                                                                    className={`flex leading-[20px] items-center text-[#484848]`}>
                                                                    <div
                                                                        className={`text-[20px] font-semibold  mr-[4px]`}>
                                                                        {convertCurrentTimeToTimeFormat(item?.startTimeOfDistance, "HH:mm")}
                                                                    </div>
                                                                    <div
                                                                        className={`w-[180px] text-[16px] line-clamp-1`}>
                                                                        &#x2022; {item?.defaultPickUp?.locationName}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {convertMinutesToTime(item?.timeDifference)}
                                                                </div>
                                                                <div
                                                                    className={`flex leading-[20px] items-center text-[#707070]`}>
                                                                    <div
                                                                        className={`text-[20px] font-semibold mr-[4px]`}>
                                                                        {convertCurrentTimeToTimeFormat(item?.endTimeOfDistance, "HH:mm")}
                                                                    </div>
                                                                    <div
                                                                        className={`w-[180px] text-[16px] line-clamp-1`}>
                                                                        &#x2022; {item?.defaultDropOff?.locationName}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`absolute top-0 right-0 w-[52%] text-right`}>
                                                        <div>
                                                            <div
                                                                className={`flex text-[20px] text-primaryColor items-baseline font-semibold justify-end mb-[4px]`}>
                                                                <span>{formatPriceToVND(item.priceFrom)}</span>
                                                            </div>
                                                            <div className={`flex items-baseline justify-end mb-[4px]`}>
                                                                <div
                                                                    className={`text-[14px] text-[#707070] font-normal line-through`}>
                                                                    {formatPriceToVND(250000)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`absolute bottom-0 right-0`}>
                                                        <div className={`mb-[8px]`}>
                                                            {
                                                                item?.availableSeat <= 5 ?
                                                                    <p className={`text-right text-[16px] text-dangerColor-hover_2 font-semibold`}>
                                                                        Chỉ còn {item?.availableSeat} chỗ trống
                                                                    </p> :
                                                                    <p className={`text-right text-[16px] text-[#484848]`}>
                                                                        Còn {item?.availableSeat} chỗ trống
                                                                    </p>
                                                            }
                                                        </div>
                                                        <div className={`flex items-end float-right`}>
                                                            <div
                                                                className={`px-[30px] text-primaryColor text-[16px] h-[25px] leading-normal inline-block relative font-normal whitespace-nowrap text-center cursor-pointer`}>
                                                                <button
                                                                    onClick={() => handleOpenCoachModal(item?.coachId, item)}
                                                                    className={`flex items-center relative font-medium transition-all duration-500 before:content[''] before:inline-block before:absolute before:w-0 before:bg-primaryColor before:h-[2px] before:left-auto before:right-0 before:duration-300 before:bottom-[-2px] hover:before:w-full hover:before:duration-700 hover:before:left-0 hover:before:right-auto`}>
                                                                    <AiOutlineInfoCircle className={`mr-1.5`}/>
                                                                    Thông tin chi tiết
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => handleGoBookingSeat(item, scheduleCode)}
                                                                className={`bg-successColor text-white font-medium rounded px-[16px] py-[8px] flex items-center h-[35px] cursor-pointer hover:bg-successColor_hover duration-300`}>
                                                                Chọn chuyến
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/*<div*/}
                                                    {/*    className={`absolute border-r-2 border-gray-300 border-dashed h-full top-0 left-[50%] -translate-x-1/2`}></div>*/}
                                                    {/*<div*/}
                                                    {/*    className={`absolute rotate-45 -top-[26%] translate-y-1/2 -translate-x-1/2 bg-white left-1/2 border-b-[2px] w-[30px] h-[30px] shadow-[inset_-2px_0px_1px_0px_rgba(0,0,0,0.1)]`}></div>*/}
                                                    {/*<div*/}
                                                    {/*    className={`absolute rotate-45 -bottom-[26%] -translate-y-1/2 -translate-x-1/2 bg-white left-1/2 border-t-[2px] w-[30px] h-[30px] shadow-[inset_2px_1px_3px_0px_rgba(0,0,0,0.1)]`}></div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className={`w-full`}>
                    {
                        totalItems > 0 && totalPages > 0 && (
                            <div
                                className={`items-center p-4 bg-white rounded-md shadow-lg shadow-gray-200 sm:flex sm:justify-between`}>
                                <div className={`flex items-center mb-4 sm:mb-0`}>
                                    {
                                        firstItemPerPage === totalItems
                                            ? <span className={`text-sm font-normal text-gray-500 flex`}>
                                                Hiển thị từ
                                                <span
                                                    className={`font-semibold text-gray-900 mx-1`}>{firstItemPerPage}/{totalItems}</span>
                                                kết quả
                                            </span>
                                            : <span className={`text-sm font-normal text-gray-500 flex`}>
                                                Hiển thị từ
                                                <span
                                                    className={`font-semibold text-gray-900 flex items-center mx-1`}>{firstItemPerPage}
                                                    <HiOutlineArrowNarrowRight className={`mx-1`}/>
                                                    {totalItems <= perPage ? totalItems : lastItemPerPage}
                                                </span>
                                                /
                                                <span
                                                    className={`font-semibold text-gray-900 mx-1`}>{totalItems}</span> kết quả
                                            </span>
                                    }
                                </div>
                                <ReactPaginate pageCount={totalPages}
                                               nextLabel={<div className={`flex items-center`}>Sau <MdKeyboardArrowRight
                                                   className={`w-5 h-5 ml-2`}/></div>}
                                               previousLabel={<div className={`flex items-center`}>
                                                   <MdOutlineKeyboardArrowLeft
                                                       className={`w-5 h-5 mr-2`}/> Trước</div>}
                                               onPageChange={handleClickToPage}
                                               pageRangeDisplayed={3}
                                               marginPagesDisplayed={2}
                                               pageClassName="pageClassName"
                                               pageLinkClassName="pageLinkClassName font-medium"
                                               previousClassName="previousClassName"
                                               previousLinkClassName="previousLinkClassName font-medium"
                                               nextClassName="nextClassName"
                                               nextLinkClassName="nextLinkClassName font-medium"
                                               breakLabel="..."
                                               breakClassName="breakLinkClassName text-xl font-medium"
                                               containerClassName="flex items-center justify-center inline-flex -space-x-px"
                                               activeLinkClassName="text-white bg-primaryColor"
                                               renderOnZeroPageCount={null}
                                               disabledClassName={turnOffPrevNextBtn ? 'hidden' : ''}
                                               disabledLinkClassName={turnOffPrevNextBtn ? 'hidden' : ''}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};
const optionItemPerPage = [
    {value: 6, text: '6'},
    {value: 9, text: '9'},
    {value: 12, text: '12'},
    {value: 15, text: '15'},
]

const optionSort = [
    {id: 0, value: '', text: '-- Lựa chọn --'},
    {id: 1, value: 'priceFrom', text: 'Giá tăng dần'},
    {id: 2, value: 'priceFrom-desc', text: 'Giá giảm dần'},
    {id: 3, value: 'startTime', text: 'Giờ đi sớm nhất'},
    {id: 4, value: 'startTime-desc', text: 'Giờ đi muộn nhất'},
]
export default Coaches;