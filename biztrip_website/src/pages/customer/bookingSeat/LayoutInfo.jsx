import React, {useEffect, useState} from 'react';
import {RiArrowLeftSLine} from "react-icons/ri";
import {formatPriceToVND, validateForm} from "../../../utils/helper.jsx";
import {formInfoUserBookingTicket} from "../../../utils/validationRules.jsx";
import {useSelector} from "react-redux";
import moment from "moment";
import {fetchPostBookingTicket} from "../../../redux/slices/bookingTicketSlice.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {message} from "../../../utils/message.jsx";

const LayoutInfo = ({activeTab, handleGoPrevious, dispatch, seatsReducer, setFormState, formState}) => {

    const navigate = useNavigate()
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("")
    const [errorFullName, setErrorFullName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [helpBooking, setHelpBooking] = useState(false)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'email') {
            setErrorEmail('')
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'fullName') {
            setErrorFullName('')
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'phoneNumber') {
            const isValidNumber = /^\d*[.]?\d*$/.test(value);
            if (isValidNumber || value === '') {
                setErrorPhoneNumber('');
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            } else {
                setErrorPhoneNumber(message.error.phoneNumber.isInvalid);
            }
        } else {
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    const handleChangeHelpBooking = () => {
        setFormState(prevState => ({
            ...prevState,
            email: "",
            fullName: "",
            phoneNumber: "",
            note: ""
        }))
        setHelpBooking((prev) => !prev)
    }
    const handleVerificationInfo = async (e) => {
        e.preventDefault()
        const errors = validateForm(formState, formInfoUserBookingTicket)
        if (!(Object.keys(errors).length === 0)) {
            setErrorEmail(errors.email)
            setErrorPhoneNumber(errors.phoneNumber)
            setErrorFullName(errors.fullName)
        } else {
            setErrorEmail("")
            setErrorPhoneNumber("")
            setErrorFullName("")
            const listSeatId = seatsReducer.seatsState.map(item => (
                {
                    seatId: item.id
                }
            ))
            const data = {
                coachId: formState.coachId,
                price: seatsReducer.total,
                date: formState.date,
                distanceId: formState.distanceId,
                userId: formState.userId,
                helpBooking: helpBooking,
                bookingTicketDetails: listSeatId,
                passengerName: formState.fullName,
                passengerPhoneNumber: formState.phoneNumber,
                passengerEmail: formState.email,
                note: formState.note,
                startTimeOfDistance: formState.startTimeOfDistance,
                endTimeOfDistance: formState.endTimeOfDistance,
                pickUpPointId: formState.pickUpPointId,
                dropOffPointId: formState.dropOffPointId,
            }
            const res = await dispatch(fetchPostBookingTicket({data})).unwrap()
            if (res && res.code === 201) {
                // localStorage.setItem("bookingTicket", JSON.stringify(res.data));
                navigate(`/v1/users/thanh-toan/${res?.data?.reservationCode}`)
            } else {
                toast.error(res.message)
            }
        }
    }
    return (
        <>
            <div className={`flex justify-center flex-col items-center bg-white rounded-2xl rounded-tl-none p-3`}>
                <div className={`w-1/2 mt-4`}>
                    <div className={`inline-block bg-[#ecf4fd] p-4 rounded`}>
                        <h3 className={`text-[14px] inline text-primaryColor leading-[20px]`}>Chúng tôi chỉ dùng thông
                            tin bạn cung cấp trong việc ghi nhận vé.</h3>
                    </div>
                </div>
                <form className={`w-1/2 bg-white p-4 mt-4`}>
                    <div className={`group relative z-0 w-full mb-4`}>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" onClick={handleChangeHelpBooking} value={""} className="sr-only peer"/>
                                <div
                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span
                                    className="ml-3 text-sm font-medium text-gray-900">Đặt hộ vé</span>
                        </label>
                    </div>
                    <div className={`group relative z-0 w-full mb-6`}>
                        <input type="text"
                               name="fullName"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               autoComplete={`off`}
                               required
                               onChange={handleInputChange}
                               value={formState.fullName}/>
                        <label htmlFor="fullName"
                               className="peer-focus:font-medium absolute text-sm text-gray-900 font-semibold duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                            Họ và tên
                        </label>
                        {
                            errorFullName && errorFullName.length > 0
                                ? <span
                                    className={`text-dangerColor-default_2 text-sm font-medium`}>{errorFullName}</span>
                                : null
                        }
                    </div>
                    <div className={`group relative z-0 w-full mb-6`}>
                        <input type="text"
                               name="phoneNumber"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               autoComplete={`off`}
                               required
                               onChange={handleInputChange}
                               value={formState.phoneNumber}/>
                        <label htmlFor="phoneNumber"
                               className="peer-focus:font-medium absolute text-sm text-gray-900 font-semibold duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                            Số điện thoại
                        </label>
                        {
                            errorPhoneNumber && errorPhoneNumber.length > 0
                                ? <span
                                    className={`text-dangerColor-default_2 text-sm font-medium`}>{errorPhoneNumber}</span>
                                : null
                        }
                    </div>
                    <div className={`group relative z-0 w-full mb-6`}>
                        <input type="text"
                               name="email"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               autoComplete={`off`}
                               required
                               onChange={handleInputChange}
                               value={formState.email}/>
                        <label htmlFor="email"
                               className="peer-focus:font-medium absolute text-sm text-gray-900 font-semibold duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                            Email
                        </label>
                        {
                            errorEmail && errorEmail.length > 0
                                ? <span className={`text-dangerColor-default_2 text-sm font-medium`}>{errorEmail}</span>
                                : null
                        }
                    </div>
                    <div className={`group relative z-0 w-full mb-6`}>
                    <textarea required
                              autoComplete={`off`}
                              name="note"
                              id="note"
                              placeholder={" "}
                              value={formState.note}
                              onChange={handleInputChange}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none h-44"></textarea>
                        <label htmlFor="note"
                               className="peer-focus:font-medium absolute text-sm text-gray-900 font-semibold duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                            Ghi chú hoặc yêu cầu khác <span className={`text-lightColor`}>(Không bắt buộc)</span>
                        </label>
                    </div>
                </form>
                <p className={`w-1/2 p-4 text-[14px]`}>Bằng việc nhấn nút Tiếp Tục, bạn đồng ý với <span
                    className={`underline text-primaryColor cursor-pointer`}>Chính sách bảo mật thông tin</span> và <span
                    className={`underline text-primaryColor cursor-pointer`}>Quy chế</span></p>
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
                        {
                            activeTab !== 0 && <button
                                onClick={handleGoPrevious}
                                className={`flex items-center duration-300 text-white bg-dangerColor-default_2 hover:bg-dangerColor-hover_2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mr-4`}>
                                <RiArrowLeftSLine className={`mt-0.5 w-6 h-6`}/>
                                Quay lại
                            </button>
                        }
                        {
                            activeTab !== 3 && <button
                                onClick={handleVerificationInfo}
                                className={`flex items-center duration-300 text-white bg-primaryColor hover:bg-primaryColor_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center`}>
                                Tiếp tục
                                <RiArrowLeftSLine className={`rotate-180 mt-0.5 w-6 h-6`}/>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutInfo;