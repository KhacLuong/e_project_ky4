import React, {useContext, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {FaRegUserCircle} from "react-icons/fa";
import {HiOutlineTicket} from "react-icons/hi";
import {MdOutlineRateReview} from "react-icons/md";
import moment from 'moment';
import 'moment/dist/locale/vi.js';
import MyInfo from "./MyInfo.jsx";
import MyTicket from "./MyTicket.jsx";
import MyReview from "./MyReview.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../../context/ContextProvider.jsx";

moment.locale('vi');

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    const {slug} = useParams()
    const name = location?.state?.name
    useDocumentTitle(`Thông tin tài khoản`, true)

    const {userId, isAuthenticated} = useContext(Context);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])
    const dataBreadcrumb = () => {
        return [
            {
                name: "Trang chủ",
                path: "/"
            },
            {
                name: name,
                path: "/"
            }
        ]
    }
    const handleGoToProfilePage = (state) => {
        navigate(`/v1/tai-khoan/${state.url}`,
            {
                state: {
                    name: state.name
                }
            })
    }

    return (
        <section className={`w-full my-24`}>
            <div className={`flex max-w-7xl flex-col items-center mx-auto relative`}>
                <Breadcrumb dataBreadcrumb={dataBreadcrumb()}/>
                <div className={`flex w-full mt-[1.5rem]`}>
                    <div className={`py-4`}>
                        <aside
                               className=" z-40 w-64 transition-transform -translate-x-full sm:translate-x-0">
                            <div className="overflow-y-auto bg-gray-100">
                                <ul className="space-y-2 font-medium">
                                    <li className={`w-full px-4 py-1.5 hover:bg-gray-200 duration-300 cursor-pointer`} onClick={() => handleGoToProfilePage({
                                        url: 'thong-tin',
                                        name: 'Thông tin tài khoản'
                                    })}>
                                        <div className={`${slug === 'thong-tin' ? 'text-primaryColor_hover' : ''} inline-flex items-center p-2 text-gray-900 rounded-lg group`}>
                                            <FaRegUserCircle className={`w-5 h-5 mr-3 text-gray-700`}/> Thông tin tài khoản
                                        </div>
                                    </li>
                                    <li className={`w-full px-4 py-1.5 hover:bg-gray-200 duration-300 cursor-pointer`} onClick={() => handleGoToProfilePage({url: 've-cua-toi', name: 'Vé của tôi'})}>
                                        <div className={`${slug === 've-cua-toi' ? 'text-primaryColor_hover' : ''} inline-flex items-center p-2 text-gray-900 rounded-lg group`}>
                                            <HiOutlineTicket className={`w-5 h-5 mr-3 text-gray-700`}/> Vé của
                                            tôi
                                        </div>
                                    </li>
                                    <li className={`w-full px-4 py-1.5 hover:bg-gray-200 duration-300  cursor-pointer`}
                                        onClick={() => handleGoToProfilePage({url: 'nhan-xet', name: 'Nhận xét chuyến đi'})}>
                                        <div className={`${slug === 'nhan-xet' ? 'text-primaryColor_hover' : ''} inline-flex items-center p-2 text-gray-900 rounded-lg group`}>
                                            <MdOutlineRateReview className={`w-5 h-5 mr-3 text-gray-700`}/> Nhận
                                            xét chuyến đi
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div className={`flex-1 ml-[32px] py-4`}>
                        {
                            slug === 'thong-tin' ?
                                <MyInfo userId={userId} dispatch={dispatch}/> :
                                slug === 've-cua-toi' ?
                                    <MyTicket dispatch={dispatch} userId={userId}/> :
                                    <MyReview/>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;