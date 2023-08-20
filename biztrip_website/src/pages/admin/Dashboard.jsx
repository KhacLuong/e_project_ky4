import React from 'react';
import {HiArrowNarrowUp} from "react-icons/hi";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import Widget from "../../components/admin/Widget.jsx";
import "aos/dist/aos.css";
import Footer from "../../layouts/admin/Footer.jsx";
import {BiMinus} from "react-icons/bi";
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {ADMIN_DOCUMENT_TITLE} from "../../utils/data.jsx";

const Dashboard = () => {
    useDocumentTitle(ADMIN_DOCUMENT_TITLE, true)
    return (
        <>
            <main>
                <div className={`px-4 pt-6`}>
                    <Widget/>
                    <div className={`grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-3`}>
                        <div
                            className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4  bg-gradient-to-r from-sky-800 to-blue-900 2xl:col-span-2`}>
                            <div className={`flex justify-between items-center mb-4`}>
                                <div className={`flex-shrink-0`}>
                                <span
                                    className={`text-2xl font-bold leading-none text-white sm:text-3xl`}>$45.385</span>
                                    <h3 className={`text-base font-normal text-gray-400`}>Doanh thu trong tuần</h3>
                                </div>
                                <div className={`flex flex-1 justify-end items-center text-base font-bold text-lime-500`}>
                                    12,5%
                                    <HiArrowNarrowUp className={`w-5 h-5`}/>
                                </div>
                            </div>
                            <div id={`main-chart`} style={{minHeight: "435px"}}>
                                1234
                            </div>
                            <div className={`flex justify-between items-center pt-3 mt-5 border-t border-gray-700 sm:pt-6`}>
                                <div>
                                    <button
                                        className={`inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 rounded-2xl hover:text-white"`}>Trong
                                        7 ngày gần nhất <IoIosArrowDown className={`ml-2 w-4 h-4`}/></button>
                                    <div
                                        className={`z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-200 hidden`}
                                        data-popper-placement={`bottom`} style={{
                                        position: "absolute",
                                        inset: "0px auto auto 0px",
                                        margin: "0px",
                                        transform: "translate3d(344px, 812px, 0px)"
                                    }}>
                                        <div className={`py-3 px-4`} role={`none`}>
                                            <p className={`text-sm font-medium text-gray-900 truncate`} role={`none`}>
                                                Sep 16, 2021 - Sep 22, 2021</p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Yesterday</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Today</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Last 7 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Last 30 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Last 90 days</a>
                                            </li>
                                        </ul>
                                        <div className="py-1" role="none">
                                            <a href="#"
                                               className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                               role="menuitem">Custom...</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="#"
                                       className="inline-flex items-center p-2 text-xs font-medium text-white uppercase rounded-lg sm:text-sm hover:bg-gray-700">
                                        Sales Report
                                        <IoIosArrowForward className="ml-1 w-4 h-4 sm:w-5 sm:h-5"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 ">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900">Sales by Country</h3>
                                    <span
                                        className="text-base font-normal text-gray-500">This is a list of latest country</span>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="#"
                                       className="p-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100">View
                                        all</a>
                                </div>
                            </div>
                            <div className="flex flex-col mt-8">
                                <div className="overflow-x-auto rounded-2xl py-4">
                                    <div className="inline-block min-w-full align-middle">
                                        <div className="overflow-hidden shadow-lg shadow-gray-200 sm:rounded-2xl">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                <tr>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                        Country
                                                    </th>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                        Sales
                                                    </th>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                        Value
                                                    </th>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                        Bounce
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
                                                    <span
                                                        className="mx-5 ml-3 w-32 text-base font-medium text-gray-900 sm:flex-none">United States</span>
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        9600
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        $756,600
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                        29.6%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap rounded-2xl rounded-left">
                                                    <span
                                                        className="flex-none mx-5 ml-3 w-32 text-base font-medium text-gray-900">Canada</span>
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        8340
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        $545,760
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                        29.6%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
                                                    <span
                                                        className="flex-none mx-5 ml-3 w-32 text-base font-medium text-gray-900">France</span>
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        6700
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        $487,560
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                        34.5%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap rounded-2xl rounded-left">
                                                    <span
                                                        className="flex-none mx-5 ml-3 w-32 text-base font-medium text-gray-900">Australia</span>
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        3900
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        $380,670
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                        40.22%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
                                                    <span
                                                        className="flex-none mx-5 ml-3 w-32 text-base font-medium text-gray-900">Italy</span>
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        2470
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        $230,900
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                        30.4%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap rounded-2xl rounded-left">
                                                    <span
                                                        className="flex-none mx-5 ml-3 w-32 text-base font-medium text-gray-900">India</span>
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        700
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        $47,480
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                        54.5%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
                                                    <span
                                                        className="flex-none mx-5 ml-3 w-32 text-base font-medium text-gray-900">Japan</span>
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        300
                                                    </td>
                                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        $7,200
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                        24.5%
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t sm:pt-6">
                                <div>
                                    <button
                                        className={`inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 rounded-2xl hover:text-white"`}>Trong
                                        7 ngày gần nhất <IoIosArrowDown className={`ml-2 w-4 h-4`}/></button>
                                    <div
                                        className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-200"
                                        id="transactions-dropdown"
                                        style={{
                                            position: "absolute",
                                            inset: "auto auto 0px 0px",
                                            margin: "0px",
                                            transform: "translate3d(344px, 1184.8px, 0px)"
                                        }}
                                        data-popper-placement="top" data-popper-reference-hidden="" data-popper-escaped="">
                                        <div className="py-3 px-4" role="none">
                                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                                Sep 16, 2021 - Sep 22, 2021
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Yesterday</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Today</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Last 7 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Last 30 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                                   role="menuitem">Last 90 days</a>
                                            </li>
                                        </ul>
                                        <div className="py-1" role="none">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                               role="menuitem">Custom...</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="#"
                                       className="inline-flex items-center p-2 text-xs font-medium text-gray-900 uppercase rounded-lg sm:text-sm hover:bg-gray-100">
                                        Sales Report
                                        <IoIosArrowForward className="ml-1 w-4 h-4 sm:w-5 sm:h-5"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
            <p className="my-10 text-sm text-center text-gray-500">
                <span className={`inline-flex items-center `}>© 2019 <BiMinus/> 2023</span> Built with ❤️ by
                <a href="#" className="hover:underline" target="_blank"> Creative BizTrip Team</a>. All
                rights reserved.
            </p>
        </>
    );
};

export default Dashboard;