import React from 'react';
import {FaEnvira, FaVirusCovid} from "react-icons/fa6";
import {MdAirlineSeatReclineExtra} from "react-icons/md";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {BsTicketPerforated} from "react-icons/bs";
import {GrTag} from "react-icons/gr";
import {PiSealCheckBold} from "react-icons/pi";
import {GiPriceTag} from "react-icons/gi";

const InfoArea = () => {
    return (
        <section data-aos="fade-up"
                 data-aos-delay={300}
                 className={`relative z-[1] pb-[40px] pt-[140px] bg-[#F5F7FC] text-center block before:content-[''] before:opacity-[0.2] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-[1] before:bg-[url('/src/assets/image/color-bg.png')]`}>
            <div
                className={`xl:max-w-[1200px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full px-[15px] mx-auto`}>
                <div className={`flex flex-wrap -mx-[15px]`}>
                    <div className={`lg:grow-0 lg:shrink-0 lg:basis-1/4 lg:max-w-1/4 relative w-full px-[15px]`}>
                        <div className={`mb-[30px] relative z-[1] group/icon-box`}>
                            <div
                                className={`relative w-[80px] h-[80px] leading-[80px] text-center mx-auto text-warningColor transition-all duration-300 text-[40px] group-hover/icon-box:scale-[1.1] flex justify-center`}>
                                <i>
                                    <BsTicketPerforated/>
                                </i>
                            </div>
                            <div className={`pt-0`}>
                                <h4 className={`text-[#0d233e] mb-[13px] font-bold text-[16px] leading-tight`}>Đặt vé dễ
                                    dàng</h4>
                                <p className={``}>Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.</p>
                            </div>
                        </div>
                    </div>
                    <div className={`lg:grow-0 lg:shrink-0 lg:basis-1/4 lg:max-w-1/4 relative w-full px-[15px]`}>
                        <div className={`mb-[30px] relative z-[1] group/icon-box`}>
                            <div
                                className={`relative w-[80px] h-[80px] leading-[80px] text-center mx-auto text-successColor transition-all duration-300 text-[40px] group-hover/icon-box:scale-[1.1] flex justify-center`}>
                                <i>
                                    <PiSealCheckBold/>
                                </i>
                            </div>
                            <div className={`pt-0`}>
                                <h4 className={`text-[#0d233e] mb-[13px] font-bold text-[16px] leading-tight`}>
                                    Đảm bảo có vé
                                </h4>
                                <p className={``}>
                                    Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`lg:grow-0 lg:shrink-0 lg:basis-1/4 lg:max-w-1/4 relative w-full px-[15px]`}>
                        <div className={`mb-[30px] relative z-[1] group/icon-box`}>
                            <div
                                className={`relative w-[80px] h-[80px] leading-[80px] text-center mx-auto text-primaryColor transition-all duration-300 text-[40px] group-hover/icon-box:scale-[1.1] flex justify-center`}>
                                <i>
                                    <HiOutlineLocationMarker/>
                                </i>
                            </div>
                            <div className={`pt-0`}>
                                <h4 className={`text-[#0d233e] mb-[13px] font-bold text-[16px] leading-tight`}>
                                    Mạng lưới xe khách lớn nhất Việt Nam</h4>
                                <p className={``}>
                                    Chọn từ hơn 500 điểm đến du lịch tại 63 tỉnh thành.</p>
                            </div>
                        </div>
                    </div>
                    <div className={`lg:grow-0 lg:shrink-0 lg:basis-1/4 lg:max-w-1/4 relative w-full px-[15px]`}>
                        <div className={`mb-[30px] relative z-[1] group/icon-box`}>
                            <div
                                className={`relative w-[80px] h-[80px] leading-[80px] text-center mx-auto text-dangerColor-default_2 transition-all duration-300 text-[40px] group-hover/icon-box:scale-[1.1] flex justify-center`}>
                                <i>
                                    <GiPriceTag/>
                                </i>
                            </div>
                            <div className={`pt-0`}>
                                <h4 className={`text-[#0d233e] mb-[13px] font-bold text-[16px] leading-tight`}>
                                    Nhiều ưu đãi</h4>
                                <p className={``}>
                                    Hàng ngàn ưu đãi cực chất độc quyền tại BizTrip.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoArea;