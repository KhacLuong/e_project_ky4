import React, {useEffect, useRef, useState} from 'react';
import {
    generateString,
    handleOpenFileInput,
    validateFile,
    validateForm, validateSelectNotNull,
    validateSelectStringOption
} from "../../../utils/helper.jsx";
import {message} from "../../../utils/message.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {initialScheduleFormState} from "../../../utils/initial.jsx";
import {fetchGetAllLocation, fetchGetScheduleById, fetchSaveSchedule} from "../../../redux/slices/scheduleSlice.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";
import image_add from "../../../assets/image/image_add.png";
import {fetchCreateFile} from "../../../redux/slices/fileSlice.jsx";
import {toast} from "react-toastify";

const formScheduleValidationRules = [
    {
        fieldName: "departure",
        validationFn: validateSelectNotNull,
        errorMessage: message.error.location.isEmpty
    },
    {
        fieldName: "destination",
        validationFn: validateSelectNotNull,
        errorMessage: message.error.location.isEmpty
    },
    {
        fieldName: "status",
        validationFn: validateSelectStringOption,
        errorMessage: message.error.status.isEmpty
    },
]

const ScheduleForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa lộ trình" : "Thêm mới lộ trình", true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [disableButton, setDisableButton] = useState(false)
    const [formState, setFormState] = useState(initialScheduleFormState)
    const [locations, setLocations] = useState([])
    const [imageDefault, setImageDefault] = useState(image_add)
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [errStatus, setErrStatus] = useState("")
    const [errDeparture, setErrDeparture] = useState("")
    const [errDestination, setErrDestination] = useState("")
    const status = useSelector((state) => state.schedule.status)

    useEffect(() => {
        if (status === 'succeeded' || status === 'failed' || status === 'idle') {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [status])

    useEffect(() => {
        const test = async () => {
            await handleGetListLocation()
        }
        test()
    }, [])
    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetScheduleById({id})).unwrap()
                if (res && res.code === 200) {
                    setFormState(prevState => ({
                        ...prevState,
                        id: res.data?.id,
                        departure: res?.data?.departureId,
                        destination: res?.data?.destinationId,
                        imagePath: res?.data?.imagePath,
                        status: res?.data?.status,
                        isPopular: res?.data?.popular
                    }))
                    setImageDefault(res?.data?.imagePath ? res?.data?.imagePath : image_add)
                }
            }
            test()
        }
    }, [id])
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const handleGetListLocation = async () => {
        const res = await dispatch(fetchGetAllLocation({})).unwrap()
        if (res && res.code === 200) {
            setLocations(res.data)
        } else {
            setLocations([])
        }
    }
    const handleSelectChange = (event) => {
        const {name, value} = event.target
        if (name === 'departure') {
            setErrDeparture("")
        } else if (name === 'destination') {
            setErrDestination("")
        } else if (name === 'status') {
            setErrStatus("")
        }
        setFormState((preState) => ({
            ...preState,
            [name]: value
        }));
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const errors = validateForm(formState, formScheduleValidationRules);

        if (!(Object.keys(errors).length === 0)) {
            setErrDeparture(errors.departure)
            setErrDestination(errors.destination)
            setErrStatus(errors.status)
        } else {
            try {
                setErrDeparture("")
                setErrDestination("")
                setErrStatus("")
                const containerName = 'schedules'
                let imagePath = ""
                if (selectedFile) {
                    const fileData = new FormData()
                    fileData.append('file', selectedFile)
                    const uploadFile = await dispatch(fetchCreateFile({fileData, containerName})).unwrap()
                    if (uploadFile && uploadFile.code === 200) {
                        imagePath = uploadFile.data
                        setImageDefault(imagePath)
                    }
                }
                const data = {
                    imagePath: imagePath,
                    departureId: formState.departure,
                    destinationId: formState.destination,
                    status: formState.status,
                    popular: +formState.isPopular === 1,
                    scheduleCode: generateString(6)
                }
                if (id) {
                    data.id = id
                    data.imagePath = selectedFile ? imagePath : imageDefault
                }
                const res = await dispatch(fetchSaveSchedule({data})).unwrap()
                if (res && res.code === 201) {
                    toast.success(res.message)
                    await navigate("/admin/v1/cms/coaches/schedules")
                } else if (res && res.code === 200) {
                    toast.success(res.message)
                    await navigate("/admin/v1/cms/coaches/schedules")
                } else {
                    toast.error(res.message)
                }
            } catch (error) {
                setDisableButton(false)
            }
        }

    };
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý lộ trình", "coaches/schedules")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa lộ trình" : "Thêm mới lộ trình"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <div className={`grid md:grid-cols-2 md:gap-6`}>
                        <div className={`w-full`}>
                            <div className={`group relative grid grid-cols-2 gap-6 z-0 w-full mb-6`}>
                                <div>
                                    <label htmlFor="departure"
                                           className="block mb-2 text-sm font-medium text-gray-900">
                                        Lựa chọn điểm xuất phát
                                    </label>
                                    <select id="departure"
                                            name={"departure"}
                                            onChange={handleSelectChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={formState.departure}>
                                        <option value={0}>-- Chọn --</option>
                                        {
                                            locations.length > 0 && locations.map((item, index) => {
                                                if (item.locationParent === null) {
                                                    return (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                    {
                                        errDeparture && errDeparture.length > 0
                                            ? <span
                                                className={`text-dangerColor-default_2 text-sm`}>{errDeparture}</span>
                                            : null
                                    }
                                </div>
                                <div>
                                    <label htmlFor="destination"
                                           className="block mb-2 text-sm font-medium text-gray-900">
                                        Lựa chọn điểm kết thúc
                                    </label>
                                    <select id="destination"
                                            name={"destination"}
                                            onChange={handleSelectChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={formState.destination}>
                                        <option value={0}>-- Chọn --</option>
                                        {
                                            locations.length > 0 && locations.map((item, index) => {
                                                if (item.locationParent === null) {
                                                    return (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                    {
                                        errDestination && errDestination.length > 0
                                            ? <span
                                                className={`text-dangerColor-default_2 text-sm`}>{errDestination}</span>
                                            : null
                                    }
                                </div>
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="status"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Lựa chọn trạng thái
                                </label>
                                <select id="status"
                                        name={"status"}
                                        onChange={handleSelectChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={formState.status}>
                                    <option value={""}>-- Chọn --</option>
                                    <option value={"disable"}>Disable</option>
                                    <option value={"active"}>Active</option>
                                </select>
                                {
                                    errStatus && errStatus.length > 0
                                        ? <span
                                            className={`text-dangerColor-default_2 text-sm`}>{errStatus}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="isPopular"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Lộ trình phổ biến?
                                </label>
                                <select id="isPopular"
                                        name={"isPopular"}
                                        onChange={handleSelectChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={+formState.isPopular}>
                                    <option value={0}>Disable</option>
                                    <option value={1}>Active</option>
                                </select>
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
                        </div>
                        <div className={`flex items-center justify-end w-full`}>
                            <button disabled={disableButton}
                                    onClick={handleSubmitForm}
                                    type="submit"
                                    className=" duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                {id ? 'Cập nhật' : 'Tạo'}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default ScheduleForm;