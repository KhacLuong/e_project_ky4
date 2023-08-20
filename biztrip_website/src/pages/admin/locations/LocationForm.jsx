import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {initialLocationFormState} from "../../../utils/initial.jsx";
import {fetchGetLocationById, fetchSaveLocation} from "../../../redux/slices/locationSlice.jsx";
import {toast} from "react-toastify";
import {fetchGetAllLocation} from "../../../redux/slices/scheduleSlice.jsx";
import {validateForm} from "../../../utils/helper.jsx";
import {formLocationValidateRules} from "../../../utils/validationRules.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";
import {message} from "../../../utils/message.jsx";

const LocationForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa địa điểm" : "Thêm mới địa điểm", true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [disableButton, setDisableButton] = useState(false)
    const [formState, setFormState] = useState(initialLocationFormState)
    const [errName, setErrName] = useState("")
    const [errStatus, setErrStatus] = useState("")

    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetLocationById({id})).unwrap()
                if (res) {
                    if (res.code === 200) {
                        setFormState(prevState => ({
                            ...prevState,
                            name: res.data.name,
                            status: res.data.status ? 1 : 0,
                            parentId: res.data.parentId
                        }))
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
            await handleGetListLocation()
        }
        test()
    }, [])

    const handleGetListLocation = async () => {
        const sortField = ''
        const sortDir = ''
        const keyword = ''
        const res = await dispatch(fetchGetAllLocation({sortField, sortDir, keyword})).unwrap()
        if (res && res.code === 200) {
            setFormState(prevState => ({
                ...prevState,
                locations: convertArrayToRecursive(res.data),
            }))
        }
    }
    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setFormState((preState) => ({
            ...preState,
            [name]: +value
        }));
        setErrStatus("")
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'name') {
            setErrName("")
        }
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmitForm = async e => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formLocationValidateRules)
        if (formState.status === 2) {
            errors.status = message.error.status.isEmpty
        }
        if(!(Object.keys(errors).length === 0)) {
            setErrName(errors.name)
            setErrStatus(errors.status)
            setDisableButton(false)
        } else {
            setErrName("")
            setErrStatus("")
            const data = {
                'name': formState.name,
                'status': formState.status,
                'parentId': formState.parentId,
                'address': formState.address
            }
            if (id) {
                data.id = id
            }
            await dispatch(fetchSaveLocation({data, navigate, toast}))
        }
    }
    const convertArrayToRecursive = (arr, parentId = null) => {
        const recursiveArray = [];
        for (const location of arr) {
            if (
                (location?.locationParent && location?.locationParent?.id === parentId) ||
                (parentId === null && location?.locationParent === null)
            ) {
                const recursiveLocation = {
                    ...location,
                    children: convertArrayToRecursive(arr, location.id),
                };
                recursiveArray.push(recursiveLocation);
            }
        }

        return recursiveArray;
    }
    const renderRecursiveData = (locations, indent = "") => {
        const options = [];

        for (const location of locations) {
            options.push(
                <option key={location.id} value={location.id}>
                    {indent + location.name}
                </option>
            );
            // if (location.children) {
            //     options.push(...renderRecursiveData(location.children, indent + "-- "));
            // }
        }
        return options;
    };
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý địa điểm", "coaches/locations")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa địa điểm" : "Thêm mới địa điểm"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <div className={`grid md:grid-cols-2 md:gap-6`}>
                    <div className={`w-full col-span-1`}>
                        <div className={`group relative z-0 w-full mb-6`}>
                            <input type={"text"}
                                   name={"name"}
                                   id={"name"}
                                   value={formState.name}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" "
                                   autoComplete={`off`}
                                   onChange={handleInputChange}
                                   required/>
                            <label htmlFor="name"
                                   className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Tên địa điểm
                            </label>
                            {
                                errName && errName.length > 0
                                    ? <span className={`text-dangerColor-default_2 text-sm`}>{errName}</span>
                                    : null
                            }
                        </div>
                        <div className={`group relative z-0 w-full mb-6`}>
                            <input type={"text"}
                                   name={"address"}
                                   id={"address"}
                                   value={formState.address}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" "
                                   autoComplete={`off`}
                                   onChange={handleInputChange}
                                   required/>
                            <label htmlFor="address"
                                   className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Địa chỉ <span className={`text-lightColor`}>(Optional)</span>
                            </label>
                        </div>
                        <div className={`group relative z-0 w-full mb-6`}>
                            <label htmlFor="parentId"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Địa điểm thuộc <span className={`text-lightColor`}>(Optional)</span>
                            </label>
                            <select id="parentId"
                                    name={`parentId`}
                                    onChange={handleSelectChange}
                                    value={formState.parentId}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value={0}>-- Lựa chọn địa điểm --</option>
                                {renderRecursiveData(formState.locations)}
                            </select>
                        </div>
                        <div className={`group relative z-0 w-full mb-6`}>
                            <label htmlFor="status"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Trạng thái <span className={`text-lightColor`}></span>
                            </label>
                            <select id="status"
                                    name={`status`}
                                    onChange={handleSelectChange}
                                    value={formState.status}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value={1}>Active</option>
                                <option value={0}>Disable</option>
                            </select>
                            {
                                errStatus && errStatus.length > 0
                                    ? <span className={`text-dangerColor-default_2 text-sm`}>{errStatus}</span>
                                    : null
                            }
                        </div>
                    </div>
                    <div className={`w-full col-span-1`}></div>
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

export default LocationForm;