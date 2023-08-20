import React, {useContext, useEffect, useRef, useState} from 'react';
import parse from "html-react-parser"
import {Context} from "../context/ContextProvider.jsx";
import {AiFillStar, AiOutlineClose, AiTwotoneStar} from "react-icons/ai";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {formatTimeArray, handleCalculateAverage, renderStar} from "../utils/helper.jsx";
import moment from "moment";
import {MdVerified} from "react-icons/md";

const CoachModal = () => {
    const {id, openModalCoach, setOpenModalCoach, coach} = useContext(Context);
    const modal = useRef(null);
    const mainRef = useRef(null);
    const thumbsRef = useRef(null);
    const mainOptions = {
        type: 'fade',
        rewind: true,
        pagination: false,
        arrows: false,
        autoplay: true,
        interval: 5000,
    };

    const thumbsOptions = {
        type: 'loop',
        lazyLoad: 'nearby',
        rewind: true,
        pagination: false,
        cover: true,
        focus: 'center',
        omitEnd: true,
        isNavigation: true,
        perPage: 5,
        perMove: 1,
    };

    useEffect(() => {
        if (mainRef.current && thumbsRef.current && mainRef.current.splide && thumbsRef.current.splide) {
            mainRef.current.sync(thumbsRef.current.splide);
            thumbsRef.current.sync(mainRef.current.splide);
        }
    }, [id])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modal.current && !modal.current.contains(event.target)) {
                setOpenModalCoach(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modal]);

    const handleCloseModal = () => {
        setOpenModalCoach(false)
    }
    return (
        <div ref={modal}
             className={`${openModalCoach ? 'block' : 'hidden'} fixed top-0 left-1/2 -translate-x-1/2 z-50 p-4 w-[678px] h-[640px]`}>
            <div className="relative w-full max-w-2xl h-[640px]">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                Thông tin chi tiết
                            </h3>
                            <span className={`text-sm`}>{coach.name} - {coach.plateNumber}</span>
                        </div>

                        <button type="button"
                                onClick={handleCloseModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <AiOutlineClose className={`w-5 h-5 text-dangerColor-default_2`}/>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={`h-full`}>
                        <Tabs id={""} children={""} value={"tab-1"} className={`overflow-visible h-full`}>
                            <TabsHeader
                                className="w-full rounded-none border-b border-blue-gray-50 bg-transparent"
                                indicatorProps={{
                                    className: "bg-transparent border-b-[3.5px] border-primaryColor shadow-none mt-1 rounded-none",
                                }}>
                                {
                                    dataTab.map(({label, value}) => (
                                        <Tab value={value}
                                             key={value}
                                             className={`before:content[''] before:inline-block before:absolute before:w-0 before:bg-primaryColor before:h-[3px] before:bottom-[-4px] hover:before:w-full hover:before:duration-500`}>
                                            {label}
                                        </Tab>
                                    ))
                                }
                            </TabsHeader>
                            {
                                Object.keys(coach).length !== 0 && <TabsBody className={`overflow-visible`}
                                                                             animate={{
                                                                                 initial: {x: 0},
                                                                                 mount: {y: 0},
                                                                                 unmount: {x: 0},
                                                                             }}>
                                    <TabPanel value={'tab-1'} className={`w-full h-[510px]`}>
                                        <Splide hasTrack={false}
                                                ref={mainRef}
                                                aria-labelledby="thumbnail-slider-example"
                                                options={mainOptions}>
                                            <SplideTrack>
                                                {
                                                    coach?.thumbnails && coach?.thumbnails?.length > 0 && coach?.thumbnails.map((thumbnail, index) => {
                                                        return (
                                                            <SplideSlide key={index}>
                                                                <div className={`h-[340px] z-0 relative`}>
                                                                    <img src={thumbnail.imagePath}
                                                                         alt={thumbnail.title}
                                                                         className={`w-full h-full object-contain`}/>
                                                                </div>
                                                            </SplideSlide>
                                                        )
                                                    })
                                                }
                                            </SplideTrack>
                                        </Splide>
                                        <Splide hasTrack={false}
                                                ref={thumbsRef}
                                                aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
                                                options={thumbsOptions}>
                                            <SplideTrack className={`mt-3`}>
                                                {coach?.thumbnails?.length > 0 && coach?.thumbnails.map((thumbnail, index) => (
                                                    <SplideSlide key={index} className={`coach_splide shadow-md relative`}>
                                                        <div className={`w-full aspect-square p-1`}>
                                                            <img src={thumbnail.imagePath}
                                                                 alt={thumbnail.title}
                                                                 className={`w-full h-full object-cover`}/>
                                                        </div>
                                                    </SplideSlide>
                                                ))}
                                            </SplideTrack>
                                            <div className="splide__arrows">
                                                <button
                                                    className="splide__arrow splide__arrow--prev rotate-180 -ml-3 rounded shadow-md text-lg -top-full -translate-y-3/4 h-24 bg-[#f6f6f6] z-30">
                                                    <IoIosArrowBack/>
                                                </button>
                                                <button
                                                    className="splide__arrow splide__arrow--next -mr-3 rounded shadow-md text-lg -top-full -translate-y-3/4 h-24 bg-[#f6f6f6] z-30">
                                                    <IoIosArrowForward/>
                                                </button>
                                            </div>
                                        </Splide>
                                    </TabPanel>
                                    <TabPanel value={'tab-2'} className={`w-full h-[510px] overflow-y-scroll`}>
                                        <div className={``}>
                                            <div className={`mb-[24px]`}>
                                                {
                                                    coach.utilities && coach.utilities.map((item, index) => {
                                                        if (item.description !== '' && item.status === true) {
                                                            return (
                                                                <div key={index}
                                                                     className={`${index === 0 ? 'rounded-t-[4px]' : ''} bg-[#f6f6f6] p-[12px] border-b-[1px] last:border-b-0 border-gray-300`}>
                                                                    <div className={`flex items-center`}>
                                                                        <img
                                                                            className={`w-[40px] h-[40px] align-middle mr-[8px]`}
                                                                            src={item.imagePath} alt={item.title}/>
                                                                        <p className={`text-black  font-medium`}>{item.title}</p>
                                                                    </div>
                                                                    <p className={`text-[14px] whitespace-pre-line`}>
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                            <div className={`grid grid-cols-3 gap-2`}>
                                                {
                                                    coach.utilities && coach.utilities.map((item, index) => {
                                                        if (item.description === '' && item.status === true) {
                                                            return (
                                                                <div key={index} className={`px-[8px] col-span-1`}>
                                                                    <div className={`inline-flex items-center text-black mb-4`}>
                                                                        <img
                                                                            className={`w-[40px] h-[40px] align-middle mr-[12px]`}
                                                                            src={item.imagePath} alt={item.title}/>
                                                                        <p className={`text-black font-medium`}>{item.title}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={'tab-3'} className={`w-full h-[510px] overflow-y-scroll`}>
                                        <div className={`text-[16px]`}>
                                            <div className={` h-auto mx-0 px-[16px]`}>
                                                <h3 className={`font-semibold text-primaryColor`}>Lưu ý</h3>
                                                <p className={`whitespace-pre-line text-[#4d4d4d]`}>
                                                    Các mốc thời gian đón,
                                                    trả bên dưới là thời gian dự kiến.
                                                    Lịch này có thể thay đổi tùy tình hình thưc tế.
                                                </p>
                                            </div>
                                            <div
                                                className={`p-[16px] my-[24px] mx-0 relative h-auto grid grid-cols-2 gap-4`}>
                                                <div className={`col-span-1`}>
                                                    <h3 className={`text-[16px] font-semibold`}>Điểm đón</h3>
                                                    <div className={`mt-[16px]`}>
                                                        {
                                                            coach?.pickUpDtoList && coach?.pickUpDtoList?.length > 0 && coach?.pickUpDtoList.map((item, index) => {
                                                                if (item.status === "active") {
                                                                    return (
                                                                        <div key={index}
                                                                             className={`flex items-center mt-[13px]`}>
                                                                        <span
                                                                            className={`font-semibold text-[16px] text-[#4d4d4d]`}>{formatTimeArray(item?.time, "HH:mm")}</span>
                                                                            <span
                                                                                className={`flex pl-[8px] text-[16px] text-[#4d4d4d]`}>&#x2022; {item.locationName}
                                                                        </span>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className={`col-span-1`}>
                                                    <h3 className={`text-[16px] font-semibold`}>Điểm trả</h3>
                                                    <div className={`mt-[16px]`}>
                                                        {
                                                            coach?.dropOffDtoList && coach?.dropOffDtoList?.length > 0 && coach?.dropOffDtoList.map((item, index) => {
                                                                if (item.status === "active") {
                                                                    return (
                                                                        <div key={index}
                                                                             className={`flex items-center mt-[13px]`}>
                                                                        <span
                                                                            className={`font-semibold text-[16px] text-[#4d4d4d]`}>{formatTimeArray(item?.time, "HH:mm")}</span>
                                                                            <span
                                                                                className={`flex pl-[8px] text-[16px] text-[#4d4d4d]`}>&#x2022; {item.locationName}
                                                                        </span>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={`tab-5`} className={`w-full h-[510px] overflow-y-scroll px-8`}>
                                        <div className={`text-[#484848]`}>
                                            <div className={`flex text-base items-center`}>
                                                <div
                                                    className={`rounded text-base bg-primaryColor text-white mr-4 p-[3px_10px] flex items-center`}>
                                                    <svg aria-hidden="true"
                                                         className="w-5 h-5 mr-1.5"
                                                         fill="currentColor" viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <title>Rating star</title>
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                        </path>
                                                    </svg>
                                                    <span>{coach?.avgOfGeneralRating ? coach?.avgOfGeneralRating : 0}</span>
                                                </div>
                                                <div className={`relative inline-flex items-center h-5 mr-1.5`}>
                                                    <AiFillStar className={`w-5 h-5 text-yellow-400`}/>
                                                    <AiFillStar className={`w-5 h-5 text-yellow-400`}/>
                                                    <AiFillStar className={`w-5 h-5 text-yellow-400`}/>
                                                    <AiFillStar className={`w-5 h-5 text-yellow-400`}/>
                                                    <AiFillStar className={`w-5 h-5 text-yellow-400`}/>
                                                </div>
                                                <span
                                                    className={`font-medium`}>&#x2022; {coach?.listReview?.length} đánh giá</span>
                                            </div>
                                            <section className={`flex flex-wrap my-2.5`}>
                                                <div className={`py-2 my-2.5 block w-1/3 float-left flex-[0_0_auto] relative min-h-[1px]`}>
                                                    <div className={`relative pt-[13px]`}>
                                                        <div className={`text-sm absolute top-0 font-normal`}>Tiện nghi & thoải mái</div>
                                                        <div className={`text-base flex items-baseline`}>
                                                            <div
                                                                className="w-[110px] bg-[#c0c0c0] relative rounded-[3px] h-[5px] mr-[27px]">
                                                                <div
                                                                    className="bg-primaryColor h-[5px] absolute top-0 left-0 rounded-[3px]"
                                                                    style={{width: `${coach?.avgOfComfortableRating ? coach?.avgOfComfortableRating : 0} / 5 * 100}%`}}></div>
                                                            </div>
                                                            <span className={`font-medium`}>{coach?.avgOfComfortableRating ? coach?.avgOfComfortableRating : 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`py-2 my-2.5 block w-1/3 float-left flex-[0_0_auto] relative min-h-[1px]`}>
                                                    <div className={`relative pt-[13px]`}>
                                                        <div className={`text-sm absolute top-0 font-normal`}>Thông tin đầy đủ</div>
                                                        <div className={`text-base flex items-baseline`}>
                                                            <div
                                                                className="w-[110px] bg-[#c0c0c0] relative rounded-[3px] h-[5px] mr-[27px]">
                                                                <div
                                                                    className="bg-primaryColor h-[5px] absolute top-0 left-0 rounded-[3px]"
                                                                    style={{width: `${coach?.avgOfFullInformationRating ? coach?.avgOfFullInformationRating : 0} / 5 * 100}%`}}></div>
                                                            </div>
                                                            <span className={`font-medium`}>{coach?.avgOfFullInformationRating ? coach?.avgOfFullInformationRating : 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`py-2 my-2.5 block w-1/3 float-left flex-[0_0_auto] relative min-h-[1px]`}>
                                                    <div className={`relative pt-[13px]`}>
                                                        <div className={`text-sm absolute top-0 font-normal`}>Thông tin chính xác</div>
                                                        <div className={`text-base flex items-baseline`}>
                                                            <div
                                                                className="w-[110px] bg-[#c0c0c0] relative rounded-[3px] h-[5px] mr-[27px]">
                                                                <div
                                                                    className="bg-primaryColor h-[5px] absolute top-0 left-0 rounded-[3px]"
                                                                    style={{width: `${coach?.avgOfVerifiedInformationRating ? coach?.avgOfVerifiedInformationRating : 0} / 5 * 100}%`}}></div>
                                                            </div>
                                                            <span className={`font-medium`}>{coach?.avgOfVerifiedInformationRating ? coach?.avgOfVerifiedInformationRating : 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`py-2 my-2.5 block w-1/3 float-left flex-[0_0_auto] relative min-h-[1px]`}>
                                                    <div className={`relative pt-[13px]`}>
                                                        <div className={`text-sm absolute top-0 font-normal`}>An toàn</div>
                                                        <div className={`text-base flex items-baseline`}>
                                                            <div
                                                                className="w-[110px] bg-[#c0c0c0] relative rounded-[3px] h-[5px] mr-[27px]">
                                                                <div
                                                                    className="bg-primaryColor h-[5px] absolute top-0 left-0 rounded-[3px]"
                                                                    style={{width: `${coach?.avgOfSafeRating ? coach?.avgOfSafeRating : 0} / 5 * 100}%`}}></div>
                                                            </div>
                                                            <span className={`font-medium`}>{coach?.avgOfSafeRating ? coach?.avgOfSafeRating : 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`py-2 my-2.5 block w-1/3 float-left flex-[0_0_auto] relative min-h-[1px]`}>
                                                    <div className={`relative pt-[13px]`}>
                                                        <div className={`text-sm absolute top-0 font-normal`}>Chất lượng dịch vụ</div>
                                                        <div className={`text-base flex items-baseline`}>
                                                            <div
                                                                className="w-[110px] bg-[#c0c0c0] relative rounded-[3px] h-[5px] mr-[27px]">
                                                                <div
                                                                    className="bg-primaryColor h-[5px] absolute top-0 left-0 rounded-[3px]"
                                                                    style={{width: `${coach?.avgOfServiceQualityRating ? coach?.avgOfServiceQualityRating : 0} / 5 * 100}%`}}></div>
                                                            </div>
                                                            <span className={`font-medium`}>{coach?.avgOfServiceQualityRating ? coach?.avgOfServiceQualityRating : 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`py-2 my-2.5 block w-1/3 float-left flex-[0_0_auto] relative min-h-[1px]`}>
                                                    <div className={`relative pt-[13px]`}>
                                                        <div className={`text-sm absolute top-0 font-normal`}>Thái độ nhân viên</div>
                                                        <div className={`text-base flex items-baseline`}>
                                                            <div
                                                                className="w-[110px] bg-[#c0c0c0] relative rounded-[3px] h-[5px] mr-[27px]">
                                                                <div
                                                                    className="bg-primaryColor h-[5px] absolute top-0 left-0 rounded-[3px]"
                                                                    style={{width: `${coach?.avgOfEmployeeAttitudeRating ? coach?.avgOfEmployeeAttitudeRating : 0} / 5 * 100}%`}}></div>
                                                            </div>
                                                            <span className={`font-medium`}>{coach?.avgOfEmployeeAttitudeRating ? coach?.avgOfEmployeeAttitudeRating : 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div className={`flex flex-row py-2.5 flex-wrap relative h-auto mx-0`}>
                                                <button
                                                    className={`text-sm mb-2.5 text-primaryColor border-[1px] border-primaryColor mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>Tất cả ({coach?.listReview?.length})</span>
                                                </button>
                                                <button
                                                    className={`text-sm mb-2.5 text-primaryColor border-[1px] border-primaryColor mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>Có nhận xét ({coach?.countOfReviewHaveComment})</span>
                                                </button>
                                                <button
                                                    className={`text-sm mb-2.5 text-[#000000a6] border-[1px] border-[#d9d9d9] mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>Có hình ảnh ({coach?.countOfReviewHaveImage})</span>
                                                </button>
                                                <button
                                                    className={`text-sm mb-2.5 text-[#000000a6] border-[1px] border-[#d9d9d9] mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>5</span>
                                                    <svg aria-hidden="true" className="w-5 h-5 mx-1"
                                                         fill="currentColor" viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <title>Rating star</title>
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                        </path>
                                                    </svg>
                                                    <span>({coach?.listReview.length})</span>
                                                </button>
                                                <button
                                                    className={`text-sm mb-2.5 text-[#000000a6] border-[1px] border-[#d9d9d9] mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>4</span>
                                                    <svg aria-hidden="true" className="w-5 h-5 mx-1"
                                                         fill="currentColor" viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <title>Rating star</title>
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                        </path>
                                                    </svg>
                                                    <span>({coach?.listReview.length})</span>
                                                </button>
                                                <button
                                                    className={`text-sm mb-2.5 text-[#000000a6] border-[1px] border-[#d9d9d9] mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>3</span>
                                                    <svg aria-hidden="true" className="w-5 h-5 mx-1"
                                                         fill="currentColor" viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <title>Rating star</title>
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                        </path>
                                                    </svg>
                                                    <span>({coach?.listReview.length})</span>
                                                </button>
                                                <button
                                                    className={`text-sm mb-2.5 text-[#000000a6] border-[1px] border-[#d9d9d9] mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>2</span>
                                                    <svg aria-hidden="true" className="w-5 h-5 mx-1"
                                                         fill="currentColor" viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <title>Rating star</title>
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                        </path>
                                                    </svg>
                                                    <span>({coach?.listReview.length})</span>
                                                </button>
                                                <button
                                                    className={`text-sm mb-2.5 text-[#000000a6] border-[1px] border-[#d9d9d9] mr-2.5 flex items-center h-9 text-center leading-6 relative font-normal whitespace-nowrap cursor-pointer px-4 rounded`}>
                                                    <span>1</span>
                                                    <svg aria-hidden="true" className="w-5 h-5 mx-1"
                                                         fill="currentColor" viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <title>Rating star</title>
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                        </path>
                                                    </svg>
                                                    <span>({coach?.listReview.length})</span>
                                                </button>
                                            </div>
                                            <div className={`mb-3`}>
                                                {
                                                    coach?.listReview.length > 0 && coach?.listReview.map((item, index) => {
                                                        if (item.comment !== "") {
                                                            return (
                                                                <div key={index} className={`pl-0`}>
                                                                    <div
                                                                        className={`pl-5 flex flex-1 flex-col p-[16px_20px_16px_0px] border-b-[1px] border-b-borderColor`}>
                                                                        <div className={`mb-2 flex items-center`}>
                                                                            <div
                                                                                className={`flex items-center justify-center w-10 h-10 mr-3 rounded-full ${randomColor()}`}>
                                                                                <div
                                                                                    className={`text-lg text-white relative flex justify-center`}>
                                                                                    ĐA
                                                                                </div>
                                                                            </div>
                                                                            <div className={`flex flex-col`}>
                                                                                <p className={`text-[#141414] text-base font-normal mb-0`}>Đức
                                                                                    Anh</p>
                                                                                <div className={`flex w-16`}>
                                                                                    {
                                                                                        parse(renderStar(item.generalRating))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className={`mb-2 flex items-center`}>
                                                                            <p className={`text-[#474747] font-normal text-sm mb-0`}>{item.comment}</p>
                                                                        </div>
                                                                        <div className={`mb-2 flex items-center`}>
                                                                            <div className={`w-full flex items-center`}>
                                                                                {
                                                                                    item?.reviewThumbnails?.length > 0 && item?.reviewThumbnails.map((thumbnail, index) => {
                                                                                        return (
                                                                                            <div key={index} className={`mr-2 last:mr-0`}>
                                                                                                <img className={`w-20 h-20 object-cover`} src={thumbnail.imagePath} alt={``}/>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className={`flex items-center`}>
                                                                            <p className={`text-[#b8b8b8] text-xs font-normal mb-0`}>Đăng ngày {moment(item.createdAt).format("DD/MM/YYYY")}</p>
                                                                            <div>
                                                                                <MdVerified className={`w-5 h-5 text-successColor mx-2`}/>
                                                                            </div>
                                                                            <p className={`text-successColor text-xs font-normal mb-0`}>Đã mua vé</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabsBody>
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};
const dataTab = [
    {
        label: "Hình ảnh",
        value: "tab-1",
    },
    {
        label: "Tiện ích",
        value: "tab-2",
    },
    {
        label: "Điểm đón trả",
        value: "tab-3",
    },
    {
        label: "Chính sách",
        value: "tab-4",
    },
    {
        label: "Đánh giá",
        value: "tab-5",
    },
]
const listRating = [
    {
        text: "An toàn",
        label: "safeRating"
    },
    {
        text: "Thông tin đầy đủ",
        label: "fullInformationRating"
    },
    {
        text: "Thông tin chính xác",
        label: "verifiedInformationRating"
    },
    {
        text: "Chất lượng dịch vụ",
        label: "serviceQualityRating"
    },
    {
        text: "Tiện nghi thoải mái",
        label: "comfortableRating"
    },
    {
        text: "Thái độ nhân viên",
        label: "employeeAttitudeRating"
    }
]

const randomColor = () => {
    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-400',
        'bg-purple-500',
        'bg-violet-600',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
    ];

    // Get a random index from the colors array
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the random color class
    return colors[randomIndex];
}
export default CoachModal;