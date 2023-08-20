import React, {useContext, useEffect, useState} from 'react';
import {message} from "../../../utils/message.jsx";
import moment from "moment";
import {validateForm} from "../../../utils/helper.jsx";
import {formInfoProfileUser} from "../../../utils/validationRules.jsx";
import {fetchGetUserById, fetchPutUserUpdateInfo} from "../../../redux/slices/userSlice.jsx";
import {toast} from "react-toastify";
import {Context} from "../../../context/ContextProvider.jsx";

const MyInfo = ({userId, dispatch}) => {
    const [formState, setFormState] = useState({
        id: 0,
        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        email: ""
    })
    const [errorFullName, setErrorFullName] = useState("")
    useEffect(() => {
        if (userId) {
            const test = async () => {
                const res = await dispatch(fetchGetUserById({id: userId})).unwrap()
                if (res && res.code === 200) {
                    setFormState(prevState => ({
                        ...prevState,
                        id: res?.data?.id,
                        phoneNumber: res?.data?.phoneNumber,
                        fullName: res?.data?.fullName,
                        dateOfBirth: moment(res?.data?.dateOfBirth).format("YYYY-MM-DD"),
                        gender: res?.data?.gender,
                        email: res?.data?.email
                    }))
                }
            }
            test()
        }
    }, [userId])
    const handleInputChange = (e) => {
        const {name, value} = e.target
        if (name === 'fullName' && value === "") {
            setErrorFullName(message.error.name.isEmpty)
        } else if (name === 'fullName' && value !== "") {
            setErrorFullName("")
        }
        setFormState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const handleSelectChange = (selectedOption) => {
        setFormState((preState) => ({
            ...preState,
            gender: selectedOption.target.value,
        }));
    }
    const handleSaveInfoUser = async () => {
        const errors = validateForm(formState, formInfoProfileUser)
        if (!(Object.keys(errors).length === 0)) {
            setErrorFullName(errors.fullName)
        } else {
            setErrorFullName("")
            const data = {
                id: formState.id,
                fullName: formState.fullName,
                gender: formState.gender,
                dateOfBirth: formState.dateOfBirth,
                email: formState.email,
                phoneNumber: formState.phoneNumber
            }
            const res = await dispatch(fetchPutUserUpdateInfo({data})).unwrap()
            if (res && res.code === 200) {
                toast.success(`Cập nhật thành công`)
            } else {
                toast.error(res.message)
            }
        }
    }
    return (
        <div className={`h-full flex flex-col`}>
            <div className={`mb-[16px]`}>
                <div className={`inline-block py-[8px] px-[12px] rounded bg-[#ecf4fd]`}>
                    <p className={`text-[#0e63c1] text-sm`}>Bổ sung đầy đủ thông tin sẽ giúp
                        BizTrip hỗ trợ bạn tốt hơn khi đặt vé</p>
                </div>
            </div>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`phoneNumber`} className={`mb-[4px] text-[14px]`}>
                    Số điện thoại
                </label>
                <input type={`text`} id={`phoneNumber`} name={`phoneNumber`}
                       defaultValue={formState.phoneNumber} readOnly={true} disabled={true}
                       className={`cursor-not-allowed relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal border-[1px] border-[#d9d9d9] rounded text-[#00000040] bg-[#f5f5f5]`}/>
            </div>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`email`} className={`mb-[4px] text-[14px]`}>
                    Email
                </label>
                <input type={`text`} id={`email`} name={`email`}
                       defaultValue={formState.email} readOnly={true} disabled={true}
                       className={`cursor-not-allowed relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal border-[1px] border-[#d9d9d9] rounded text-[#00000040] bg-[#f5f5f5]`}/>
            </div>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`fullName`} className={`mb-[4px] text-[14px]`}>Họ và tên <span
                    className={`text-dangerColor-default_2`}>*</span></label>
                <input id={`fullName`} type={`text`} name={`fullName`}
                       autoComplete={`off`}
                       value={formState.fullName}
                       className={`relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal bg-white border-[1px] border-[#d9d9d9] rounded text-[#000000a6]`}
                       onChange={handleInputChange}/>
                {
                    errorFullName && errorFullName.length > 0
                        ? <span
                            className={`text-dangerColor-default_2 text-[13px] mt-1.5`}>{errorFullName}</span>
                        : null
                }
            </div>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`dateOfBirth`} className={`mb-[4px] text-[14px]`}>Ngày sinh</label>
                <input id={`dateOfBirth`} type={`date`} name={`dateOfBirth`} value={formState.dateOfBirth}
                       className={`relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal bg-white border-[1px] border-[#d9d9d9] rounded text-[#000000a6]`}
                       onChange={handleInputChange}/>
            </div>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`gender`} className={`mb-[4px] text-[14px]`}>Giới tính</label>
                <select id={`gender`} name={`gender`}
                        className={`w-2/12 relative inline-block h-32px py-[4px] px-[11px] text-[14px] leading-normal bg-white border-[1px] border-[#d9d9d9] rounded text-[#000000a6]`}
                        value={formState.gender} onChange={handleSelectChange}>
                    <option value={"Male"}>Nam</option>
                    <option value={"Female"}>Nữ</option>
                    <option value={"Other"}>Khác</option>
                </select>
            </div>
            <div className={`mt-auto pt-[16px] border-t-[1px] border-t-borderColor`}>
                <button onClick={handleSaveInfoUser}
                        className={`w-full text-white bg-primaryColor_hover hover:bg-primaryColor shadow-md h-[40px] px-[14px] text-[16px] rounded duration-300`}>Lưu
                </button>
            </div>
        </div>
    );
};

export default MyInfo;