import React, {useContext, useEffect, useState} from 'react';
import CountDownTime from "../../components/customer/CountDownTime.jsx";
import zaloIcon from "../../assets/image/svg/zalo_pay.svg";
import creditIcon from "../../assets/image/svg/credit_card.svg";
import momoIcon from "../../assets/image/svg/momo.svg";
import busIcon from "../../assets/image/svg/bus_station.svg";
import atmIcon from "../../assets/image/svg/atm.svg";
import bankIcon from "../../assets/image/svg/bank_transfer.svg";
import {useNavigate, useParams} from "react-router-dom";
import {AiOutlineClose, AiOutlineSelect} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchGetBookingTicketByReservationCode, fetchPutConfirmBookingTicket,
    fetchRemoveBooingTicketState
} from "../../redux/slices/bookingTicketSlice.jsx";
import {formatPriceToVND, formatTimeArray} from "../../utils/helper.jsx";
import {
    CardElement, Elements, CardNumberElement,
    CardCvcElement,
    CardExpiryElement, useElements, useStripe
} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import {toast} from "react-toastify";

const Payment = () => {
    const userId = useSelector(state => state.auth.account)?.user?.id
    const {slug} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openModalNotification, setOpenModalNotification] = useState(false)
    const [isTimeExpire, setIsTimeExpire] = useState(false)
    const [bookingTicket, setBookingTicket] = useState({})
    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect(() => {
        if (slug) {
            const test = async () => {
                const res = await dispatch(fetchGetBookingTicketByReservationCode({slug: slug})).unwrap()
                if (res && res.code === 200 && res.data.state === "Pending") {
                    setBookingTicket(res.data)
                } else {
                    navigate("/")
                }
            }
            test()
        }
    }, [])
    useEffect(() => {
        if (openModalNotification) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [openModalNotification])

    const handleRemoveTicket = async () => {
        await dispatch(fetchRemoveBooingTicketState({id: bookingTicket?.id})).unwrap()
        setIsTimeExpire(false)
        setOpenModalNotification(false)
        navigate("/")
    }

    const handleSelectPaymentMethod = (e) => {
        const {name, value} = e.target
        setPaymentMethod(value)
    }

    const handleGoToHomePage = () => {
        setIsTimeExpire(false)
        setOpenModalNotification(false)
        navigate("/")
    }
    const handleBookingTicket = async () => {
        if (paymentMethod === 'later-payment') {
            const res = await dispatch(fetchPutConfirmBookingTicket({id: bookingTicket.id})).unwrap()
            if (res && res.code === 200) {
                navigate("/v1")
                toast.success("Đặt vé thành công. Vui lòng kiểm tra thông tin vé trong trang cá nhân")
            } else {
                toast.error("Đặt vé thất bại. Vui lòng thử lại")
            }
        } else {
            const data = {
                totalAmount: bookingTicket.price,
                userId: userId,
                orderItemRequests: [
                    {
                        bookingTicketId: bookingTicket.id,
                        subAmount: bookingTicket.price,
                    }
                ]
            }
        }

    }

    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    const appearance = {
        theme: 'stripe',
    };
    const [clientSecret, setClientSecret] = useState("");
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <section className={`relative`}>
            <div
                className={`${openModalNotification ? 'block' : 'hidden'} fixed z-40 bg-[#484848] top-0 left-0 w-full h-full opacity-[0.58]`}></div>
            <div
                className={`${openModalNotification ? 'block' : 'hidden'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[520px]`}>
                <div className="relative w-full max-w-2xl">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-center p-4 border-b rounded-t relative">
                            <div>
                                <h3 className="text-lg text-center font-semibold text-gray-900 capitalize">
                                    {
                                        isTimeExpire ? 'Thời hạn thanh toán vé đã hết!' : 'Bạn có chắc muốn quay lại?'
                                    }
                                </h3>
                            </div>
                            {
                                !isTimeExpire && <button type="button"
                                                         onClick={() => setOpenModalNotification(false)}
                                                         className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center absolute right-2">
                                    <AiOutlineClose className={`w-5 h-5 text-dangerColor-default_2`}/>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            }
                        </div>
                        <div className={`h-full p-[20px] rounded-b-lg`}>
                            <p>
                                {
                                    isTimeExpire ? 'Xin quý khách vui lòng đặt lại vé khác. BizTrip chân thành cảm ơn.' : 'Vé vẫn đang được giữ cho bạn, bạn nhớ thanh toán để đặt vé thành công nhé.'
                                }
                            </p>
                        </div>
                        <div
                            className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b">

                            {
                                isTimeExpire ?
                                    <button onClick={handleRemoveTicket}
                                            className={`flex w-full items-center justify-center bg-primaryColor hover:bg-primaryColor_hover duration-300 text-white border-[1px] py-2 rounded-lg`}>
                                        Đặt vé mới
                                    </button> :
                                    <>
                                        <button type="button" onClick={handleGoToHomePage}
                                                className={`flex w-full items-center justify-center bg-white hover:bg-gray-200 duration-300 text-black border-[1px] py-2 rounded-lg`}>
                                            Quay lại
                                        </button>
                                        <button type={`button`} onClick={() => setOpenModalNotification(false)}
                                                className={`flex w-full items-center justify-center bg-primaryColor hover:bg-primaryColor_hover duration-300 text-white border-[1px] py-2 rounded-lg`}>
                                            Tiếp tục thanh toán
                                        </button>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <header
                className={`fixed top-0 left-0 right-0 w-full z-30 border-b-2 ${openModalNotification ? 'pr-[0.4rem]' : ''}`}>
                <div className={`flex mx-auto relative`}>
                    <div className={`md:w-full relative`}>
                        <nav className="bg-white">
                            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
                                <button onClick={() => setOpenModalNotification(true)}
                                        className="col-span-1 flex rounded-l-xl items-center bg-white h-full cursor-pointer">
                                    <img src={`https://eprojectsem4.blob.core.windows.net/web/logo-vexere.jpg`}
                                         alt={`logo`} className={`w-36`}/>
                                </button>
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                                    <CountDownTime timeToAdd={bookingTicket?.timeToAdd}
                                                   timeToExpire={bookingTicket?.timeToExpire}
                                                   setOpenModalNotification={setOpenModalNotification}
                                                   setIsTimeExpire={setIsTimeExpire}/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <div className={`w-full my-24 ${openModalNotification ? 'pr-[0.4rem]' : ''}`}>
                <div
                    className={`grid grid-cols-8 gap-3 bg-white rounded-2xl rounded-tl-none p-3 max-w-7xl mx-auto relative`}>
                    <div className={`col-span-8 flex items-center justify-between`}>
                        <div className={`mt-4`}>
                            <div className={`inline-block bg-[#ecf4fd] p-4 rounded`}>
                                <h3 className={`text-[14px] inline text-primaryColor leading-[20px]`}>
                                    Phương thức thanh toán đa dạng, bảo mật.
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={`col-span-5 mt-4`}>
                        <div className={`sticky top-[5rem]`}>
                            <h3 className={`font-medium text-[18px] text-gray-600`}>Phương thức thanh toán</h3>
                            <div
                                className={`relative w-full mt-3 h-auto py-0 px-[16px] overflow-hidden transition-all duration-300 rounded border-[1px]`}>
                                <div className={`py-[20px] px-0 border-b-[1px] border-gray-200 last:border-b-0`}>
                                    <div className={`ml-8 mb-2 text-sm text-dangerColor-default_2`}>Phương thức thanh
                                        toán không áp dụng cho chuyến đi này
                                    </div>
                                    <div className={`opacity-50`}>
                                        <label className={`flex items-center`}>
                                        <span className={`mr-4 w-4`}>
                                            <input type={`radio`} value={`zalo-payment`} name={`payment`}
                                                   onChange={handleSelectPaymentMethod} disabled={true}/>
                                        </span>
                                            <span className={`flex items-center`}>
                                            <img src={zaloIcon} alt={`zalo`}/>
                                            <p className={`text-[16px] font-medium leading-[24px] pl-[10px]`}>Ví Zalopay</p>
                                        </span>
                                        </label>
                                        <div className={`ml-8 mt-2`}>
                                            <p className={`font-normal text-[14px] leading-[20px]`}>
                                                Điện thoại của bạn phải được cài đặt ứng dụng Zalopay
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`py-[20px] px-0 border-b-[1px] border-gray-200 last:border-b-0`}>
                                    <label className={`flex items-center`}>
                                        <span className={`mr-4 w-4`}>
                                            <input type={`radio`} value={`international-payments`} name={`payment`}
                                                   onChange={handleSelectPaymentMethod}/>
                                        </span>
                                        <span className={`flex items-center`}>
                                            <img src={creditIcon} alt={`credit`}/>
                                            <p className={`text-[16px] font-medium leading-[24px] pl-[10px]`}>Thẻ thanh toán quốc tế</p>
                                        </span>
                                    </label>
                                    <div className={`ml-8 mt-2`}>
                                        <p className={`font-normal text-[14px] leading-[20px]`}>Thẻ Visa, MasterCard,
                                            JCB</p>
                                    </div>
                                    {
                                        paymentMethod === 'international-payments' &&
                                        <Elements stripe={stripePromise}>
                                            <Card/>
                                        </Elements>
                                    }

                                </div>
                                <div className={`py-[20px] px-0 border-b-[1px] border-gray-200 last:border-b-0`}>
                                    <div className={`ml-8 mb-2 text-sm text-dangerColor-default_2`}>Phương thức thanh
                                        toán không áp dụng cho chuyến đi này
                                    </div>
                                    <div className={`opacity-50`}>
                                        <label className={`flex items-center`}>
                                        <span className={`mr-4 w-4`}>
                                            <input type={`radio`} value={`momo-payment`} name={`payment`}
                                                   onChange={handleSelectPaymentMethod} disabled={true}/>
                                        </span>
                                            <span className={`flex items-center`}>
                                            <img src={momoIcon} alt={`momo`}/>
                                            <p className={`text-[16px] font-medium leading-[24px] pl-[10px]`}>Ví MoMo</p>
                                        </span>
                                        </label>
                                        <div className={`ml-8 mt-2`}>
                                            <p className={`font-normal text-[14px] leading-[20px]`}>
                                                Điện thoại của bạn phải được cài đặt ứng dụng MoMo
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`py-[20px] px-0 border-b-[1px] border-gray-200 last:border-b-0`}>
                                    <label className={`flex items-center`}>
                                        <span className={`mr-4 w-4`}>
                                            <input type={`radio`} value={`later-payment`} name={`payment`}
                                                   onChange={handleSelectPaymentMethod}/>
                                        </span>
                                        <span className={`flex items-center`}>
                                            <img src={busIcon} alt={`bus`}/>
                                            <p className={`text-[16px] font-medium leading-[24px] pl-[10px]`}>Thanh toán khi lên xe</p>
                                        </span>
                                    </label>
                                    <div className={`ml-8 mt-2`}>
                                        <p className={`font-normal text-[14px] leading-[20px]`}>
                                            Bạn có thể thanh toán cho tài xế khi lên xe
                                        </p>
                                    </div>
                                    <div className={`ml-8 mt-2 bg-warningColor inline-block rounded`}>
                                        <p className={`font-normal text-[14px] leading-[20px] px-1.5 text-white py-0.5 `}>
                                            Lưu ý: bạn sẽ phải chịu thêm 10% phí giữ chỗ
                                        </p>
                                    </div>
                                </div>
                                <div className={`py-[20px] px-0 border-b-[1px] border-gray-200 last:border-b-0`}>
                                    <label className={`flex items-center`}>
                                        <span className={`mr-4 w-4`}>
                                            <input type={`radio`} value={`atm-payment`} name={`payment`}
                                                   onChange={handleSelectPaymentMethod}/>
                                        </span>
                                        <span className={`flex items-center`}>
                                            <img src={atmIcon} alt={`atm`}/>
                                            <p className={`text-[16px] font-medium leading-[24px] pl-[10px]`}>Thẻ ATM nội địa / Internet Banking</p>
                                        </span>
                                    </label>
                                    <div className={`ml-8 mt-2`}>
                                        <p className={`font-normal text-[14px] leading-[20px]`}>Tài khoản phải có đăng
                                            ký
                                            Internet banking</p>
                                    </div>
                                </div>
                                {/*<div className={`py-[20px] px-0 border-b-[1px] border-gray-200 last:border-b-0`}>*/}
                                {/*    <label className={`flex items-center`}>*/}
                                {/*    <span className={`mr-4 w-4`}>*/}
                                {/*        <input type={`radio`} name={`payment`} onChange={handleSelectPaymentMethod}/>*/}
                                {/*    </span>*/}
                                {/*        <span className={`flex items-center`}>*/}
                                {/*        <img src={bankIcon} alt={`bank`}/>*/}
                                {/*        <p className={`text-[16px] font-medium leading-[24px] pl-[10px]`}>Chuyển khoản ngân hàng</p>*/}
                                {/*    </span>*/}
                                {/*    </label>*/}
                                {/*    <div className={`ml-8 mt-2`}>*/}
                                {/*        <p className={`font-normal text-[14px] leading-[20px]`}>Chuyển khoản đến tài khoản*/}
                                {/*            ngân*/}
                                {/*            hàng của BizTrip</p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={`col-span-3 mt-4`}>
                        <h3 className={`font-medium text-[18px] text-gray-600`}>Thông tin chuyến đi</h3>
                        <div className={`mb-4 p-[20px] h-auto border-[1px] rounded mt-3`}>
                            <div className={`flex flex-col`}>
                                <div className={`flex items-center text-gray-900`}>
                                    <div className={`font-normal text-xs`}>Hành khách</div>
                                    <div className={`flex justify-end flex-1`}>
                                        <button
                                            className={`text-sm inline-flex items-center justify-center text-center duration-300 cursor-pointer text-primaryColor hover:text-primaryColor_hover`}>
                                            <AiOutlineSelect className={`w-5 h-5 mr-1.5`}/> Sửa
                                        </button>
                                    </div>
                                </div>
                                <div className={`text-base`}>{bookingTicket?.passengerName}</div>
                                <div className={`flex items-center text-xs text-gray-900 font-light mt-4`}>
                                    <div className={`font-normal`}>Số điện thoại</div>
                                </div>
                                <div className={`text-base`}>{bookingTicket?.passengerPhoneNumber}</div>
                                <div className={`flex items-center text-xs text-gray-900 font-light mt-4`}>
                                    <div className={`font-normal`}>Email</div>
                                </div>
                                <div className={`text-base`}>{bookingTicket?.passengerEmail}</div>
                                <div className={`h-[1px] mt-4 bg-borderColor`}></div>
                                <div className={`flex items-center text-xs text-gray-900 font-light mt-4`}>
                                    <div className={`font-normal`}>Xe</div>
                                </div>
                                <div className={`text-base`}>{bookingTicket?.coachName}</div>
                                <div className={`flex items-center text-xs text-gray-900 font-light mt-4`}>
                                    <div className={`font-normal`}>Lộ trình</div>
                                </div>
                                <div
                                    className={`text-base`}>{bookingTicket?.distance?.scheduleDeparture} - {bookingTicket?.distance?.scheduleDestination}</div>
                                <div className={`flex items-center text-xs text-gray-900 font-light mt-4`}>
                                    <div className={`font-normal`}>Điểm đón (dự kiến)</div>
                                    <div className={`flex justify-end flex-1`}>
                                        <button
                                            className={`text-sm inline-flex items-center justify-center text-center duration-300 cursor-pointer text-primaryColor hover:text-primaryColor_hover`}>
                                            <AiOutlineSelect className={`w-5 h-5 mr-1.5`}/> Sửa
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`text-base`}>{bookingTicket?.pickUp?.locationName} ({formatTimeArray(bookingTicket?.pickUp?.time, "HH:mm")})
                                </div>
                                <div className={`flex items-center text-xs text-gray-900 font-light mt-4`}>
                                    <div className={`font-normal`}>Điểm trả (dự kiến)</div>
                                    <div className={`flex justify-end flex-1`}>
                                        <button
                                            className={`text-sm inline-flex items-center justify-center text-center duration-300 cursor-pointer text-primaryColor hover:text-primaryColor_hover`}>
                                            <AiOutlineSelect className={`w-5 h-5 mr-1.5`}/> Sửa
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`text-base`}>{bookingTicket?.dropOff?.locationName} ({formatTimeArray(bookingTicket?.dropOff?.time, "HH:mm")})
                                </div>
                                <div className={`h-[1px] mt-4 bg-borderColor`}></div>
                                <table
                                    className={`w-full text-xs text-gray-900 font-light mt-4 text-left`}>
                                    <thead>
                                    <tr className={`font-medium`}>
                                        <th className={`w-3/5`}>Vé</th>
                                        <th className={`w-1/5 text-center`}>Vị trí</th>
                                        <th className={`w-1/5 min-w-1/5 text-center`}>Giá</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        bookingTicket?.seats && bookingTicket?.seats.length > 0 && bookingTicket?.seats.map((item, index) => {
                                            return (
                                                <tr key={index} className={`text-base mt-2`}>
                                                    <td>
                                                        {item?.priceTicketId?.title}
                                                    </td>
                                                    <td className={`text-center`}>{
                                                        item?.seatCode}
                                                    </td>
                                                    <td className={`italic whitespace-nowrap`}>
                                                        x {formatPriceToVND(item?.priceTicketId?.fare)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`bg-gray-100 mt-7 p-[20px] rounded`}>
                            <div className={`flex justify-between items-center text-lg font-normal`}>
                                <h3 className={``}>
                                    Số lượng:</h3>
                                <h3 className={``}>
                                    Tổng tiền</h3>
                            </div>
                            <div className={`flex justify-between items-center font-medium text-2xl text-successColor`}>
                                <h3 className={``}>
                                    {bookingTicket?.bookingTicketDetails?.length}</h3>
                                {
                                    paymentMethod === 'later-payment' ?
                                        <h3 className={``}>
                                            {formatPriceToVND(bookingTicket?.price + bookingTicket?.price * 0.1)}</h3> :
                                        <h3 className={``}>
                                            {formatPriceToVND(bookingTicket?.price)}</h3>
                                }
                            </div>
                        </div>
                        <div onClick={handleBookingTicket}
                             className={`bg-successColor hover:bg-successColor_hover duration-300 mt-7 p-[14px] cursor-pointer text-white items-center justify-center flex text-lg rounded`}>
                            Đặt vé
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
const Card = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState('');
    const [isProcessing, setProcessingTo] = useState(false);
    const handleCardDetailsChange = event => {
        event.error ? setCheckoutError(event.error.message) : setCheckoutError('');
    };
    return (
        <form className={`w-1/2 ml-8 mt-4`}>
            <label>
                <span className={``}>Số thẻ tín dụng / ghi nợ</span>
                <CardNumberElement className={`mt-1 border-[1px] border-borderColor py-3 px-2 rounded-md`}
                                   onChange={handleCardDetailsChange}/>
            </label>
            <div className={`grid grid-cols-2 gap-6 mt-3`}>
                <label>
                    <span>Ngày hết hạn</span>
                    <CardExpiryElement className={`mt-1 border-[1px] border-b-borderColor py-3 px-2 rounded-md `}
                                       onChange={handleCardDetailsChange}/>
                </label>
                <label>
                    <span>Mã bảo mật</span>
                    <CardCvcElement className={`mt-1 border-[1px] border-b-borderColor py-3 px-2 rounded-md `}
                                    onChange={handleCardDetailsChange}/>
                </label>
            </div>
            {/* {!checkoutError && <CheckoutError>{checkoutError}</CheckoutError>} */}
        </form>
    )
}
export default Payment;