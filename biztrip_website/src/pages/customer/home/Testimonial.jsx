import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchAllTestimonial} from "../../../redux/slices/testimonialSlice.jsx";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import {FaStar} from "react-icons/fa6";

const Testimonial = () => {
    const dispatch = useDispatch()
    const [testimonials, setTestimonials] = useState([])
    useEffect(() => {
        const test = async () => {
            await handleGetListTestimonial()
        }
        test()
    }, [])
    const handleGetListTestimonial = async () => {
        const pageNumber = 1
        const perPage = 100
        const sortField = ''
        const sortDir = ''
        const keyword = ''
        const res = await dispatch(fetchAllTestimonial({pageNumber, perPage, sortField, sortDir, keyword})).unwrap()
        if (res && res.code === 200) {
            setTestimonials(res.data)
        } else {
            setTestimonials([])
        }
    }
    return (
        <>
            <section
                className={`bg-[url('/src/assets/image/du-lich.jpg')] bg-fixed bg-center bg-no-repeat bg-cover pt-[100px] px-0 pb-[150px] relative`}>
                <div className={`bg-black opacity-60 absolute w-full h-full top-0 left-0`}></div>
                <div className={`max-w-[1200px] flex mx-auto relative`}>
                    <div className={`w-full relative min-h-[1px] flex`}>
                        <div
                            className={`content-center items-center justify-center p-[10px] flex relative w-full flex-wrap`}>
                            <div data-aos="fade-up"
                                 data-aos-delay={1000}
                                 className={`text-center justify-center mb-[20px] w-full uppercase before:content-[''] before:block before:border-b-0 before:border-t-[2px] before:border-t-primaryColor_hover before:w-8 flex items-center before:mr-3 before:mb-2`}>
                                <p className={`text-[18px] leading-[1.2em] tracking-[1.5px] -mb-[10px] font-semibold text-white pb-[15px] capitalize`}>Đánh
                                    giá về chúng tôi</p>
                            </div>
                            <div data-aos="fade-down"
                                 data-aos-delay={100} className={`mb-[20px] w-full`}>
                                <h2 className={`mb-[10px] text-[36px] capitalize font-semibold leading-[1.5em] text-white text-center`}>Khách
                                    hàng đã nói gì</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`-mt-[120px] mb-0 bg-[#F5F7FC]`}>
                <div className={`max-w-[1200px] flex mx-auto relative`}>
                    <div className={`w-full relative min-h-[1px] flex`}>
                        <div className={`p-0 flex relative w-full flex-wrap content-start`}>
                            <div className={`w-full relative`}>
                                <Splide hasTrack={false}
                                        options={{
                                            type: 'loop',
                                            lazyLoad: 'nearby',
                                            perPage: 3,
                                            perMove: 1,
                                            autoplay: true,
                                            interval: 5000,
                                            focus: 0,
                                            omitEnd: true,
                                            pagination: false,
                                            arrows: false,
                                            cover: true,
                                        }}>
                                    <SplideTrack>
                                        {
                                            testimonials.length > 0 && testimonials.map((item, index) => {
                                                if (item.hot === true && item.status === true) {
                                                    return (
                                                        <SplideSlide data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                                                                     data-aos-delay={100} key={index}>
                                                            <div
                                                                className={`bg-white mt-0 mx-[10px] mb-[15px] pt-0 pb-[35px] px-[35px] rounded-xl shadow-lg overflow-hidden relative h-[400px] flex flex-col justify-between`}>
                                                                <div className={`relative my-[30px] z-[2]`}>
                                                                    <p title={item.content}
                                                                       className={`text-[16px] text-black leading-[1.5em] font-medium line-clamp-6`}>
                                                                        {item.content}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <div
                                                                        className={`flex items-center justify-between text-[16px]`}>
                                                                        <ul className={`-mt-[10px] mx-0 mb-[15px] relative z-[2]`}>
                                                                            <li className={`text-warningColor mr-[5px] inline-block`}>
                                                                                <i><FaStar/></i>
                                                                            </li>
                                                                            <li className={`text-warningColor mr-[5px] inline-block`}>
                                                                                <i><FaStar/></i>
                                                                            </li>
                                                                            <li className={`text-warningColor mr-[5px] inline-block`}>
                                                                                <i><FaStar/></i>
                                                                            </li>
                                                                            <li className={`text-warningColor mr-[5px] inline-block`}>
                                                                                <i><FaStar/></i>
                                                                            </li>
                                                                            <li className={`text-warningColor mr-[5px] inline-block`}>
                                                                                <i><FaStar/></i>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div
                                                                        className={`flex justify-between relative z-[2] text-[16px] whitespace-normal`}>
                                                                        <div
                                                                            className={`items-center flex justify-between`}>
                                                                            <div className={`inline-flex`}>
                                                                                <img src={item.avatarPath}
                                                                                     alt={item.fullName}
                                                                                     className={`w-[100px] mr-[20px] mb-0 max-w-full aspect-square object-cover object-center-top`}/>
                                                                            </div>
                                                                            <span className={`text-left`}>
                                                                            <strong
                                                                                className={`text-black text-[18px] font-semibold leading-[1.2em] block`}>{item.fullName}</strong>
                                                                            <p className={`text-[#A1A1A1] text-[12px] leading-[1.5em]`}>{item.job}</p>
                                                                        </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SplideSlide>
                                                    )
                                                }
                                            })
                                        }
                                    </SplideTrack>
                                </Splide>
                            </div>
                        </div>
                    </div>
                </div>
                <svg className="hero-svg fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10"
                     preserveAspectRatio="none">
                    <path d="M0 10 0 0 A 90 59, 0, 0, 0, 100 0 L 100 10 Z"></path>
                </svg>
            </section>
        </>
    );
};

export default Testimonial;