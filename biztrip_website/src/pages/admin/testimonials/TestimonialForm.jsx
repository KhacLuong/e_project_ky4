import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch} from "react-redux";
import {initialTestimonialFormState} from "../../../utils/initial.jsx";
import {fetchGetTestimonialById, fetchSaveTestimonial} from "../../../redux/slices/testimonialSlice.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";
import TipTap from "../../../components/TipTap.jsx";
import image_add from "../../../assets/image/image_add.png";
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {handleOpenFileInput, validateFile, validateForm, validateLengthOfString} from "../../../utils/helper.jsx";
import {formTestimonialValidateRules} from "../../../utils/validationRules.jsx";
import {toast} from "react-toastify";
import {fetchCreateFile} from "../../../redux/slices/fileSlice.jsx";

const TestimonialForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa nhận xét" : "Thêm mới nhận xét", true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [disableButton, setDisableButton] = useState(false)
    const [formState, setFormState] = useState(initialTestimonialFormState)
    const [selectedFile, setSelectedFile] = useState(null);
    const [createdAt, setCreatedAt] = useState("")
    const fileInputRef = useRef(null);
    const [errFullName, setErrFullName] = useState("")
    const [errJob, setErrJob] = useState("")
    const [errContent, setErrContent] = useState("")
    const [fileError, setFileError] = useState("");
    const [imageDefault, setImageDefault] = useState(image_add)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),],
        content: ''
    })
    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetTestimonialById({id})).unwrap()
                if (res) {
                    if (res.code === 200) {
                        setFormState((prevState) => ({
                            ...prevState,
                            fullName: res.data.fullName,
                            job: res.data.job,
                            isHot: res.data.hot ? 1 : 0,
                            status: res.data.status ? 1 : 0,
                            contentJson: res.data.content,
                            avatarPath: res.data.avatarPath
                        }))
                        setCreatedAt(res.data.createdAt)
                        setImageDefault(res.data.avatarPath)
                    } else {
                        toast.error(res.message)
                    }
                }
            }
            test()
        }
    }, [id])
    useEffect(() => {
        if (formState.contentJson) {
            editor.commands.setContent(JSON.parse(formState.contentJson))
        }
    }, [formState.contentJson])
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileError("")
    };

    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setFormState((preState) => ({
            ...preState,
            [name]: +value
        }));
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'job') {
            setErrJob("")
        } else if (name === 'fullName') {
            setErrFullName("")
        }
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formTestimonialValidateRules)
        const fileError = validateFile(selectedFile)
        const contentError = validateLengthOfString(editor.getText(), 10, 500)
        if (contentError) {
            errors.content = contentError
        }
        if (fileError && !id) {
            errors.file = fileError
        }
        if (!(Object.keys(errors).length === 0)) {
            setErrFullName(errors.fullName)
            setErrJob(errors.job)
            setFileError(errors.file);
            setErrContent(errors.content)
            setDisableButton(false)
        } else {
            setErrFullName("")
            setErrJob("")
            setErrContent("")
            setFileError("");
            const containerName = 'testimonials'
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
            const jsonContent = editor.getJSON();
            const data = {
                'avatarPath': avatarPath,
                'fullName': formState.fullName,
                'job': formState.job,
                'hot': formState.isHot !== 2 ? formState.isHot : false,
                'status': formState.status !== 2 ? formState.status : false,
                'content': JSON.stringify(jsonContent)
            }
            if (id) {
                data.id = id
                data.createdAt = createdAt
                data.avatarPath = selectedFile ? avatarPath : imageDefault
            }
            await dispatch(fetchSaveTestimonial({data, navigate, toast}))
            setFormState(initialTestimonialFormState)
            setSelectedFile(null)
            setFileError("")
        }
    }

    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý nhận xét", "users/testimonials")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa lời nhận xét" : "Thêm mới nhận xét"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <div className={`grid md:grid-cols-2 md:gap-6`}>
                    <div className={`w-full`}>
                        <div className={`group relative z-0 w-full mb-6`}>
                            <input type={"text"}
                                   name={"fullName"}
                                   id={"fullName"}
                                   value={formState.fullName}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" "
                                   autoComplete={`off`}
                                   onChange={handleInputChange}
                                   required/>
                            <label htmlFor="fullName"
                                   className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Họ và tên
                            </label>
                            {
                                errFullName && errFullName.length > 0
                                    ? <span className={`text-dangerColor-default_2 text-sm`}>{errFullName}</span>
                                    : null
                            }
                        </div>
                        <div className={`group relative z-0 w-full mb-6`}>
                            <input type={"text"}
                                   id={"job"}
                                   name={"job"}
                                   value={formState.job}
                                   onChange={handleInputChange}
                                   className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"}
                                   placeholder={" "}
                                   autoComplete={`off`}
                                   required/>
                            <label htmlFor="job"
                                   className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Công việc
                            </label>
                            {
                                errJob && errJob.length > 0
                                    ? <span className={`text-dangerColor-default_2 text-sm`}>{errJob}</span>
                                    : null
                            }
                        </div>
                        <div className={`group relative z-0 w-full mb-6`}>
                            <label className={`text-sm text-gray-900`}>
                                Lời nhận xét
                            </label>
                            <TipTap editor={editor}/>
                            {
                                errContent && errContent.length > 0
                                    ? <span className={`text-dangerColor-default_2 text-sm`}>{errContent}</span>
                                    : null
                            }
                        </div>
                        <div className={`group relative z-0 w-full mb-6 grid grid-cols-2 gap-8`}>
                            <div>
                                <label htmlFor="status"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Trạng thái <span className={`text-lightColor`}>(Optional)</span>
                                </label>
                                <select id="status"
                                        name={`status`}
                                        onChange={handleSelectChange}
                                        value={formState.status}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value={2}>-- Chọn --</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>Disable</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="isHot"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Ưu tiên <span className={`text-lightColor`}>(Optional)</span>
                                </label>
                                <select id="isHot"
                                        name={`isHot`}
                                        onChange={handleSelectChange}
                                        value={formState.isHot}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value={2}>-- Chọn --</option>
                                    <option value={1}>Có</option>
                                    <option value={0}>Không</option>
                                </select>
                            </div>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonialForm;