import React from 'react';
import image_news from "../../../assets/image/news/img_hero.png"
import {MdCalendarMonth, MdOutlinePersonOutline} from "react-icons/md";

const News = () => {
    return (
        <section className={`w-full my-20`}>
            <div className={`flex max-w-7xl flex-col items-center mx-auto relative`}>
                <div data-aos="fade-up"
                     data-aos-delay={500} className={`w-full whitespace-nowrap min-[768px]:mb-[2.5rem] mb-[1rem]`}>
                    <span
                        className={`uppercase my-0 mx-auto ml-0 before:content-[''] before:block before:border-b-0 before:border-t-[2px] before:border-t-primaryColor before:w-8 flex items-center before:mr-3 before:mb-1`}>
                         <p className={`text-[14px] leading-[1.2em] tracking-[1.5px] -mb-[10px] font-semibold pb-[15px]`}>
                             Tin tức
                         </p>
                    </span>
                    <h2 className={`text-[36px] capitalize font-semibold leading-[1.5em] text-[#05162B]`}>
                        Bài báo & Blog mới nhất.</h2>
                </div>
                <div data-aos="fade-up"
                     data-aos-delay={700}
                     className={`flex flex-wrap mt-[calc(-1*0)] mx-[calc(-1*30px)]`}>
                    <div
                        className={`mb-0 grow-0 shrink-0 basis-auto xl:w-1/4 min-[992px]:w-1/3 md:w-1/2 max-w-full mt-0 px-[calc(30px*0.5)] group/news`}>
                        <div className={`rounded-lg relative w-full p-[0.5rem] shadow-lg flex flex-col min-w-0 `}>
                            <div className={`overflow-hidden rounded relative cursor-pointer`}>
                                <div
                                    className={`transition-all duration-300 pb-[calc(0.715*100%)] relative overflow-hidden top-0 left-0 right-0 bottom-0 w-full`}>
                                    <img alt={``} src={image_news}
                                         className={`object-cover h-full absolute top-0 left-0 scale-[1.01] align-middle block w-full max-h-none max-w-none transition-all duration-300 rounded group-hover/news:scale-[1.05]`}/>
                                </div>
                                <div
                                    className={`bg-black absolute w-full h-full top-0 left-0 invisible opacity-0 group-hover/news:opacity-40 group-hover/news:visible transition-all duration-500`}></div>
                                <div
                                    className={`translate-y-[50px] absolute bottom-0 left-0 rounded-md py-[0.7em] px-[1.5em] bg-primaryColor_hover ml-[1rem] mr-[1rem] mb-[1rem] inline-block text-[0.75em] font-bold leading-none text-white whitespace-nowrap align-baseline invisible opacity-0 group-hover/news:opacity-100 group-hover/news:visible group-hover/news:translate-y-[0px] transition-all duration-500`}>
                                    <span className={`text-[0.875rem] text-white font-medium`}>Tin tức</span>
                                </div>
                            </div>
                            <div className={`relative min-h-[1px] pt-[1rem] px-[0.5rem]`}>
                                <ul className={`cursor-pointer -mx-[0.75rem] mb-[0.75rem] flex flex-wrap`}>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdOutlinePersonOutline className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>Đức Anh</div>
                                        </a>
                                    </li>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdCalendarMonth className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>06 Tháng 1, 2023</div>
                                        </a>
                                    </li>
                                </ul>
                                <a className={`block cursor-pointer`}>
                                    <h5 className={`line-clamp-3 leading-normal text-[1.1rem] mb-[0.9rem] font-medium text-[#2f2d51]`}>BizTrip
                                        - G8 Open Tour đồng hành cùng chương trình Tết Đong Đầy, Trao Yêu Thương
                                        2023.</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`mb-0 grow-0 shrink-0 basis-auto xl:w-1/4 min-[992px]:w-1/3 md:w-1/2 max-w-full mt-0 px-[calc(30px*0.5)] group/news`}>
                        <div className={`rounded-lg relative w-full p-[0.5rem] shadow-lg flex flex-col min-w-0 `}>
                            <div className={`overflow-hidden rounded relative cursor-pointer`}>
                                <div
                                    className={`transition-all duration-300 pb-[calc(0.715*100%)] relative overflow-hidden top-0 left-0 right-0 bottom-0 w-full`}>
                                    <img alt={``} src={image_news}
                                         className={`object-cover h-full absolute top-0 left-0 scale-[1.01] align-middle block w-full max-h-none max-w-none transition-all duration-300 rounded group-hover/news:scale-[1.05]`}/>
                                </div>
                                <div
                                    className={`bg-black absolute w-full h-full top-0 left-0 invisible opacity-0 group-hover/news:opacity-40 group-hover/news:visible transition-all duration-500`}></div>
                                <div
                                    className={`translate-y-[50px] absolute bottom-0 left-0 rounded-md py-[0.7em] px-[1.5em] bg-primaryColor_hover ml-[1rem] mr-[1rem] mb-[1rem] inline-block text-[0.75em] font-bold leading-none text-white whitespace-nowrap align-baseline invisible opacity-0 group-hover/news:opacity-100 group-hover/news:visible group-hover/news:translate-y-[0px] transition-all duration-500`}>
                                    <span className={`text-[0.875rem] text-white font-medium`}>Blog</span>
                                </div>
                            </div>
                            <div className={`relative min-h-[1px] pt-[1rem] px-[0.5rem]`}>
                                <ul className={`cursor-pointer -mx-[0.75rem] mb-[0.75rem] flex flex-wrap`}>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdOutlinePersonOutline className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>Đức Anh</div>
                                        </a>
                                    </li>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdCalendarMonth className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>06 Tháng 1, 2023</div>
                                        </a>
                                    </li>
                                </ul>
                                <a className={`block cursor-pointer`}>
                                    <h5 className={`line-clamp-3 leading-normal text-[1.1rem] mb-[0.9rem] font-medium text-[#2f2d51]`}>BizTrip
                                        - G8 Open Tour đồng hành cùng chương trình Tết Đong Đầy, Trao Yêu Thương
                                        2023.</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`mb-0 grow-0 shrink-0 basis-auto xl:w-1/4 min-[992px]:w-1/3 md:w-1/2 max-w-full mt-0 px-[calc(30px*0.5)] group/news`}>
                        <div className={`rounded-lg relative w-full p-[0.5rem] shadow-lg flex flex-col min-w-0 `}>
                            <div className={`overflow-hidden rounded relative cursor-pointer`}>
                                <div
                                    className={`transition-all duration-300 pb-[calc(0.715*100%)] relative overflow-hidden top-0 left-0 right-0 bottom-0 w-full`}>
                                    <img alt={``} src={image_news}
                                         className={`object-cover h-full absolute top-0 left-0 scale-[1.01] align-middle block w-full max-h-none max-w-none transition-all duration-300 rounded group-hover/news:scale-[1.05]`}/>
                                </div>
                                <div
                                    className={`bg-black absolute w-full h-full top-0 left-0 invisible opacity-0 group-hover/news:opacity-40 group-hover/news:visible transition-all duration-500`}></div>
                                <div
                                    className={`translate-y-[50px] absolute bottom-0 left-0 rounded-md py-[0.7em] px-[1.5em] bg-primaryColor_hover ml-[1rem] mr-[1rem] mb-[1rem] inline-block text-[0.75em] font-bold leading-none text-white whitespace-nowrap align-baseline invisible opacity-0 group-hover/news:opacity-100 group-hover/news:visible group-hover/news:translate-y-[0px] transition-all duration-500`}>
                                    <span className={`text-[0.875rem] text-white font-medium`}>Tin tức</span>
                                </div>
                            </div>
                            <div className={`relative min-h-[1px] pt-[1rem] px-[0.5rem]`}>
                                <ul className={`cursor-pointer -mx-[0.75rem] mb-[0.75rem] flex flex-wrap`}>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdOutlinePersonOutline className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>Đức Anh</div>
                                        </a>
                                    </li>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdCalendarMonth className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>06 Tháng 1, 2023</div>
                                        </a>
                                    </li>
                                </ul>
                                <a className={`block cursor-pointer`}>
                                    <h5 className={`line-clamp-3 leading-normal text-[1.1rem] mb-[0.9rem] font-medium text-[#2f2d51]`}>BizTrip
                                        - G8 Open Tour đồng hành cùng chương trình Tết Đong Đầy, Trao Yêu Thương
                                        2023.</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`mb-0 grow-0 shrink-0 basis-auto xl:w-1/4 min-[992px]:w-1/3 md:w-1/2 max-w-full mt-0 px-[calc(30px*0.5)] group/news`}>
                        <div className={`rounded-lg relative w-full p-[0.5rem] shadow-lg flex flex-col min-w-0 `}>
                            <div className={`overflow-hidden rounded relative cursor-pointer`}>
                                <div
                                    className={`transition-all duration-300 pb-[calc(0.715*100%)] relative overflow-hidden top-0 left-0 right-0 bottom-0 w-full`}>
                                    <img alt={``} src={image_news}
                                         className={`object-cover h-full absolute top-0 left-0 scale-[1.01] align-middle block w-full max-h-none max-w-none transition-all duration-300 rounded group-hover/news:scale-[1.05]`}/>
                                </div>
                                <div
                                    className={`bg-black absolute w-full h-full top-0 left-0 invisible opacity-0 group-hover/news:opacity-40 group-hover/news:visible transition-all duration-500`}></div>
                                <div
                                    className={`translate-y-[50px] absolute bottom-0 left-0 rounded-md py-[0.7em] px-[1.5em] bg-primaryColor_hover ml-[1rem] mr-[1rem] mb-[1rem] inline-block text-[0.75em] font-bold leading-none text-white whitespace-nowrap align-baseline invisible opacity-0 group-hover/news:opacity-100 group-hover/news:visible group-hover/news:translate-y-[0px] transition-all duration-500`}>
                                    <span className={`text-[0.875rem] text-white font-medium`}>Blog</span>
                                </div>
                            </div>
                            <div className={`relative min-h-[1px] pt-[1rem] px-[0.5rem]`}>
                                <ul className={`cursor-pointer -mx-[0.75rem] mb-[0.75rem] flex flex-wrap`}>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdOutlinePersonOutline className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>Đức Anh</div>
                                        </a>
                                    </li>
                                    <li className={`px-[0.75rem]`}>
                                        <a className={`text-[#77838f] flex items-center`}>
                                            <div className={`mr-[0.5rem] flex`}>
                                                <MdCalendarMonth className={`w-5 h-5`}/>
                                            </div>
                                            <div className={`text-[0.875rem]`}>06 Tháng 1, 2023</div>
                                        </a>
                                    </li>
                                </ul>
                                <a className={`block cursor-pointer`}>
                                    <h5 className={`line-clamp-3 leading-normal text-[1.1rem] mb-[0.9rem] font-medium text-[#2f2d51]`}>BizTrip
                                        - G8 Open Tour đồng hành cùng chương trình Tết Đong Đầy, Trao Yêu Thương
                                        2023.</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;