import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../context/ContextProvider.jsx";
import {AiOutlineClose} from "react-icons/ai";
import {generateString, handleConvertStringToSlug} from "../../utils/helper.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetCoachById} from "../../redux/slices/coachSlice.jsx";
import moment from "moment";
import {fetchRemoveBooingTicketState} from "../../redux/slices/bookingTicketSlice.jsx";

const BookingNewTicketModal = ({
                                   departureId,
                                   departureName,
                                   destinationId,
                                   destinationName,
                                   date,
                                   currentBookingTicket,
                                   scheduleCode,
                                   scheduleId
                               }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [coachName, setCoachName] = useState('')
    const {setOpenBookingNewTicketModal, openBookingNewTicketModal, coachDistance} = useContext(Context);
    const modal = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modal.current && !modal.current.contains(event.target)) {
                setOpenBookingNewTicketModal(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modal]);
    useEffect(() => {
        if (currentBookingTicket) {
            currentBookingTicket.map(async item => {
                const currentTime = moment(new Date)
                if (currentTime.isBefore(moment(item?.timeToExpire))) {
                    const res = await dispatch(fetchGetCoachById({id: item?.coachId})).unwrap()
                    if (res && res.code === 200) {
                        setCoachName(res?.data.name)
                    }
                }
            })
        }
    }, [currentBookingTicket])

    const handleGoBookingSeat = async () => {
        const res = await dispatch(fetchRemoveBooingTicketState({id: currentBookingTicket[0]?.id})).unwrap()
        if (res && res.code === 200) {
            const newCode = generateString(6)
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
                        coachId: coachDistance.coachId,
                        name: coachDistance.name,
                        priceFrom: coachDistance.priceFrom
                    },
                    distance: {
                        distanceId: coachDistance.distanceId,
                        defaultDropOff: coachDistance.defaultDropOff,
                        defaultPickUp: coachDistance.defaultPickUp,
                        pickUpDtoList: coachDistance.pickUpDtoList,
                        dropOffDtoList: coachDistance.dropOffDtoList,
                        startTimeOfDistance: coachDistance.startTimeOfDistance,
                        endTimeOfDistance: coachDistance.endTimeOfDistance
                    }
                }
            })
            handleCloseModal()
        }
    }
    const handleCloseModal = () => {
        setOpenBookingNewTicketModal(false)
    }
    return (
        <div ref={modal}
             className={`${openBookingNewTicketModal ? 'block' : 'hidden'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[520px]`}>
            <div className="relative w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-center p-4 border-b rounded-t relative">
                        <div>
                            <h3 className="text-lg text-center font-semibold text-gray-900 capitalize">
                                Bạn muốn đặt vé mới?
                            </h3>
                        </div>
                        <button type="button"
                                onClick={handleCloseModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center absolute right-2">
                            <AiOutlineClose className={`w-5 h-5 text-dangerColor-default_2`}/>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={`h-full p-[20px] rounded-b-lg`}>
                        <p>Chúng tôi vẫn đang giữ vé cho bạn tại xe {coachName}. Đặt vé mới sẽ hủy những vé này.</p>
                    </div>
                    <div
                        className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button type="button" onClick={handleCloseModal}
                                className={`flex w-full items-center justify-center bg-white hover:bg-gray-200 duration-300 text-black border-[1px] py-2 rounded-lg`}>Giữ
                            vé
                        </button>
                        <button type="button" onClick={handleGoBookingSeat}
                                className={`flex w-full items-center justify-center bg-primaryColor hover:bg-primaryColor_hover duration-300 text-white border-[1px] py-2 rounded-lg`}>
                            Đặt vé mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingNewTicketModal;