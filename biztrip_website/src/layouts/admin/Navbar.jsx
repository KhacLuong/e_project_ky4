import React, {useContext, useEffect, useRef, useState} from 'react';
import {HiOutlineSearch, HiOutlineEye} from "react-icons/hi";
import {IoNotificationsSharp} from "react-icons/io5";
import {HiOutlineBars3CenterLeft} from "react-icons/hi2";
import {MdOutlineClose} from "react-icons/md";
import {RiSettings3Fill} from "react-icons/ri";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchLogout} from "../../redux/slices/authSlice.jsx";
import {toast} from "react-toastify";
import {Context} from "../../context/ContextProvider.jsx";
import {extractInitials} from "../../utils/helper.jsx";

const Navbar = () => {
    const {account} = useContext(Context);
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const menuRef = useRef();
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        const handler = (event) => {
            if (openMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false)
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        }
    }, [openMenu])
    const handleLogout = (e) => {
        e.preventDefault()
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
                    navigate("/admin/v1/cms/sign-in")
                toast.success(res.message)
            }
        })
    }
    const handleOpenSidebar = () => {

    }
    return (
        <div className={`py-3 px-3 lg:px-5 lg:pl-3 shadow`}>
            <div className={`flex justify-between items-center`}>
                <div className="flex justify-start items-center">
                    <button onClick={handleOpenSidebar} id={`toggleSidebarMobile`} aria-expanded={true}
                            aria-controls={`sidebar`}
                            className={`p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100`}>
                        <HiOutlineBars3CenterLeft className={`w-6 h-6 text-black`}/>
                        <MdOutlineClose className="w-6 h-6 hidden text-black"/>
                    </button>
                    <Link to={""} className={`text-md lg:ml-4 font-semibold flex items-center lg:mr-1.5`}>
                        <span
                            className={`hidden md:inline-block self-center text-xl font-bold whitespace-nowrap`}>BizTrip</span>
                    </Link>
                    <form action={`#`} method={`GET`} className={`hidden lg:block lg:pl-8`}>
                        <label htmlFor={`topbar-search`} className={`sr-only`}>Search</label>
                        <div className={`relative mt-1 lg:w-80`}>
                            <div className={`flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none`}>
                                <HiOutlineSearch className={`w-5 h-5 text-gray-500`}/>
                            </div>
                            <input id={`topbar-search`} type={`text`} name={`topbar-search`}
                                   className={`bg-gray-50 block w-full pl-10 p-2.5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-gray-500 focus:border-[1px] focus:ring-gray-500 focus:ring-1`}
                                   placeholder={`Tìm kiếm`}/>
                        </div>
                    </form>
                </div>
                <div className="flex items-center">
                    <button id={`toggleSidebarMobileSearch`} type={`button`}
                            className={`p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100`}>
                        <span className={`sr-only`}>Search</span>
                        <HiOutlineSearch className={`w-6 h-6 text-gray-500`}/>
                    </button>
                    <button type={`button`} data-dropdown-toggle={`notification-dropdown`}
                            className={`p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100`}>
                        <span className={`sr-only`}>Xem thông báo</span>
                        <IoNotificationsSharp className={`w-6 h-6`}/>
                    </button>
                    <button type={`button`} data-dropdown-toggle={`notification-dropdown`}
                            className={`p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100`}>
                        <span className={`sr-only`}>Cài đặt</span>
                        <RiSettings3Fill className={`w-6 h-6`}/>
                    </button>
                    <div
                        className={`overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-300 hidden`}
                        id={`notification-dropdown`} data-popper-placement={`bottom`}
                        style={{
                            position: "absolute",
                            inset: "0px auto auto 0px",
                            margin: "0px",
                            transform: "translate3d(629.5px, 62px, 0px)"
                        }}>
                        <div
                            className={`block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50`}>Thông
                            báo
                        </div>
                        <div>
                            <a href={`#`} className={`flex py-3 px-4 border-b hover:bg-gray-100`}>
                                <div className={`pl-3 w-full`}>
                                    <div className={`text-gray-500 font-normal text-sm mb-1.5`}>
                                        Tin nhắn mới từ
                                        <span className={`font-semibold text-gray-900`}>Đức Anh</span>
                                        : "Hey, what's up? All set for the presentation?"
                                    </div>
                                    <div className={`text-xs font-medium text-fuchsia-500`}>
                                        khoảng vài phút trước
                                    </div>
                                </div>
                            </a>
                            <a href={`#`} className={`flex py-3 px-4 border-b hover:bg-gray-100`}>
                                <div className={`pl-3 w-full`}>
                                    <div className={`text-gray-500 font-normal text-sm mb-1.5`}>
                                        Tin nhắn mới từ
                                        <span className={`font-semibold text-gray-900`}>Đức Anh</span>
                                        : "Hey, what's up? All set for the presentation?"
                                    </div>
                                    <div className={`text-xs font-medium text-fuchsia-500`}>
                                        khoảng vài phút trước
                                    </div>
                                </div>
                            </a>
                            <a href={`#`} className={`flex py-3 px-4 border-b hover:bg-gray-100`}>
                                <div className={`pl-3 w-full`}>
                                    <div className={`text-gray-500 font-normal text-sm mb-1.5`}>
                                        Tin nhắn mới từ
                                        <span className={`font-semibold text-gray-900`}>Đức Anh</span>
                                        : "Hey, what's up? All set for the presentation?"
                                    </div>
                                    <div className={`text-xs font-medium text-fuchsia-500`}>
                                        khoảng vài phút trước
                                    </div>
                                </div>
                            </a>
                            <a href={`#`} className={`flex py-3 px-4 hover:bg-gray-100`}>
                                <div className={`pl-3 w-full`}>
                                    <div className="text-gray-500 font-normal text-sm mb-1.5"><span
                                        className="font-semibold text-gray-900">Đức Anh</span> đã đăng tải một video
                                        mới:
                                        BizTrip - learn how to implement the new design trend.
                                    </div>
                                    <div className="text-xs font-medium text-fuchsia-500">3 giờ trước</div>
                                </div>
                            </a>
                        </div>
                        <a href="#"
                           className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100">
                            <div className="inline-flex items-center ">
                                <HiOutlineEye className={`mr-2 w-5 h-5 text-gray-500`}/>
                                View all
                            </div>
                        </a>
                    </div>
                    <div className={`ml-3 relative`}>
                        <div onClick={() => setOpenMenu(!openMenu)} ref={menuRef}>
                            <div>
                                <button type={`button`}
                                        className={`flex text-sm bg-primaryColor rounded-full focus:ring-4 focus:ring-gray-300 w-9 h-9 flex items-center justify-center`}
                                        aria-expanded={`false`} data-dropdown-toggle={`dropdown-2`}>
                                    <span className={`sr-only`}>Danh mục người dùng</span>
                                    <span className={`text-white font-medium`}>{extractInitials(account?.user?.fullName)}</span>
                                </button>
                            </div>
                            <div
                                className={`${openMenu ? '' : 'hidden'} absolute -left-32 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-300`}
                                id="dropdown-2"
                                data-popper-placement="bottom">
                                <div className="py-3 px-4" role="none">
                                    <p className="text-sm" role="none">
                                        {account?.user?.fullName}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                        {account?.user?.email}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <Link to={`/admin/v1/cms/profile`}
                                            className="block w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem">Cài đặt
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={(e) => handleLogout(e)}
                                                className="block w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem">Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;