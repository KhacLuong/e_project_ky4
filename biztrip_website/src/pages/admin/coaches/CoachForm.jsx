import React, {useEffect, useRef, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import image_add from "../../../assets/image/image_add.png";
import {fetchCreateCoach, fetchGetCoachById, fetchUpdateCoach} from "../../../redux/slices/coachSlice.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import {produce} from "immer"
import makeAnimated from 'react-select/animated';
import {initialCoachFormState} from "../../../utils/initial.jsx";
import {
    handleOpenFileInput,
    validateFile,
    validateForm,
} from "../../../utils/helper.jsx";
import {toast} from "react-toastify";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import CoachSchedule from "../../../components/admin/CoachSchedule.jsx";
import CoachThumbnail from "../../../components/admin/CoachThumbnail.jsx";
import CoachSeat from "../../../components/admin/CoachSeat.jsx";
import {formCoachValidationRules} from "../../../utils/validationRules.jsx";
import {fetchAllUtility} from "../../../redux/slices/utilitySlice.jsx";
import {fetchCreateFile} from "../../../redux/slices/fileSlice.jsx";
import {fetchSaveDistance, fetchSaveDropOffPoint, fetchSavePickUpPoint} from "../../../redux/slices/distanceSlice.jsx";


const CoachForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa thông tin xe" : "Thêm mới xe", true)
    const animatedComponents = makeAnimated()
    const {NoOptionsMessage} = components
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [imageDefault, setImageDefault] = useState(image_add)
    const [disableButton, setDisableButton] = useState(false)
    const [utilities, setUtilities] = useState([])
    const [distances, setDistances] = useState([])
    const [selectOption, setSelectOption] = useState([])
    const [formState, setFormState] = useState(initialCoachFormState)

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState("");
    const fileInputRef = useRef(null);
    const [errName, setErrName] = useState("")
    const [errPlateNumber, setErrPlateNumber] = useState("")
    const [errStatus, setErrStatus] = useState("")

    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetCoachById({id})).unwrap()
                if (res) {
                    if (res.code === 200) {
                        const nextOption = produce([], draft => {
                            res.data.utilities.map(item => {
                                if (item.status) {
                                    draft.push({
                                        value: item.id,
                                        label: item.title
                                    })
                                }
                            })
                        })
                        const nextSeat = produce([], draft => {
                            res.data.seats.map(item => {
                                draft.push({
                                    id: item?.id,
                                    type: item?.type,
                                    seatCode: item?.seatCode,
                                    position: item?.position,
                                    priceTicketId: item?.priceTicketId ? item?.priceTicketId?.id : 0,
                                    price: item?.priceTicketId ? item?.priceTicketId?.fare : 0,
                                })
                            })
                        })
                        setFormState(prevState => ({
                            ...prevState,
                            id: res.data.id,
                            name: res.data.name,
                            plateNumber: res.data.plateNumber,
                            description: res.data.description,
                            avatarPath: res.data.imagePath,
                            status: res.data.status,
                            totalSeats: res.data.totalSeats,
                            priceFrom: res.data.priceFrom,
                            utilities: res.data.utilities,
                            seats: nextSeat,
                            thumbnails: res.data.thumbnails
                        }))
                        setSelectOption(nextOption)
                        setImageDefault(res.data.imagePath)
                    } else {
                        toast.error(res.message)
                    }
                }
            }
            test()
        }
    }, [id])
    useEffect(() => {
        const test = async () => {
            await handleGetAllUtility()
        }
        test()
    }, [])
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileError("")
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSelectChange = (selectedOption) => {
        setFormState((preState) => ({
            ...preState,
            status: selectedOption.target.value,
        }));
    }
    const handleGetAllUtility = async () => {
        const pageNumber = 1
        const perPage = 100
        const sortField = ""
        const sortDir = ""
        const keyword = ""
        const res = await dispatch(fetchAllUtility({pageNumber, perPage, sortField, sortDir, keyword})).unwrap()
        if (res && res.code === 200) {
            const nextState = produce([], draft => {
                res.data.map((item) => {
                    if (item.status === true) {
                        draft.push({
                            value: item.id,
                            label: item.title
                        })
                    }
                })
            })
            setUtilities(nextState)
        }
    }
    const CustomNoOptionsMessage = (props) => {
        return (
            <NoOptionsMessage {...props}>
                Không có dữ liệu
            </NoOptionsMessage>
        );
    };
    const filter = (inputValue) => {
        return utilities.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filter(inputValue));
        }, 1000);
    };
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        // setDisableButton(true)
        console.log(formState)
        const errors = validateForm(formState, formCoachValidationRules);
        const fileError = validateFile(selectedFile)
        if (fileError && !id) {
            errors.file = fileError
        }
        if (!(Object.keys(errors).length === 0)) {
            setDisableButton(false)
            setErrPlateNumber(errors.plateNumber)
            setErrName(errors.name)
            setErrStatus(errors.status)
            setFileError(errors.file)
        } else {
            try {
                setErrPlateNumber("")
                setErrName("")
                setFileError("")
                setErrStatus("")
                const containerName = 'coaches'
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

                const thumbnails = await Promise.all(
                    formState.thumbnails.map(async item => {
                        if (item.file) {
                            const fileData = new FormData()
                            fileData.append('file', item.file)
                            const uploadFile = await dispatch(fetchCreateFile({
                                fileData,
                                containerName: "thumbnails"
                            })).unwrap()
                            if (uploadFile && uploadFile.code === 200) {
                                return {
                                    id: 0,
                                    title: item.description,
                                    imagePath: uploadFile.data
                                }
                            }
                        } else {
                            return {
                                id: item.id,
                                title: item.description,
                                imagePath: item.img
                            }
                        }
                    })
                )
                console.log(formState?.seats)
                const data = {
                    name: formState?.name,
                    imagePath: imagePath,
                    plateNumber: formState?.plateNumber,
                    totalSeats: formState?.totalSeats,
                    status: formState?.status,
                    description: formState?.description,
                    priceFrom: formState?.priceFrom,
                    utilities: selectOption && selectOption.length > 0 ? selectOption.map(item => ({
                        id: item.value,
                        title: item.label
                    })) : formState.utilities,
                    seats: formState?.seats,
                    thumbnails: thumbnails.filter(Boolean)
                }
                if (id) {
                    data.id = id
                    data.imagePath = selectedFile ? imagePath : imageDefault
                    await dispatch(fetchUpdateCoach({data, navigate, toast, setDisableButton})).unwrap()
                } else {
                    const responseCoach = await dispatch(fetchCreateCoach({data})).unwrap()
                    if (responseCoach && responseCoach.code === 201) {
                        navigate("/admin/v1/cms/coaches/list")
                        const coachId = responseCoach.data.id
                        formState.distance.length > 0 && formState.distance.map(async (item) => {
                            const distanceData = {
                                id: item?.distanceId,
                                scheduleId: item?.scheduleId,
                                typeLoop: item?.type,
                                timeDifference: item?.timeDifference,
                                day: item?.daysBetween
                            }
                            const responseDistance = await dispatch(fetchSaveDistance({coachId, data: distanceData})).unwrap()
                            const listPickUpPoint = []
                            const listDropOffPoint = []
                            if (responseDistance && responseDistance.code === 201) {
                                const distanceId = responseDistance.data.id
                                item.departure.length > 0 && item.departure.map((pickUp) => {
                                    listPickUpPoint.push({
                                        locationId: pickUp?.locationId,
                                        time: pickUp?.time,
                                        day: pickUp?.day,
                                        status: pickUp?.status
                                    })
                                })
                                item.destination.length > 0 && item.destination.map((pickUp) => {
                                    listDropOffPoint.push({
                                        locationId: pickUp?.locationId,
                                        time: pickUp?.time,
                                        day: pickUp?.day,
                                        status: pickUp?.status
                                    })
                                })
                                if (listPickUpPoint.length > 0 && listDropOffPoint.length > 0) {
                                    await dispatch(fetchSavePickUpPoint({distanceId, data: listPickUpPoint})).unwrap()
                                    await dispatch(fetchSaveDropOffPoint({distanceId, data: listDropOffPoint})).unwrap()
                                }
                            }
                        })
                    }
                }
                setSelectOption(null)
            } catch (error) {
                setDisableButton(false)
            }
        }
    }

    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý xe", "coaches/list")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa thông tin xe" : "Thêm mới xe"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <Tabs id={""} children={""} value="tab-1" className={`overflow-visible`}>
                        <TabsHeader className="w-1/2 rounded-none border-b border-blue-gray-50 bg-transparent mb-6 py-4"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-primaryColor shadow-none mt-4 rounded-none",
                                    }}>
                            {
                                dataTab.map(({label, value}) => (
                                    <Tab key={value} value={value}
                                         className={`before:content[''] before:inline-block before:absolute before:w-0 before:bg-primaryColor before:h-[2px] before:bottom-[-16px] hover:before:w-full hover:before:duration-300 `}>
                                        {label}
                                    </Tab>
                                ))}
                        </TabsHeader>
                        <TabsBody className={`overflow-visible`} animate={{
                            initial: {y: 250},
                            mount: {y: 0},
                            unmount: {y: 250},
                        }}>
                            <TabPanel value={`tab-1`} className={``}>
                                <div className={`grid md:grid-cols-2 mb:gap-6`}>
                                    <div className={`w-full`}>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <input type={"text"}
                                                   name={"name"}
                                                   id={`name`}
                                                   value={formState.name}
                                                   onChange={handleInputChange}
                                                   className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"}
                                                   placeholder={" "}
                                                   autoComplete={`off`}
                                                   required/>
                                            <label htmlFor="name"
                                                   className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Tên
                                            </label>
                                            {
                                                errName && errName.length > 0
                                                    ? <span
                                                        className={`text-dangerColor-default_2 text-sm`}>{errName}</span>
                                                    : null
                                            }
                                        </div>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <input type={"text"}
                                                   name={"plateNumber"}
                                                   value={formState.plateNumber}
                                                   onChange={handleInputChange}
                                                   className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"}
                                                   placeholder={" "}
                                                   autoComplete={`off`}
                                                   required/>
                                            <label htmlFor="plateNumber"
                                                   className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Biển số xe
                                            </label>
                                            {
                                                errPlateNumber && errPlateNumber.length > 0
                                                    ? <span
                                                        className={`text-dangerColor-default_2 text-sm`}>{errPlateNumber}</span>
                                                    : null
                                            }
                                        </div>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                        <textarea name="description"
                                                  id="description"
                                                  placeholder={" "}
                                                  onChange={handleInputChange}
                                                  value={formState.description}
                                                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none h-44"></textarea>
                                            <label htmlFor="description"
                                                   className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Mô tả <span className={`text-lightColor`}>(Optional)</span>
                                            </label>
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
                                                <option value={"disable"}>Vô hiệu hóa</option>
                                                <option value={"active"}>Đang hoạt động</option>
                                                <option value={"maintenance"}>Bảo trì</option>
                                            </select>
                                            {
                                                errStatus && errStatus.length > 0
                                                    ? <span
                                                        className={`text-dangerColor-default_2 text-sm`}>{errStatus}</span>
                                                    : null
                                            }
                                        </div>
                                        <div className={`group relative z-50 w-full mb-6`}>
                                            <label htmlFor="stauts"
                                                   className="block mb-2 text-sm font-medium text-gray-900">
                                                Lựa chọn tiện ích <span
                                                className={`text-lightColor`}>(Optional)</span>
                                            </label>
                                            <AsyncSelect
                                                isClearable
                                                isSearchable
                                                isMulti
                                                value={selectOption}
                                                onChange={setSelectOption}
                                                cacheOptions
                                                defaultOptions={utilities}
                                                loadOptions={loadOptions}
                                                placeholder={"-- Chọn --"}
                                                className={`react-select-custom bg-gray-50 text-gray-900 text-sm block w-full`}
                                                components={{
                                                    ...animatedComponents,
                                                    NoOptionsMessage: CustomNoOptionsMessage
                                                }}
                                            />
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
                                    <div className={`flex items-center justify-end w-full`}>
                                        <button disabled={disableButton}
                                                onClick={handleSubmitForm}
                                                type="submit"
                                                className=" duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                            {id ? 'Cập nhật' : 'Tạo'}
                                        </button>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={`tab-2`}>
                                <CoachSeat formState={formState} setFormState={setFormState}/>
                            </TabPanel>
                            <TabPanel value={`tab-3`}>
                                <CoachSchedule coachFormState={formState} setCoachFormState={setFormState}/>
                            </TabPanel>
                            <TabPanel value={`tab-4`}>
                                <CoachThumbnail formState={formState} setFormState={setFormState} dispatch={dispatch}/>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </form>
            </div>
        </>
    );
};
const dataTab = [
    {
        label: "Thông tin cơ bản",
        value: "tab-1",
    },
    {
        label: "Sơ đồ xe",
        value: "tab-2",
    },
    {
        label: "Lộ trình",
        value: "tab-3",
    },
    {
        label: "Ảnh thu nhỏ",
        value: "tab-4",
    },
]
export default CoachForm;