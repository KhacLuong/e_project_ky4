export const ADMIN_DOCUMENT_TITLE = "CMS - BizTrip"
export const CUSTOMER_DOCUMENT_TITLE = "BizTrip"

import {MdOutlineSpaceDashboard, MdContactSupport, MdOutlinePolicy, MdOutlineContactMail, MdOutlineAssignment, MdLocationOn} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BiDollarCircle, BiNews, BiCommentDetail, BiHomeSmile, BiSolidUserBadge} from "react-icons/bi";
import {HiOutlineTicket} from "react-icons/hi";
import {TbBus, TbRoad} from "react-icons/tb";
import {GrSchedules, GrContactInfo} from "react-icons/gr";
import {AiOutlineLike} from "react-icons/ai";
import {RiBillLine} from "react-icons/ri"
import {BsPersonVcard, BsPersonBadge, BsCalendar2Week} from "react-icons/bs"
import {FaRegNewspaper} from "react-icons/fa"

const FINAL_URL_ADMIN = "/admin/v1/cms"
const FINAL_URL_CUSTOMER = ""
export const dataNavbarCustomer = [
    {
        name: "Trang chủ",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/v1`,
        icon: BiHomeSmile,
    },
    {
        name: "Liên hệ",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/v1/lien-he`,
        icon: MdOutlineContactMail
    },
    {
        name: "Tin tức",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/v1/tin-tuc`,
        icon: FaRegNewspaper
    },
    {
        name: "Về chúng tôi",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/v1/ve-chung-toi`,
        icon: GrContactInfo
    }
]

export const dataSidebarAdmin = [
    {
        name: "Dashboard",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/dashboard`,
        icon: MdOutlineSpaceDashboard,
    },
    {
        name: "Quản lý",
        isSubcategory: false,
        icon: <></>,
    },
    {
        name: "Đơn đặt vé",
        key: 'booking-ticket',
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/booking-tickets`,
        icon: RiBillLine,
    },
    // {
    //     name: "Phân công",
    //     isSubcategory: true,
    //     url: `${FINAL_URL_ADMIN}/division`,
    //     icon: MdOutlineAssignment,
    // },
    {
        name: "Xe",
        isSubcategory: true,
        icon: TbBus,
        key: 'coaches',
        children: [
            {
                name: "Danh sách",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/list`,
                icon: <></>,
            },
            {
                name: "Lộ trình xe",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/distances`,
                icon: <></>,
            },
            {
                name: "Giá vé",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/price-ticket`,
                icon: <></>,
            },
            {
                name: "Tiện ích",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/utilities`,
                icon: <></>,
            },
            {
                name: "Đánh giá",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/feedbacks`,
                icon: <></>,
            },
        ]
    },
    {
        name: "Người dùng",
        isSubcategory: true,
        icon: FiUsers,
        key: 'users',
        children: [
            {
                name: 'Danh sách',
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/list`,
                icon: <></>,
            },
            {
                name: "Lời nhận xét",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/testimonials`,
                icon: <></>,
            },
            {
                name: "Liên hệ",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/contacts`,
                icon: <></>
            }
        ]
    },
    {
        name: "Tuyến đường",
        isSubcategory: true,
        icon: GrSchedules,
        url: `${FINAL_URL_ADMIN}/schedules`,
        children: []
    },
    {
        name: "Địa điểm",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/locations`,
        icon: MdLocationOn,
        children: []
    }
    // {
    //     name: "Nhân viên",
    //     isSubcategory: true,
    //     icon: BsPersonBadge,
    //     key: 'employee',
    //     children: [
    //         {
    //             name: 'Danh sách',
    //             isSubcategory: true,
    //             url: `${FINAL_URL_ADMIN}/employee/list`,
    //             icon: <></>,
    //         },
    //         {
    //             name: 'Ý kiến/phản hồi',
    //             isSubcategory: true,
    //             url: `${FINAL_URL_ADMIN}/employee/feedback`,
    //             icon: <></>,
    //         },
    //     ]
    // }
]
export const tbodyActionDefault = ['edit', 'delete']
export const tbodyActionView = ['select']
export const tbodyActionSpecial = ['view', 'edit', 'delete']

export const listBreadcrumb = (name) => {
    return [
        {
            name: "Dashboard",
            path: `${FINAL_URL_ADMIN}`
        },
        {
            name: name,
            path: ""
        }
    ]
}
export const formBreadCrumb = (id, name, path) => {
    return [
        {
            name: "Dashboard",
            path: `${FINAL_URL_ADMIN}`
        },
        {
            name: name,
            path: `${FINAL_URL_ADMIN}/${path}`
        },
        {
            name: !id ? "Thêm mới" : "Cập nhật",
            path: ""
        }
    ]
}
