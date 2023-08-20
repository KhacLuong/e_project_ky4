import React, {useEffect, useState} from 'react';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {BsArrowRightShort} from "react-icons/bs";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useDispatch} from "react-redux";
import {fetchGetListSchedulePopular} from "../../../redux/slices/scheduleSlice.jsx";
import {handleConvertStringToSlug} from "../../../utils/helper.jsx";
import {useNavigate} from "react-router-dom";
import moment from "moment";

const PopularSchedule = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [listSchedule, setListSchedule] = useState([])

    useEffect(() => {
        const test = async () => {
            const res = await dispatch(fetchGetListSchedulePopular()).unwrap()
            if (res && res.code === 200) {
                setListSchedule(res.data)
            }
        }
        test()
    }, [])
    const handleGoBookingCoach = (e, item) => {
        e.preventDefault()
        const startDate = JSON.parse(localStorage.getItem('startDate')) || new Date()
        const convertDate = moment(startDate).format("DD-MM-YYYY")

        localStorage.setItem('schedule', JSON.stringify({
            departureId: item?.departure?.id,
            departureName: item?.departure?.name,
            destinationId: item?.destination?.id,
            destinationName: item?.destination?.name
        }));
        localStorage.setItem('startDate', JSON.stringify({
            startDate: startDate
        }))

        navigate(`/v1/danh-sach-xe/xe-tu-${handleConvertStringToSlug(item?.departure?.name)}-di-${handleConvertStringToSlug(item?.destination?.name)}-${item?.scheduleCode}?date=${convertDate}`,
            {
                state: {
                    scheduleId: item?.id,
                    departureId: item?.departure?.id,
                    departureName: item?.departure?.name,
                    destinationId: item?.destination?.id,
                    destinationName: item?.destination?.name
                }
            })

    }
    return (
        <section className={`w-full my-20`}>
            <div className={`flex flex-col items-center mx-auto relative`}>
                <div className={`max-w-7xl w-full whitespace-nowrap min-[768px]:mb-[2.5rem] mb-[1rem]`}>
                    <span
                        className={`uppercase my-0 mx-auto ml-0 before:content-[''] before:block before:border-b-0 before:border-t-[2px] before:border-t-primaryColor before:w-8 flex items-center before:mr-3 before:mb-1`}>
                         <p className={`text-[14px] leading-[1.2em] tracking-[1.5px] -mb-[10px] font-semibold pb-[15px]`}>
                             Tuyến đường phổ biến
                         </p>
                    </span>
                    <h2 className={`text-[36px] capitalize font-semibold leading-[1.5em] text-[#05162B]`}>Khám phá điểm
                        đến của bạn</h2>
                </div>
                <div
                    className={`h-[600px] w-full md:w-full min-h-[1px] bg-white group/popular-schedule overflow-hidden`}>
                    <Splide hasTrack={false}
                            options={{
                                type: 'loop',
                                lazyLoad: 'nearby',
                                perPage: 4,
                                cover: true,
                                perMove: 1,
                                autoplay: true,
                                rewind: true,
                                interval: 5000,
                                focus: 0,
                                omitEnd: true,
                                pagination: false,
                            }}>
                        <SplideTrack>
                            {
                                listSchedule.length > 0 && listSchedule.map((item, index) => {
                                    if (item.popular) {
                                        return (
                                            <SplideSlide key={item.id}>
                                                <div data-aos="fade-up"
                                                     data-aos-delay={index * 200}
                                                     className={`mx-4 h-[30rem] min-[1680px]:h-[34rem] shadow-md mb-6 relative`}>
                                                    <div className={`h-full`}>
                                                        <img src={item.imagePath} alt="image"
                                                             className={`object-cover h-full w-full`}/>
                                                    </div>
                                                    <div style={{
                                                        backdropFilter: "blur(8.6px)",
                                                        backgroundColor: "#FFFFFF2B",
                                                    }}
                                                         className={`py-2 px-4 h-24 absolute bottom-0 w-full flex justify-between items-center`}>
                                                        <div className={`text-white font-semibold flex items-center`}>
                                                            <svg className={`fill-white`}
                                                                 xmlns="http://www.w3.org/2000/svg" width="14" height="74"
                                                                 viewBox="0 0 14 74">
                                                                <path fill="#ffffff" stroke="#ffffff" strokeLinecap="round"
                                                                      strokeWidth="2" strokeDasharray="0 7"
                                                                      d="M7 13.5v46"></path>
                                                                <g fill="none" stroke="#ffffff" strokeWidth="3">
                                                                    <circle cx="7" cy="7" r="7" stroke="none"></circle>
                                                                    <circle cx="7" cy="7" r="5.5"></circle>
                                                                </g>
                                                                <path
                                                                    d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                                                                    fill="#ffffff"></path>
                                                            </svg>
                                                            <div className={`flex flex-col items-start justify-between ml-2.5 h-20`}>
                                                                <span>{item?.departure?.name}</span>
                                                                <span>{item?.destination?.name}</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`hover:bg-primaryColor hover:text-white border-[2px] border-white transition-all duration-300 bg-white px-[15px] py-[10px] leading-[1.5em] text-[13px] flex items-center cursor-pointer`}>
                                                            <button onClick={(e) => handleGoBookingCoach(e, item)} className={``}>Đặt vé ngay</button>
                                                            <BsArrowRightShort className={`w-5 h-5 `}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SplideSlide>
                                        )
                                    }
                                })
                            }
                        </SplideTrack>
                        <div className="splide__arrows">
                            <button
                                className="splide__arrow opacity-0 splide__arrow--prev rotate-180 ml-2 rounded text-lg -translate-x-[100px]  group-hover/popular-schedule:translate-x-[0px] group-hover/popular-schedule:opacity-100 duration-500 transition-all h-24 -translate-y-1/2 bg-[#ffffffbf]">
                                <IoIosArrowBack/></button>
                            <button
                                className="splide__arrow opacity-0 splide__arrow--next mr-2 rounded text-lg translate-x-[100px] group-hover/popular-schedule:translate-x-[0px] group-hover/popular-schedule:opacity-100 duration-500 transition-all h-24 -translate-y-1/2 bg-[#ffffffbf]">
                                <IoIosArrowForward/></button>
                        </div>
                    </Splide>
                </div>
            </div>
        </section>
    );
};

export default PopularSchedule;