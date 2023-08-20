import React, {useState} from 'react';
import {RiArrowLeftSLine} from "react-icons/ri";
import {CiLocationOn} from "react-icons/ci";
import {formatPriceToVND, formatTimeArray} from "../../../utils/helper.jsx";

const LayoutLocation = ({
                            seatsReducer,
                            handleGoPrevious,
                            handleGoNext,
                            pickUpDtoList,
                            dropOffDtoList,
                            formState,
                            setFormState}) => {
    const handleInputOnChange = (e) => {
        const {name, value} = e.target;
        setFormState(prevState => {
            return {
                ...prevState,
                [name]: +value,
            }
        })
    }
    return (
        <>

            <div className={`grid grid-cols-2 gap-4 bg-white rounded-2xl rounded-tl-none p-3`}>
                <div className={`col-span-2`}>
                    <h3 className={`text-[14px] inline-block bg-[#ecf4fd] p-4 rounded text-primaryColor leading-[20px]`}>
                        An tâm được đón đúng nơi, trả đúng chỗ đã chọn và dễ dàng thay đổi khi cần.
                    </h3>
                </div>
                <div className={`col-span-2 grid grid-cols-2 gap-8`}>
                    <div className={`col-span-1`}>
                        <div className={`bg-[#f7f7f7] flex flex-col py-3 px-5 mb-4`}>
                            <p className={`text-[#484848] text-lg font-bold leading-6`}>Điểm đón</p>
                        </div>
                        <div
                            className={`w-full h-[calc(100%-44px)] overflow-hidden overflow-y-auto py-[10px] pr-[78px] pl-[16px]`}>
                            {
                                pickUpDtoList.length > 0 && pickUpDtoList.map((item, index) => {
                                    if (item?.status === "active") {
                                        return (
                                            <div key={index} className={`text-sm mb-4 last:mb-0 h-16`}>
                                                <label className={`flex items-center`}>
                                                    <span className={`h-[16px] leading-none outline-none`}>
                                                        <input type={`radio`} name={`pickUpPointId`}
                                                               value={item?.id}
                                                               checked={item?.id === formState.pickUpPointId}
                                                               onChange={handleInputOnChange}/>
                                                    </span>
                                                    <span className={`px-2`}>
                                                        <div
                                                            className={`text-primaryColor whitespace-pre-wrap flex items-center`}>
                                                            <span
                                                                className={`font-semibold text-sm leading-normal`}>{formatTimeArray(item?.time, "HH:mm")}</span>
                                                            <span color={`#0060C4`}
                                                                  className={`mx-2 flex w-1.5 h-1.5 rounded-full bg-primaryColor relative `}></span>
                                                            <span>{item?.locationName}</span>
                                                        </div>
                                                    </span>
                                                </label>
                                                <div className={`mt-2 flex items-center`}>
                                                    {
                                                        item?.address &&
                                                        <>
                                                             <span>
                                                                <CiLocationOn className={`mr-2`}/>
                                                            </span>
                                                            <span className={`text-[#484848]`}>
                                                                {item?.address}
                                                            </span>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                    </div>
                    <div className={`col-span-1`}>
                        <div className={`bg-[#f7f7f7] flex flex-col py-3 px-5 mb-4`}>
                            <p className={`text-[#484848] text-lg font-bold leading-6`}>Điểm trả</p>
                        </div>
                        <div
                            className={`w-full h-[calc(100%-44px)] overflow-hidden overflow-y-auto py-[10px] pr-[78px] pl-[16px]`}>
                            {
                                dropOffDtoList.length > 0 && dropOffDtoList.map((item, index) => {
                                    if (item?.status === "active") {
                                        return (
                                            <div key={index} className={`text-sm mb-4 last:mb-0 h-16`}>
                                                <label className={`flex items-center`}>
                                                    <span className={`h-[16px] leading-none outline-none`}>
                                                        <input type={`radio`} name={`dropOffPointId`}
                                                               value={item?.id}
                                                               checked={item?.id === formState?.dropOffPointId}
                                                               onChange={handleInputOnChange}/>
                                                    </span>
                                                    <span className={`px-2`}>
                                                        <div
                                                            className={`text-primaryColor whitespace-pre-wrap flex items-center`}>
                                                            <span
                                                                className={`font-semibold text-sm leading-normal`}>{formatTimeArray(item?.time, "HH:mm")}</span>
                                                            <span color={`#0060C4`}
                                                                  className={`mx-2 flex w-1.5 h-1.5 rounded-full bg-primaryColor relative `}></span>
                                                            <span>{item?.locationName}</span>
                                                        </div>
                                                    </span>
                                                </label>
                                                <div className={`mt-2 flex items-center`}>
                                                    {
                                                        item?.address &&
                                                        <>
                                                            <span>
                                                                <CiLocationOn className={`mr-2`}/>
                                                            </span>
                                                            <span className={`text-[#484848]`}>
                                                                {item?.address}
                                                            </span>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-gray-100 pt-[30px]`}>
                <div className={`flex justify-between items-center`}>
                    <div className={`w-1/2 flex items-center justify-between`}>
                        <h3 className={`font-semibold text-xl`}>Số
                            lượng: {seatsReducer.countSeat} vé</h3>
                        <h3 className={`font-semibold text-xl`}>Tổng
                            tiền: {formatPriceToVND(seatsReducer.total)}</h3>
                    </div>
                    <div className={`flex items-center`}>
                        <button
                            onClick={handleGoPrevious}
                            className={`flex items-center duration-300 text-white bg-dangerColor-default_2 hover:bg-dangerColor-hover_2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mr-4`}>
                            <RiArrowLeftSLine className={`mt-0.5 w-6 h-6`}/>
                            Quay lại
                        </button>
                        <button
                            onClick={handleGoNext}
                            className={`flex items-center duration-300 text-white bg-primaryColor hover:bg-primaryColor_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center`}>
                            Tiếp tục
                            <RiArrowLeftSLine className={`rotate-180 mt-0.5 w-6 h-6`}/>
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default LayoutLocation;