import React, {useEffect, useRef, useState} from 'react';
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import image_add from "../../../assets/image/image_add.png";
import {
    handleOpenFileInput,
    validateFile,
    validateForm
} from "../../../utils/helper.jsx";
import {useDispatch} from 'react-redux'
import {fetchCreateFile} from "../../../redux/slices/fileSlice.jsx";
import {fetchGetUtilityById, fetchUpdateUtility, fetchCreateUtility} from "../../../redux/slices/utilitySlice.jsx";
import {toast} from "react-toastify";
import {formBreadCrumb} from "../../../utils/data.jsx";
import {initialUtilityFormState} from "../../../utils/initial.jsx";
import {formUtilityValidateRules} from "../../../utils/validationRules.jsx";

const UtilityForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa tiện ích" : "Thêm mới tiện ích", true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formState, setFormState] = useState(initialUtilityFormState)
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageDefault, setImageDefault] = useState(image_add)
    const [errTitle, setErrTitle] = useState("")
    const [errStatus, setErrStatus] = useState("")
    const [fileError, setFileError] = useState("");
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetUtilityById({id})).unwrap()
                if (res) {
                    if (res.code === 200) {
                        setFormState(prevState => ({
                            ...prevState,
                            title: res.data.title,
                            description: res.data.description,
                            status: res.data.status ? 1 : 0,
                            imagePath: res.data.imagePath,
                        }))
                        setImageDefault(res.data.imagePath)
                    } else {
                        toast.error(res.message)
                    }
                }
            }
            test()
        }
    }, [id])
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileError("")
    }
    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setErrStatus("")
        setFormState((preState) => ({
            ...preState,
            [name]: +value
        }));
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'title') {
            setErrTitle("")
        }
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formUtilityValidateRules)
        const fileError = validateFile(selectedFile)

        if (fileError && !id) {
            errors.file = fileError
        }
        if (!(Object.keys(errors).length === 0)) {
            setErrTitle(errors.title)
            setErrStatus(errors.status)
            setFileError(errors.file);
            setDisableButton(false)
        } else {
            setErrTitle("")
            setErrStatus("")
            setFileError("");
            const containerName = 'utilities'
            let avatarPath = ""
            if (selectedFile) {
                const fileData = new FormData()
                fileData.append('file', selectedFile)
                const uploadFile = await dispatch(fetchCreateFile({fileData, containerName})).unwrap()
                if (uploadFile && uploadFile.code === 200) {
                    avatarPath = uploadFile.data
                    setImageDefault(avatarPath)
                }
            }
            const data = {
                "title": formState.title,
                "description": formState.description,
                "imagePath": avatarPath,
                "status": formState.status
            }
            if (id) {
                data.id = id
                await dispatch(fetchUpdateUtility({data, navigate, toast}))
            } else {
                await dispatch(fetchCreateUtility({data, navigate, toast}))
            }
        }
    }
    const handleResetForm = () => {
        setImageDefault(image_add)
        setErrStatus("")
        setErrTitle("")
        setFileError("")
        setDisableButton(false)
    }

    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý tiện ích", "coaches/utilities")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa tiện ích" : "Thêm mới tiện ích"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="w-full">
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="text"
                                       name="title"
                                       id="title"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.title}/>
                                <label htmlFor="title"
                                       className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Tiêu đề
                                </label>
                                {
                                    errTitle && errTitle.length > 0 ?
                                        <span
                                            className={`text-dangerColor-default_2 text-sm font-medium`}>
                                            {errTitle}
                                        </span> :
                                        <></>
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <textarea required
                                          autoComplete={`off`}
                                          name="description"
                                          id="description"
                                          placeholder={" "}
                                          value={formState.description}
                                          onChange={handleInputChange}
                                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none h-44"></textarea>
                                <label htmlFor="description"
                                       className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Mô tả <span className={`text-lightColor`}>(Optional)</span>
                                </label>
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="status"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Trạng thái
                                </label>
                                <select id="status"
                                        name={"status"}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={formState.status}
                                        onChange={handleSelectChange}>
                                    <option value={2}>-- Chọn --</option>
                                    <option value={0}>Disable</option>
                                    <option value={1}>Active</option>
                                </select>
                                {
                                    errStatus && errStatus.length > 0 ?
                                        <span
                                            className={`text-dangerColor-default_2 text-sm font-medium`}>
                                            {errStatus}
                                        </span> :
                                        <></>
                                }
                            </div>

                        </div>
                        <div className={`col-span-1 h-full w-full`}>
                            <input className={`hidden`}
                                   onChange={handleFileChange}
                                   accept="image/png"
                                   ref={fileInputRef}
                                   type={`file`}/>
                            <div className={`flex items-center justify-center cursor-pointer`}>
                                <img style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    objectFit: "cover"
                                }}
                                     className="aspect-square rounded-md w-1/2 h-1/2 bg-gray-50 shadow-xl shadow-gray-200"
                                     src={selectedFile ? window.URL.createObjectURL(selectedFile) : imageDefault}
                                     alt="Ảnh đại diện"
                                     onClick={() => handleOpenFileInput(fileInputRef)}/>
                            </div>
                            {
                                fileError &&
                                <span
                                    className={`text-dangerColor-default_2 text-sm font-medium flex items-center justify-center mt-6`}>
                                                {fileError}
                                            </span>
                            }
                        </div>
                        <div className={`flex items-center justify-end`}>
                            <button disabled={disableButton} onClick={handleSubmitForm}
                                    type="submit"
                                    className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                {id ? 'Cập nhật' : 'Tạo'}
                            </button>
                            {
                                !id ?
                                    <button onClick={handleResetForm}
                                            type="reset"
                                            className="ml-4 duration-300 bg-gray-100 text-gray-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Reset
                                    </button> :
                                    <></>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UtilityForm;