import {
    ErrorPage,
    AdminHomePage,
    DashBoardPage,
    PriceTicketListPage,
    PriceTicketFormPage,
    PolicyListPage,
    UtilityListPage,
    UtilityFormPage,
    ScheduleListPage,
    ScheduleFormPage,
    NewsListPage,
    BookingListPage,
    RevenuePage,
    TestimonialListPage,
    TestimonialFormPage,
    UserFormPage,
    UserListPage,
    CoachCarListPage,
    CustomerMainLayout,
    CoachCarFormPage,
    ResetPasswordPage,
    ContactListPage,
    LocationListPage,
    LocationFormPage,
    CustomerHomePage,
    BookingCoachPage,
    BookingSeatPage,
    AdminSignInPage,
    CustomerProfilePage,
    PaymentPage,
    CalendarPage,
    DivisionPage,
    DivisionDetailPage,
    ContactPage,
    AdminProfilePage,
    DistanceFormPage,
    DistanceListPage
} from "../utils/import.jsx";

export const dataRouters = [
    {
        path: "*",
        page: ErrorPage,
        isIndex: false,
        isAuthentication: false,
        isRole: []
    },
    {
        path: "v1/users/reset-password",
        page: ResetPasswordPage,
        isIndex: false,
        isAuthentication: false,
        isRole: []
    },
    {
        path: "v1/users/thanh-toan/:slug",
        page: PaymentPage,
        isIndex: false,
        isAuthentication: true,
        isRole: ['ADMIN', 'USER']
    },
    {
        path: "",
        page: CustomerMainLayout,
        isIndex: false,
        isAuthentication: false,
        isRole: [],
        children: [
            {
                path: "",
                page: CustomerHomePage,
                isIndex: true,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1",
                page: CustomerHomePage,
                isIndex: true,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1/danh-sach-xe/:slug",
                page: BookingCoachPage,
                isIndex: false,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1/dat-ve/:slug",
                page: BookingSeatPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN', 'USER']
            },
            {
                path: "v1/tai-khoan/:slug",
                page: CustomerProfilePage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN', 'USER']
            },
            // {
            //     path: "v1/tin-tuc",
            //     page: <></>,
            //     isIndex: false,
            //     isAuthentication: false
            // },
            // {
            //     path: "v1/tin-tuc/:slug",
            //     page: <></>,
            //     isIndex: false,
            //     isAuthentication: false
            // },
            {
                path: "v1/lien-he",
                page: ContactPage,
                isIndex: false,
                isAuthentication: false,
                isRole: ['ADMIN', 'USER']
            },
            // {
            //     path: "v1/ve-chung-toi",
            //     page: <></>,
            //     isIndex: false,
            //     isAuthentication: false
            // }
        ]
    },
    {
        path: "admin/v1/cms/sign-in",
        page: AdminSignInPage,
        isIndex: false,
        isAuthentication: false,
        isRole: []
    },
    {
        path: "admin/v1/cms",
        page: AdminHomePage,
        isIndex: false,
        isAuthentication: true,
        isRole: ['ADMIN'],
        children: [
            {
                path: "",
                page: DashBoardPage,
                isIndex: true,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "dashboard",
                page: DashBoardPage,
                isIndex: true,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/list",
                page: UserListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/list/create",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/list/edit",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/list",
                page: CoachCarListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/list/create",
                page: CoachCarFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/list/edit",
                page: CoachCarFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "booking-tickets",
                page: BookingListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "revenues",
                page: RevenuePage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "news",
                page: NewsListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/testimonials",
                page: TestimonialListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/testimonials/create",
                page: TestimonialFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/testimonials/edit",
                page: TestimonialFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/contacts",
                page: ContactListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/utilities",
                page: UtilityListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/utilities/create",
                page: UtilityFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/utilities/edit",
                page: UtilityFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "schedules",
                page: ScheduleListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "schedules/edit",
                page: ScheduleFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "schedules/create",
                page: ScheduleFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/price-ticket",
                page: PriceTicketListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/price-ticket/create",
                page: PriceTicketFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/price-ticket/edit",
                page: PriceTicketFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "locations",
                page: LocationListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/distances",
                page: DistanceListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/distances/create",
                page: DistanceFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "coaches/distances/edit",
                page: DistanceFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "locations/create",
                page: LocationFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "locations/edit",
                page: LocationFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "policies",
                page: PolicyListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "calendar",
                page: CalendarPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN', 'EMPLOYEE']
            },
            {
                path: "division",
                page: DivisionPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "division/detail",
                page: DivisionDetailPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "profile",
                page: AdminProfilePage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
        ]
    },
]