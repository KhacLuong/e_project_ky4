import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {validateForm} from "../../../utils/helper.jsx";
import {initialPriceTicketFormState} from "../../../utils/initial.jsx";
import {
    fetchCreatePriceTicket,
    fetchGetPriceTicketById,
    fetchUpdatePriceTicket
} from "../../../redux/slices/priceTicketSlice.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";
import {toast} from "react-toastify";
import {formTicketValidationRules} from "../../../utils/validationRules.jsx";

const PriceTicketForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa giá vé" : "Thêm mới giá vé", true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [disableButton, setDisableButton] = useState(false)
    const [formState, setFormState] = useState(initialPriceTicketFormState)
    const [errTitle, setErrTitle] = useState("")
    const [errFare, setErrFare] = useState("")
    useEffect(() => {
        if (id) {
            const test = async () => {
                await dispatch(fetchGetPriceTicketById({id})).unwrap()
            }
            test()
        }
    }, [id])
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormState((prevState) => {
            if (name === 'fare') {
                const isValidPrice = /^(?!0)\d+(\.\d{0,2})?$/.test(value);
                if (isValidPrice) {
                    setErrFare("")
                    return {
                        ...prevState,
                        [name]: value
                    }
                } else {
                    return {
                        ...prevState,
                        [name]: ''
                    }
                }
            } else {
                setErrTitle("")
                return {
                    ...prevState,
                    [name]: value
                }
            }
        })
    }
    const handleFormReset = () => {
        setDisableButton(false)
        setFormState(initialPriceTicketFormState);
        setErrFare("")
        setErrTitle("")
    };
    const handleSubmitForm = async e => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formTicketValidationRules)

        if (!(Object.keys(errors).length === 0)) {
            setErrTitle(errors.title)
            setErrFare(errors.fare)
            setDisableButton(false)
        } else {
            setErrTitle("")
            setErrFare("")
            const data = {
                'title': formState.title,
                'fare': +formState.fare
            }
            if (id) {
                data.id = id
                await dispatch(fetchUpdatePriceTicket({data, navigate, toast}))
            } else {
                await dispatch(fetchCreatePriceTicket({data, navigate, toast}))
            }
        }
    }
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý giá vé", "coaches/priceTicket")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa thông tin giá vé" : "Thêm mới giá vé"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <div className={`grid md:grid-cols-2 md:gap-6`}>
                        <div className={`w-full`}>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type={"text"}
                                       id={"title"}
                                       name={"title"}
                                       value={formState.title}
                                       onChange={handleInputChange}
                                       className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"}
                                       placeholder={" "}
                                       autoComplete={`off`}
                                       required/>
                                <label htmlFor="title"
                                       className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Loại vé
                                </label>
                                {
                                    errTitle && errTitle.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errTitle}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type={"text"}
                                       id={"fare"}
                                       name={"fare"}
                                       value={formState.fare}
                                       onChange={handleInputChange}
                                       className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"}
                                       placeholder={" "}
                                       autoComplete={`off`}
                                       required/>
                                <label htmlFor="fare"
                                       className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Giá vé
                                </label>
                                {
                                    errFare && errFare.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errFare}</span>
                                        : null
                                }
                            </div>
                            <div className={`flex items-center justify-end`}>
                                <button disabled={disableButton}
                                        onClick={handleSubmitForm}
                                        type="submit"
                                        className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                    {id ? 'Cập nhật' : 'Tạo'}
                                </button>
                                {
                                    !id ?
                                        <button onClick={handleFormReset}
                                                type="reset"
                                                className="ml-4 duration-300 bg-gray-100 text-gray-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Reset
                                        </button> :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PriceTicketForm;