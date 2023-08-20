import React, {useContext, useEffect, useState} from 'react';
import Breadcrumb from "../../components/Breadcrumb.jsx";
import {listBreadcrumb} from "../../utils/data.jsx";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {
    validateEmpty,
    validateForm,
    validateLengthOfString, validatePhoneNumber
} from "../../utils/helper.jsx";
import {fetchChangePassword, fetchGetUserById, fetchPutUserUpdateInfo} from "../../redux/slices/userSlice.jsx";
import {toast} from "react-toastify";
import {message} from "../../utils/message.jsx";
import {Context} from "../../context/ContextProvider.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {fetchLogout} from "../../redux/slices/authSlice.jsx";

const formUserValidationRules = [
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
    {
        fieldName: "phoneNumber",
        validationFn: validatePhoneNumber,
        errorMessage: message.error.phoneNumber.isInvalid
    },
]
const formUserPasswordValidationRules = [
    {
        fieldName: "oldPassword",
        validationFn: validateEmpty,
        errorMessage: message.error.password.isEmpty
    },
    {
        fieldName: "newPassword",
        validationFn: validateEmpty,
        errorMessage: message.error.password.isEmpty
    },
]
const Profile = () => {
    const {userId} = useContext(Context)
    const [formState, setFormState] = useState({
        id: 0,
        email: "",
        phoneNumber: "",
        fullName: "",
        password: "",
        gender: "",
        dateOfBirth: ""
    })
    const [formPassword, setFormPassword] = useState({
        oldPassword: "",
        newPassword: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(false)
    const [errorFullName, setErrorFullName] = useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("")
    const [errorOldPassword, setErrorOldPassword] = useState("")
    const [errorNewPassword, setErrorNewPassword] = useState("")
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    useEffect(() => {
        if (userId) {
            const test = async () => {
                const res = await dispatch(fetchGetUserById({id: userId})).unwrap()
                if (res) {
                    if (res.code === 200) {
                        setFormState(prevState => ({
                            ...prevState,
                            id: userId,
                            dateOfBirth: res?.data?.dateOfBirth ? moment(res?.data?.dateOfBirth).local().format("YYYY-MM-DD") : "",
                            fullName: res?.data?.fullName,
                            email: res?.data?.email,
                            phoneNumber: res?.data?.phoneNumber,
                            gender: res.data?.gender ? res.data?.gender : ""
                        }))
                    } else {
                        toast.error(res.message)
                    }
                }
            }
            test()
        }
    }, [userId])
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'newPassword' || name === 'oldPassword') {
            if (name === 'newPassword') {
                setErrorNewPassword("")
            } else {
                setErrorOldPassword("")
            }
            setFormPassword(prevState => ({
                ...prevState,
                [name]: value
            }))
        } else {
            if (name === 'fullName') {
                setErrorFullName("")
            } else if (name === 'phoneNumber') {
                setErrorPhoneNumber("")
            }
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }
    }
    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setFormState((preState) => ({
            ...preState,
            [name]: value
        }));
    }
    const handleTogglePassword = () => {
        setShowOldPassword((showOldPassword) => !showOldPassword)
    }
    const handleToggleConfirmPassword = () => {
        setShowNewPassword((showNewPassword) => !showNewPassword)
    }
    const handleSubmitPassword = async e => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formPassword, formUserPasswordValidationRules)
        const oldPasswordLengthError = validateLengthOfString(formPassword.oldPassword, 6, 100)
        const newPasswordLengthError = validateLengthOfString(formPassword.newPassword, 6, 100)
        if (oldPasswordLengthError && formPassword.oldPassword.length > 0) {
            errors.oldPassword = oldPasswordLengthError
        }
        if (newPasswordLengthError && formPassword.newPassword.length > 0) {
            errors.newPassword = oldPasswordLengthError
        }
        if (!(Object.keys(errors).length === 0)) {
            setDisableButton(false)
            setErrorNewPassword(errors.newPassword)
            setErrorOldPassword(errors.oldPassword)
        } else {
            setErrorNewPassword("")
            setErrorOldPassword("")
            const data = {
                id: userId,
                oldPassword: formPassword.oldPassword,
                newPassword: formPassword.newPassword
            }
            const res = await dispatch(fetchChangePassword({data})).unwrap()
            if (res && res.code === 200) {
                toast.success("Đổi mật khẩu thành công")
                await dispatch(fetchLogout())
                navigate("/admin/v1/cms/sign-in")
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại")
            }
        }
    }
    const handleSubmitForm = async e => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formUserValidationRules)
        if (!(Object.keys(errors).length === 0)) {
            setErrorFullName(errors.fullName)
            setErrorPhoneNumber(errors.phoneNumber)
            setDisableButton(false)
        } else {
            setErrorFullName("")
            setErrorPhoneNumber("")

            const data = {
                id: formState.id,
                fullName: formState.fullName,
                gender: formState.gender,
                phoneNumber: formState.phoneNumber,
                dateOfBirth: formState.dateOfBirth,
                email: formState.email
            }
            const res = await dispatch(fetchPutUserUpdateInfo({data})).unwrap()
            if (res && res.code === 200) {
                navigate("/admin/v1/cms")
                setDisableButton(false)
                toast.success("Cập nhật tài khoản thành công")
            } else {
                setDisableButton(false)
            }
        }
    }
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={listBreadcrumb("Thông tin tài khoản")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}></h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200 `}>
                <form className={``}>
                    <div className="grid md:grid-cols-2 md:gap-20">
                        <div className="w-full">
                            <h3 className={`font-medium text-lg mb-6`}>Thông tin chi tiết</h3>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="text"
                                       name="fullName"
                                       id="fullName"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.fullName}/>
                                <label htmlFor="fullName"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Họ và tên
                                </label>
                                {
                                    errorFullName && errorFullName.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorFullName}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="text"
                                       name="phoneNumber"
                                       id="phoneNumber"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.phoneNumber}/>
                                <label htmlFor="phoneNumber"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Số điện thoại
                                </label>
                                {
                                    errorPhoneNumber && errorPhoneNumber.length > 0
                                        ?
                                        <span className={`text-dangerColor-default_2 text-sm`}>{errorPhoneNumber}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="date"
                                       name="dateOfBirth"
                                       id="dateOfBirth"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.dateOfBirth}/>
                                <label htmlFor="dateOfBirth"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Ngày sinh
                                </label>
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="gender"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Giới tính
                                </label>
                                <select id="gender"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name={"gender"}
                                        value={formState.gender}
                                        onChange={handleSelectChange}>
                                    <option value={""}>-- Chọn --</option>
                                    <option value={"Male"}>Nam</option>
                                    <option value={"Female"}>Nữ</option>
                                    <option value={"Other"}>Khác</option>
                                </select>
                            </div>
                            <div className={`flex items-center justify-end`}>
                                <button type="submit"
                                        disabled={disableButton}
                                        onClick={handleSubmitForm}
                                        className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                    Cập nhật thông tin
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <div>
                                <h3 className={`font-medium text-lg mb-6`}>Mật khẩu</h3>
                                <div className={`group relative z-0 w-full mb-6`}>
                                    <input type={showOldPassword ? "text" : "password"}
                                           name="oldPassword"
                                           id="oldPassword"
                                           onChange={handleInputChange}
                                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
                                           placeholder=" "
                                           required
                                           value={formPassword.oldPassword}
                                           autoComplete={`off`}/>
                                    <span
                                        className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                        onClick={handleTogglePassword}>
                                                {
                                                    showOldPassword ?
                                                        <AiFillEye className={`w-5 h-5 text-black`}/> :
                                                        <AiFillEyeInvisible className={`w-5 h-5 text-black`}/>
                                                }
                                            </span>
                                    <label htmlFor="oldPassword"
                                           className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mật
                                        khẩu cũ</label>
                                    {
                                        errorOldPassword && errorOldPassword.length > 0
                                            ? <span
                                                className={`text-dangerColor-default_2 text-sm`}>{errorOldPassword}</span>
                                            : null
                                    }
                                </div>
                                <div className={`group relative z-0 w-full mb-6`}>
                                    <input type={showNewPassword ? "text" : "password"}
                                           name="newPassword"
                                           id="newPassword"
                                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                           placeholder=" "
                                           required
                                           onChange={handleInputChange}
                                           value={formPassword.newPassword}
                                           autoComplete={`off`}/>
                                    <span
                                        className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                        onClick={handleToggleConfirmPassword}>
                                                {
                                                    showNewPassword ?
                                                        <AiFillEye className={`w-5 h-5 text-black`}/> :
                                                        <AiFillEyeInvisible className={`w-5 h-5 text-black`}/>
                                                }
                                            </span>
                                    <label htmlFor="newPassword"
                                           className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Mật khẩu mới
                                    </label>
                                    {
                                        errorNewPassword && errorNewPassword.length > 0
                                            ? <span
                                                className={`text-dangerColor-default_2 text-sm`}>{errorNewPassword}</span>
                                            : null
                                    }
                                </div>
                            </div>
                            <div className={`flex items-center justify-end`}>
                                <button type="submit"
                                        disabled={disableButton}
                                        onClick={handleSubmitPassword}
                                        className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                    Cập nhật mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Profile;