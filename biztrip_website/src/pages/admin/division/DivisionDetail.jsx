import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllDivisionByScheduleAndDate, selectDivision} from "../../../redux/slices/divisionSlice.jsx";
import moment from "moment";
import Banner from "../../../components/admin/Banner.jsx";
import {listBreadcrumb} from "../../../utils/data.jsx";
import {produce} from "immer";
import SyncLoader from "react-spinners/SyncLoader";
import {BiSelectMultiple} from "react-icons/bi";

const DivisionDetail = () => {
    const theadData = [
        '#',
        {field: 'imagePath', name: "Ảnh"},
        {field: 'coach', name: "Xe"},
        {field: 'plateNumber', name: "Biển số"},
        {field: 'date', name: "Ngày đi"},
        {field: 'startTime', name: "Giờ xuất phát"},
        {field: 'endTime', name: "Giớ đến"},
        {field: 'employee', name: "Tài xế"},
        {field: 'note', name: "Ghi chú"},
        {field: 'status', name: 'Trạng thái'},
        'Action'
    ]
    let firstItemPerPage = 1
    const scheduleId = useLocation().state.scheduleId
    const date = useLocation().state.date
    const scheduleDeparture = useLocation().state.scheduleDeparture
    const scheduleDestination = useLocation().state.scheduleDestination
    const dispatch = useDispatch()
    const divisions = useSelector(selectDivision)
    const [status, setStatus] = useState("")
    const [tbodyData, setTbodyData] = useState([])
    useEffect(() => {
        dispatch(fetchAllDivisionByScheduleAndDate({scheduleId, date: moment(date).format("YYYY-MM-DD"), status, pageNumber: 1, perPage: 100}))
    }, [])
    useEffect(() => {
        if (divisions && divisions.length > 0) {
            console.log(divisions)
            const nextState = produce([], draft => {
                divisions.map(item => {
                    draft.push({
                        id: item?.id,
                        items: [
                            {
                                imagePath: item?.distance?.coach?.imagePath || "",
                                imageName: item?.distance?.coach?.imagePath || ""
                            },
                            item?.distance?.coach?.name,
                            item?.distance?.coach?.plateNumber,
                            moment(item?.date).format("DD/MM/YYYY"),
                            item?.distance?.startTime,
                            item?.distance?.endTime,
                            item?.employee || "",
                            item?.note,
                            item?.status
                        ]
                    })
                })
            })
            setTbodyData(nextState)
        }
    }, [divisions])
    const handleOpenDivisionModal = () => {

    }
    return (
        <>
            <Banner dataBreadcrumb={listBreadcrumb("Quản lý phân công")}
                    title={`Chi tiết phân công từ ${scheduleDeparture} đi ${scheduleDestination}`}/>
            {/*<div data-aos="fade-right"*/}
            {/*     data-aos-delay="300"*/}
            {/*     className={`block z-50 relative items-center py-4 px-2 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:py-5 lg:px-2.5 sm:flex`}>*/}
            {/*    <div className={`relative`}>*/}
            {/*        */}
            {/*    </div>*/}
            {/*</div>*/}
            <div data-aos="fade-right"
                 data-aos-delay="500" className={`relative z-0`}>
                <div className={`flex flex-col my-6 mx-4 rounded-2xl shadow-lg shadow-gray-200`}>
                    <div className={`overflow-x-auto rounded-2xl`}>
                        <div className={`inline-block min-w-full align-middle`}>
                            <div className={`overflow-hidden shadow-lg`}>
                                <table className={`w-full text-sm text-left text-gray-500`}>
                                    <thead
                                        className={`text-xs text-gray-700 capitalize bg-gray-50`}>
                                        <tr>
                                            {
                                                theadData.map((item, index) => {
                                                    if (typeof item === "object") {
                                                        return (
                                                            <th key={`th-${index}`} scope={`col`} className={`px-4 py-2`}
                                                                title={item.field}>
                                                                <div className={`flex items-center`}>
                                                                    {item.name}
                                                                </div>
                                                            </th>
                                                        )
                                                    }
                                                    return (
                                                        <th key={`th-${index}`} scope={`col`} className={`px-4 py-2`}
                                                            title={item}>
                                                            <div className={`flex items-center`}>
                                                                {item}
                                                            </div>
                                                        </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        status === "loading" ?
                                            <tr className={`w-full relative`}>
                                                <td colSpan={theadData.length}
                                                    className={`text-center align-middle w-full  py-8`}>
                                                    <SyncLoader loading={true} color="#374151"
                                                                className={`absolute left-1/2 -translate-y-1/2`}/>
                                                </td>
                                            </tr> :
                                            tbodyData && tbodyData.length > 0 && (
                                                tbodyData.map((data, index) => {
                                                    return (
                                                        <tr key={`tr-${index}`}
                                                            className={`bg-white border-b hover:bg-gray-50 text-gray-600 font-normal`}>
                                                            <td className="px-4 py-2">{firstItemPerPage++}</td>
                                                            {
                                                                data && data.items &&
                                                                data.items.map((item, index) => {
                                                                    if (typeof item === "string") {
                                                                        return (
                                                                            <td key={`td-${index}`}
                                                                                className={`px-4 py-2`}>{item}</td>
                                                                        )
                                                                    }
                                                                    return <td key={`td-${index}`}
                                                                               className={`px-4 py-2 w-24`}>
                                                                        <img src={item?.imagePath} alt={item?.imageName}
                                                                             className={`aspect-square object-cover`}/>
                                                                    </td>
                                                                })
                                                            }
                                                            <td className="px-4 py-2">
                                                                <div className={`flex items-center`}>
                                                                    <div
                                                                        className={`inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded bg-primaryColor hover:bg-primaryColor_hover mr-3`}>
                                                                        <button onClick={handleOpenDivisionModal} className={``}>
                                                                            Phân công
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )

                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DivisionDetail;