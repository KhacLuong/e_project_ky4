import React, {useState} from 'react';
import Breadcrumb from "../../components/Breadcrumb.jsx";
import {message} from "../../utils/message.jsx";
import {validateEmail, validateEmpty, validateForm, validatePhoneNumber} from "../../utils/helper.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchCreateContact} from "../../redux/slices/contactSlice.jsx";
import {toast} from "react-toastify";

const formValidateRules = [
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
    {
        fieldName: "title",
        validationFn: validateEmpty,
        errorMessage: message.error.title.isEmpty
    },
    {
        fieldName: "email",
        validationFn: validateEmail,
        errorMessage: message.error.email.isInvalid
    },
    {
        fieldName: "phoneNumber",
        validationFn: validatePhoneNumber,
        errorMessage: message.error.phoneNumber.isInvalid
    },
    {
        fieldName: "content",
        validationFn: validateEmpty,
        errorMessage: message.error.content.isEmpty
    },
]

const Contact = () => {
    const [disableButton, setDisableButton] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formStatus, setFormStatus] = React.useState('Gửi')
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorFullName, setErrorFullName] = useState('')
    const [errorContent, setErrorContent] = useState('')
    const [errorTitle, setErrorTitle] = useState('')
    const [formState, setFormState] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        title: "",
        content: ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'phoneNumber') {
            if (name === 'email') {
                setErrorEmail("")
            } else if (name === 'fullName') {
                setErrorFullName("")
            }
            else if (name === 'title') {
                setErrorTitle("")
            }
            else if (name === 'content') {
                setErrorContent("")
            }
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
    const onSubmit = async (e) => {
        e.preventDefault()
        const errors = validateForm(formState, formValidateRules)
        if (!(Object.keys(errors).length === 0)) {
            setFormStatus("Gửi")
            setDisableButton(false)
            setErrorEmail(errors.email)
            setErrorFullName(errors.fullName)
            setErrorPhoneNumber(errors.phoneNumber);
            setErrorContent(errors.content)
            setErrorTitle(errors.title)
        } else {
            setFormStatus('Submitting...')
            setDisableButton(true)
            setErrorEmail("")
            setErrorFullName("")
            setErrorPhoneNumber("")
            setErrorContent("")
            setErrorTitle("")

            const data = {
                fullName: formState.fullName,
                email: formState.email,
                phoneNumber: formState.phoneNumber,
                title: formState.title,
                content: formState.content,
            }
            const res = await dispatch(fetchCreateContact({data})).unwrap()

            console.log(res)
            if (res && res.code === 201) {
                setFormState({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    title: "",
                    content: ""
                })
                setDisableButton(false)
                setFormStatus("Gửi")
                toast.success("Gửi thành công. Chúng tôi sẽ sớm có phản hồi sớm nhất dành cho quý khách")
            } else {
                setFormStatus("Gửi")
                setDisableButton(false)
                toast.error(res.message)
            }
        }
    }
    return (
        <section className={`w-full my-24`}>
            <div className={`flex max-w-7xl flex-col items-center mx-auto relative`}>
                <Breadcrumb dataBreadcrumb={dataBreadcrumb()}/>
                <div className={`grid grid-cols-5 gap-8 w-full`}>
                    <div className={`col-span-3 h-full`}>
                        <iframe
                            className={`w-full h-full`}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0966106665!2d105.77742577870795!3d21.028820030651836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86cece9ac1%3A0xa9bc04e04602dd85!2zRlBUIEFwdGVjaCBIw6AgTuG7mWkgLSBI4buHIFRo4buRbmcgxJDDoG8gVOG6oW8gTOG6rXAgVHLDrG5oIFZpw6puIFF14buRYyBU4bq_IChTaW5jZSAxOTk5KQ!5e0!3m2!1svi!2s!4v1692149975024!5m2!1svi!2s"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={`col-span-2 w-full`}>
                        <h2 className={`text-center font-medium text-lg mb-4`}>Liên hệ với chúng tôi</h2>
                        <div>
                            <div className="mb-3 flex flex-col mb-4">
                                <label className="form-label mb-2" htmlFor="fullName">
                                    Họ và tên <span className={`mr-1.5 text-dangerColor-default_2`}>(*)</span>
                                </label>
                                <input onChange={handleInputChange} value={formState.fullName} className="form-control outline-none ring-0 border-[1px] border-borderColor rounded-md" type="text" name={`fullName`} id="fullName" />
                                {
                                    errorFullName && errorFullName.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorFullName}</span>
                                        : null
                                }
                            </div>
                            <div className="mb-3 flex flex-col mb-4">
                                <label className="form-label mb-2" htmlFor="email">
                                    Email <span className={`mr-1.5 text-dangerColor-default_2`}>(*)</span>
                                </label>
                                <input onChange={handleInputChange} value={formState.email}  className="form-control outline-none ring-0 border-[1px] border-borderColor rounded-md" type="email" name={`email`} id="email"  />
                                {
                                    errorEmail && errorEmail.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorEmail}</span>
                                        : null
                                }
                            </div>
                            <div className="mb-3 flex flex-col mb-4">
                                <label className="form-label mb-2" htmlFor="phoneNumber">
                                    Số điện thoại <span className={`mr-1.5 text-dangerColor-default_2`}>(*)</span>
                                </label>
                                <input onChange={handleInputChange} value={formState.phoneNumber}  className="form-control outline-none ring-0 border-[1px] border-borderColor rounded-md" type="text" name={`phoneNumber`} id="phoneNumber" />
                                {
                                    errorPhoneNumber && errorPhoneNumber.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorPhoneNumber}</span>
                                        : null
                                }
                            </div>
                            <div className="mb-3 flex flex-col mb-4">
                                <label className="form-label mb-2" htmlFor="title">
                                    Tiêu đề <span className={`mr-1.5 text-dangerColor-default_2`}>(*)</span>
                                </label>
                                <input onChange={handleInputChange} value={formState.title}  className="form-control outline-none ring-0 border-[1px] border-borderColor rounded-md" type="text" name={`title`} id="title" />
                                {
                                    errorTitle && errorTitle.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorTitle}</span>
                                        : null
                                }
                            </div>
                            <div className="mb-3 flex flex-col mb-4">
                                <label className="form-label mb-2" htmlFor="content">
                                    Message <span className={`mr-1.5 text-dangerColor-default_2`}>(*)</span>
                                </label>
                                <textarea onChange={handleInputChange} value={formState.content}  className="form-control outline-none ring-0 border-[1px] border-borderColor rounded-md resize-none h-32" id="content" name={`content`} />
                                {
                                    errorContent && errorContent.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorContent}</span>
                                        : null
                                }
                            </div>
                            <button disabled={disableButton} className="bg-primaryColor text-white duration-300 hover:bg-primaryColor_hover w-full py-2 rounded-md" onClick={onSubmit}>
                                {formStatus}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
const dataBreadcrumb = () => {
    return [
        {
            name: "Trang chủ",
            path: "/"
        },
        {
            name: "Liên hệ",
            path: "/"
        },
    ]
}
export default Contact;