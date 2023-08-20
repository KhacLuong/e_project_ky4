import React from 'react';
import styled from "styled-components";
import scenery_2 from "../../../assets/image/wallpaper/scenery_2.jpg"
import Booking from "../../../components/customer/Booking.jsx";
import ReactTyped from "react-typed";
const Banner = () => {
    const BannerLayout = styled.section`
      background-image: url(${scenery_2});
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
      z-index: 10;
      width: 100%;
      height: 60vh;
      position: relative;
    `
    const BannerOverlay = styled.div`
      background-color: transparent;
      opacity: 0.58;
      transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      z-index: 0;
      background-image: linear-gradient(90deg, #00000080 0%, #000000 42%);
    `
    return (
        <BannerLayout>
            <BannerOverlay/>
            <section data-aos="fade-down"
                     data-aos-delay={300}
                     className={`absolute w-full z-30 top-1/2 -translate-y-1/2 left-0 right-0`}>
                <div className={`max-w-7xl flex-col mx-auto relative`}>
                    <div className={`flex flex-wrap -mx-[15px]`}>
                        <div className={`shrink-0 grow-0 basis-full max-w-full relative w-full px-[15px]`}>
                            <div>
                                <h2 style={{
                                    backdropFilter: "blur(8.6px)",
                                    backgroundColor: "#FFFFFF2B",

                                }}
                                    className={`mb-0 inline-block font-bold text-gray-100 text-[30px] leading-tight px-[1rem] py-[0.5rem] rounded`}>

                                    <span className={`pr-0.5`}>Vexere - Cam kết hoàn 150% nếu nhà xe không giữ vé </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <Booking/>
                </div>
            </section>
        </BannerLayout>
    );
};

export default Banner;