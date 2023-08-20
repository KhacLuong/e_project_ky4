import React from 'react';
import {MdAttachMoney} from "react-icons/md";
import {HiArrowNarrowDown, HiArrowNarrowUp, HiOutlineTicket, HiUsers} from "react-icons/hi";
import {TbBus} from "react-icons/tb";

const Widget = () => {
    return (
        <div className={`grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4`} >
            <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}
                 data-aos="fade-up"
                 data-aos-delay="100">
                <div className={`flex items-center`}>
                    <div
                        className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-primaryColor rounded-lg shadow-md shadow-gray-300`}>
                        <MdAttachMoney className={`w-6 h-6`}/>
                    </div>
                    <div className={`flex-shrink-0 ml-3`}>
                        <span className={`text-2xl font-bold leading-none text-gray-900`}>$3,600 / ngày</span>
                        <h3 className={`text-base font-normal text-gray-500`}>Doanh thu</h3>
                    </div>
                    <div
                        className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-lime-500">
                        +16%
                        <HiArrowNarrowUp className={`w-5 h-5`}/>
                    </div>
                </div>
            </div>
            <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}
                 data-aos="fade-up"
                 data-aos-delay="300"
                 data-aos-duration="1000"
                 data-aos-easing="ease-in-out">
                <div className={`flex items-center`}>
                    <div
                        className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-primaryColor rounded-lg shadow-md shadow-gray-300`}>
                        <HiOutlineTicket className={`w-6 h-6`}/>
                    </div>
                    <div className={`flex-shrink-0 ml-3`}>
                        <span className={`text-2xl font-bold leading-none text-gray-900`}>2,300 / ngày</span>
                        <h3 className={`text-base font-normal text-gray-500`}>Vé đã bán</h3>
                    </div>
                    <div
                        className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-lime-500">
                        +3%
                        <HiArrowNarrowUp className={`w-5 h-5`}/>
                    </div>
                </div>
            </div>
            <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}
                 data-aos="fade-up"
                 data-aos-delay="500"
                 data-aos-duration="1000"
                 data-aos-easing="ease-in-out">
                <div className={`flex items-center`}>
                    <div
                        className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-primaryColor rounded-lg shadow-md shadow-gray-300`}>
                        <HiUsers className={`w-6 h-6`}/>
                    </div>
                    <div className={`flex-shrink-0 ml-3`}>
                        <span className={`text-2xl font-bold leading-none text-gray-900`}>+3,462</span>
                        <h3 className={`text-base font-normal text-gray-500`}>Khách hàng mới</h3>
                    </div>
                    <div
                        className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-red-500">
                        -2%
                        <HiArrowNarrowDown className={`w-5 h-5`}/>
                    </div>
                </div>
            </div>
            <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}
                 data-aos="fade-up"
                 data-aos-delay="700"
                 data-aos-duration="1000"
                 data-aos-easing="ease-in-out">
                <div className={`flex items-center`}>
                    <div
                        className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-primaryColor rounded-lg shadow-md shadow-gray-300`}>
                        <TbBus className={`w-6 h-6`}/>
                    </div>
                    <div className={`flex-shrink-0 ml-3`}>
                        <span className={`text-2xl font-bold leading-none text-gray-900`}>100</span>
                        <h3 className={`text-base font-normal text-gray-500`}>Đối tác</h3>
                    </div>
                    <div
                        className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-lime-500">
                        0%
                        {/*<HiArrowNarrowDown className={`w-5 h-5`}/>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget;