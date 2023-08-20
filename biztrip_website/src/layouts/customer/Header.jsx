import React, {useContext, useEffect, useRef, useState} from 'react';
import {RiMenu3Fill} from "react-icons/ri";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../context/ContextProvider.jsx";
import {FaUser} from "react-icons/fa6";
import {MdOutlineRateReview, MdPhone} from "react-icons/md";
import {IoMdArrowDropdown} from "react-icons/io";
import {FaRegUserCircle} from "react-icons/fa";
import {HiOutlineTicket} from "react-icons/hi";
import {GrPowerShutdown} from "react-icons/gr";
import {dataNavbarCustomer} from "../../utils/data.jsx";
import {fetchLogout} from "../../redux/slices/authSlice.jsx";
import {toast} from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Header = () => {
    const {isAuthenticated} = useContext(Context);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let ref = useRef();
    const [showNavUser, setShowNavUser] = useState(false)
    const [showHotline, setShowHotline] = useState(false)
    const {setOpenLoginModal, openLoginModal, openBookingNewTicketModal, openModalCoach} = useContext(Context);
    const MySwal = withReactContent(Swal)
    useEffect(() => {
        const handler = (e) => {
            if (showNavUser && ref.current && !ref.current.contains(e.target)) {
                setShowNavUser(false)
            }
        }
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        }
    }, [showNavUser])

    const handleGoToProfilePage = async (state) => {
        navigate(`/v1/tai-khoan/${state.url}`,
            {
                state: {
                    name: state.name
                }
            })
    }
    const handleLogin = () => {
        setOpenLoginModal(true)
    }
    const handleLogout = () => {
        MySwal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#057a55',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tiếp tục!',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await dispatch(fetchLogout()).unwrap()
                navigate("")
                toast.success(res.message)
            }
        })
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 w-full z-30 border-b-2 ${openBookingNewTicketModal || openLoginModal || openModalCoach ? 'pr-[0.4rem]' : ''}`}>
            <div className={`flex mx-auto relative`}>
                <div className={`md:w-full relative`}>
                    <nav className="bg-white">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
                            <Link to={`/v1`}
                                  className="col-span-1 flex rounded-l-xl items-center bg-white h-full">
                                <img src={`https://eprojectsem4.blob.core.windows.net/web/logo-vexere.jpg`} alt={`logo`} className={`w-36`}/>

                            </Link>
                            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                                 id="navbar-cta">
                                <ul className="text-base text-gray-700 flex items-center justify-center font-semibold w-full rounded-lg md:space-x-8">
                                    {
                                        dataNavbarCustomer.map(item => {
                                            return (
                                                <li key={item.name}>
                                                    <NavLink to={item.url}
                                                             className={({isActive}) => `${isActive ? 'text-primaryColor' : 'text-black'} block py-2 pl-3 pr-4 md:p-0`}>
                                                        {item.name}
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="flex md:order-2 items-center">
                                <button onClick={() => setShowHotline(!showHotline)}
                                        className={`cursor-pointer hover:bg-gray-200 duration-300 flex items-center border-[1px] px-[16px] py-[8px] rounded-md font-medium mr-[20px] text-[14px] relative`}>
                                    <MdPhone className={`w-4 h-4 mr-2`}/>Hotline
                                    <div
                                        className={`${showNavUser ? 'inline-block' : 'hidden'} mt-1 w-fit rounded-md border-[1px] absolute right-0 top-full bg-white shadow`}>

                                    </div>
                                </button>
                                {
                                    !isAuthenticated ?
                                        <button onClick={handleLogin}
                                                className="text-white duration-300 font-semibold bg-primaryColor hover:bg-primaryColor_hover rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0">
                                            Đăng nhập
                                        </button> :
                                        <div ref={ref}
                                             className="relative cursor-pointer text-darkColor bg-whiteColor hover:bg-bgWhiteColor hover:text-blackColor outline-0 border-0 font-medium rounded-md text-lg text-center inline-flex items-center mr-1 duration-300">
                                            <button onClick={() => setShowNavUser(!showNavUser)}
                                                    className={`flex items-center relative`}>
                                                <div
                                                    className={`w-9 h-9 rounded-full bg-primaryColor_hover flex items-center justify-center`}>
                                                    <FaUser className={`text-white w-4 h-4`}/>
                                                </div>
                                                <IoMdArrowDropdown className={`ml-0.5 relative`}/>
                                                <div
                                                    className={`${showNavUser ? 'inline-block' : 'hidden'} mt-1 w-fit rounded-md border-[1px] absolute right-0 top-full bg-white shadow`}>
                                                    <ul className="text-sm text-gray-700 w-full">
                                                        <li className={`w-full mb-3`}>
                                                            <div onClick={() => handleGoToProfilePage({
                                                                url: 'thong-tin',
                                                                name: 'Thông tin tài khoản'
                                                            })}
                                                                 className="cursor-pointer inline-flex items-center py-2 px-3.5 hover:bg-gray-100 w-full whitespace-nowrap font-normal">
                                                                <FaRegUserCircle className={`w-4 h-4 mr-2`}/> Thông
                                                                tin tài khoản
                                                            </div>
                                                        </li>
                                                        <li className={`w-full mb-3`}>
                                                            <div onClick={() => handleGoToProfilePage({
                                                                url: 've-cua-toi',
                                                                name: 'Vé của tôi'
                                                            })}
                                                                 className="cursor-pointer w-full inline-flex items-center py-2 px-3.5 hover:bg-gray-100 whitespace-nowrap font-normal relative">
                                                                <HiOutlineTicket className={`w-4 h-4 mr-2`}/>
                                                                Vé của tôi
                                                            </div>
                                                        </li>
                                                        <li className={`w-full mb-3`}>
                                                            <div onClick={() => handleGoToProfilePage({
                                                                url: 'nhan-xet',
                                                                name: 'Nhận xét chuyến đi'
                                                            })}
                                                                 className="cursor-pointer inline-flex items-center py-2 px-3.5 hover:bg-gray-100 w-full whitespace-nowrap font-normal">
                                                                <MdOutlineRateReview className={`w-4 h-4 mr-2`}/> Nhận
                                                                xét chuyến đi
                                                            </div>
                                                        </li>
                                                        <li className={`w-full`}>
                                                            <div onClick={() => handleLogout()}
                                                                 className="cursor-pointer inline-flex items-center py-2 px-3.5 hover:bg-gray-100 w-full whitespace-nowrap font-normal">
                                                                <GrPowerShutdown className={`w-4 h-4 mr-2`}/> Đăng
                                                                xuất
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;