import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../context/ContextProvider.jsx";
import {AiOutlineClose} from "react-icons/ai";
import {message} from "../../utils/message.jsx";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux";
import {fetchLogin, fetchRegister} from "../../redux/slices/authSlice.jsx";
import {toast} from "react-toastify";
import {fetchGetUserByEmail, fetchPutUserUpdateInfo} from "../../redux/slices/userSlice.jsx";

const AuthenticationModal = () => {
    const {openLoginModal, setOpenLoginModal} = useContext(Context);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const dispatch = useDispatch()
    const [openModalInfo, setOpenModalInfo] = useState(false)
    const [formState, setFormState] = useState({
        id: 0,
        email: "",
        phoneNumber: "",
        gender: "",
        fullName: "",
        dateOfBirth: "",
        accessToken: ""
    })
    const handlePhoneNumberChange = (e) => {
        const {value} = e.target
        const isValidPhoneNumber = /^\d*[.]?\d*$/.test(value);
        if (isValidPhoneNumber) {
            setErrorPhoneNumber("")
            setPhoneNumber(value)
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'phoneNumber') {
            // For other input fields, update the state normally
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else {
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
        }
    }

    const handleSubmitGoogleSuccess = async (credentialResponse) => {
        const decode = jwt_decode(credentialResponse.credential)
        const findUser = await dispatch(fetchGetUserByEmail({email: decode.email})).unwrap()
        const data = {
            accessToken: credentialResponse.credential
        }
        // ko tìm thấy user => tiến hành đky
        if (findUser && findUser.code === 404) {
            const resRegister = await dispatch(fetchRegister({data})).unwrap()
            // dky thành công => mở modal nhập thông tin
            if (resRegister && resRegister.code === 201) {
                setOpenModalInfo(true)
                setErrorPhoneNumber("")
                setFormState(prevState => ({
                    ...prevState,
                    id: resRegister?.data?.user?.id,
                    email: resRegister?.data?.user?.email,
                    accessToken: credentialResponse.credential
                }))
            } else {
                toast.error(resRegister.message)
            }
        }
        // tìm thấy user => kiểm tra phoneNumber
        else if (findUser && findUser.code === 200) {
            // tk đã có phoneNumber => login
            if (findUser?.data?.phoneNumber !== "") {
                const resLogin = await dispatch(fetchLogin({data})).unwrap()
                if (resLogin && resLogin.code === 200) {
                    setOpenLoginModal(false)
                    toast.success(`Đăng nhập thành công`)
                }
            }
            // tk chưa có phoneNumber => mở modal nhập thông tin
            else {
                setOpenModalInfo(true)
                setErrorPhoneNumber("")
                setFormState(prevState => ({
                    ...prevState,
                    id: findUser?.data.id,
                    email: findUser?.data?.email,
                    accessToken: credentialResponse.credential
                }))
            }
        }
    }
    const handleUpdateInfo = async (e) => {
        e.preventDefault()
        const data = {
            id: formState.id,
            fullName: formState.fullName,
            dateOfBirth: formState.dateOfBirth,
            phoneNumber: formState.phoneNumber,
            gender: formState.gender,
            email: formState.email
        }

        const res = await dispatch(fetchPutUserUpdateInfo({data})).unwrap()
        if (res && res.code === 200) {
            const resLogin = await dispatch(fetchLogin({data: {accessToken: formState.accessToken}})).unwrap()
            if (resLogin && resLogin.code === 200) {
                setOpenLoginModal(false)
                toast.success(`Đăng nhập thành công`)
                handleCloseModal()
            }
        }
    }
    const handleLoginGoogleFailed = (e) => {
        toast.error(e)
    }
    const handleSubmitPhoneNumber = (e) => {
        e.preventDefault()
        if (phoneNumber === '') {
            setErrorPhoneNumber(message.error.phoneNumber.isEmpty)
            return
        }
    }
    const handleCloseModal = () => {
        setOpenLoginModal(false)
        setOpenModalInfo(false)
        setErrorPhoneNumber("")
        setPhoneNumber("")
        setFormState({
            id: 0,
            email: "",
            phoneNumber: "",
            gender: "",
            fullName: "",
            dateOfBirth: "",
            accessToken: ""
        })
    }
    const modal = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modal.current && !modal.current.contains(event.target)) {
                setOpenLoginModal(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modal]);
    return (
        <div ref={modal}
            className={`${openLoginModal ? 'block' : 'hidden'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[520px]`}>
            <div className="relative w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-center p-4 border-b rounded-t relative">
                        <div>
                            <h3 className="text-lg text-center font-semibold text-gray-900 capitalize">
                                {
                                    openModalInfo ? 'Xác thực thông tin' : 'Đăng nhập'
                                }
                            </h3>
                        </div>
                        <button type="button"
                                onClick={() => handleCloseModal()}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center absolute right-2">
                            <AiOutlineClose className={`w-5 h-5 text-dangerColor-default_2`}/>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={`h-full p-[20px] rounded-b-lg`}>
                        {
                            openModalInfo ?
                                <>
                                    <div className={`mb-5`}>
                                        <div className={`block bg-[#ecf4fd] p-4 rounded`}>
                                            <h3 className={`text-[14px] inline text-primaryColor leading-[20px]`}>
                                                Chúng tôi chỉ dùng thông tin bạn cung cấp trong việc ghi nhận vé.</h3>
                                        </div>
                                    </div>
                                    <form action={``} method={``}>
                                        <div>
                                            <label htmlFor={`email`} className={`text-[14px] leading-normal`}>Email</label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`email`} value={formState.email}
                                                       name={`email`}
                                                       autoComplete={`off`}
                                                       disabled={true}
                                                       readOnly={true}
                                                       type={`text`}
                                                       className={`cursor-not-allowed min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] bg-gray-200 outline-none border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor={`phoneNumber`} className={`text-[14px] leading-normal`}>
                                                Số điện thoại <span className={`text-dangerColor-default_2`}>*</span>
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <span
                                                    className={`z-[2] absolute left-[12px] top-1/2 flex items-center -translate-y-1/2 after:inline-block after:content-[''] after:w-[10px] after:h-[22px] after:border-r-[1px]`}>
                                                    +84
                                                </span>
                                                <input id={`phoneNumber`} value={formState.phoneNumber}
                                                       name={`phoneNumber`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={`text`}
                                                       className={`pl-[55px] min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>

                                        <div className="mt-2">
                                            <label htmlFor={`fullName`} className={`text-[14px] leading-normal`}>
                                                Họ và tên <span className={`text-dangerColor-default_2`}>*</span>
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`fullName`} value={formState.fullName}
                                                       name={`fullName`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={`text`}
                                                       className={`min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <h3 className={`text-[14px] leading-normal`}>Giới tính</h3>
                                            <ul className="mt-2 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                    <div className="flex items-center pl-3">
                                                        <input id="male" type="radio" value="Male"
                                                               name="gender"
                                                               onChange={handleInputChange}
                                                               className=""/>
                                                        <label htmlFor="male"
                                                               className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Nam</label>
                                                    </div>
                                                </li>
                                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                    <div className="flex items-center pl-3">
                                                        <input id="female" type="radio" value="Female"
                                                               name="gender"
                                                               onChange={handleInputChange}
                                                               className=""/>
                                                        <label htmlFor="female"
                                                               className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Nữ</label>
                                                    </div>
                                                </li>
                                                <li className="w-full">
                                                    <div className="flex items-center pl-3">
                                                        <input id="other" type="radio" value="Other"
                                                               onChange={handleInputChange}
                                                               name="gender"
                                                               className=""/>
                                                        <label htmlFor="other"
                                                               className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Khác</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor={`dateOfBirth`} className={`text-[14px] leading-normal`}>
                                                Ngày sinh
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`dateOfBirth`} value={formState.dateOfBirth}
                                                       name={`dateOfBirth`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={`date`}
                                                       className={`min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>
                                        <button onClick={handleUpdateInfo}
                                                className={`w-full mt-[15px] h-[40px] px-[15px] text-[16px] rounded-lg duration-300 bg-primaryColor_hover hover:bg-primaryColor text-white`}>
                                            Xác nhận
                                        </button>
                                    </form>
                                </> :
                                <>
                                    <form action={``} method={``}>
                                        <label htmlFor={`phoneNumber`} className={`text-[14px] leading-normal`}>
                                            Số điện thoại
                                        </label>
                                        <span
                                            className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                            <span
                                                className={`z-[2] absolute left-[12px] top-1/2 flex items-center -translate-y-1/2 after:inline-block after:content-[''] after:w-[10px] after:h-[22px] after:border-r-[1px]`}>
                                                +84
                                            </span>
                                            <input id={`phoneNumber`} value={phoneNumber ? phoneNumber : ''}
                                                   name={`phoneNumber`} onChange={handlePhoneNumberChange}
                                                   autoComplete={`off`}
                                                   type={`text`}
                                                   className={`pl-[55px] min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                        </span>
                                        {
                                            errorPhoneNumber && errorPhoneNumber.length > 0
                                                ? <span
                                                    className={`text-dangerColor-default_2 text-[13px]`}>{errorPhoneNumber}</span>
                                                : null
                                        }
                                        <button onClick={handleSubmitPhoneNumber}
                                                className={`w-full mt-[15px] h-[40px] px-[15px] text-[16px] rounded-lg duration-300 bg-primaryColor_hover hover:bg-primaryColor text-white`}>
                                            Tiếp tục
                                        </button>
                                    </form>
                                    <div
                                        className={`text-[16px] table text-center my-[16px] after:relative after:content-[''] after:translate-y-1/2 after:w-1/2 after:top-1/2 after:table-cell after:border-t-[0.5px] after:border-borderColor before:relative before:content-[''] before:translate-y-1/2 before:w-1/2 before:top-1/2 before:table-cell before:border-t-[1px] before:border-t-borderColor`}>
                                        <span className={`text-[13px] px-[10px]`}>hoặc</span>
                                    </div>
                                    <div className={`flex w-full items-center justify-center`}>
                                        <GoogleOAuthProvider
                                            clientId={`718549196101-v7ahan8rlf49tpll1giolpu1cd1s35qh.apps.googleusercontent.com`}>
                                            <GoogleLogin
                                                onSuccess={(credentialResponse) => handleSubmitGoogleSuccess(credentialResponse)}
                                                onError={() => handleLoginGoogleFailed(e)}/>
                                        </GoogleOAuthProvider>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationModal;