import React from 'react';
import imgSubscribe from '../../../assets/image/svg/subscribe.svg'
import {HiOutlineMail} from "react-icons/hi";
import {MdSecurity} from "react-icons/md";

const Subscribe = () => {
    return (
        <section className={`relative bg-cover py-[60px] bg-[#0d233e] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:opacity-20 before:bg-transparent before:bg-[url('/src/assets/image/svg/subscribe.svg')] before:bg-center before:bg-repeat`}>
            <div className={`min-[1200px]:max-w-[1200px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] max-w-[1200px] w-full mx-auto px-[15px]`}>
                <div className={`items-center flex flex-wrap -mx-[15px]`}>
                    <div className={`min-[992px]:max-w-[58.333333%] min-[992px]:shrink-0 min-[992px]:grow-0 min-[992px]:basis-[58.333333%] relative w-full px-[15px]`}>
                        <div>
                            <h2 className={`text-[30px] font-semibold text-white`}>Đăng ký để nhận những ưu đãi mới nhất </h2>
                        </div>
                    </div>
                    <div className={`min-[992px]:max-w-[41.666667%] min-[992px]:shrink-0 min-[992px]:grow-0 min-[992px]:basis-[41.666667% relative w-full px-[15px]`}>
                        <div>
                            <form action={`#`}>
                                <div>
                                    <label htmlFor={`email`} className={`text-[14px] text-white inline-block mb-[0.5rem]`}>Email</label>
                                    <div className={`mb-0`}>
                                        <span className={`absolute top-1/2 -translate-y-1/2 left-[25px] text-[#5d646d] text-[18px] z-[2] `}>
                                            <HiOutlineMail className={`w-5 h-5`}/>
                                        </span>
                                        <input id={`email`} type={`email`} name={`email`} placeholder={`Địa chỉ Email`} className={`h-auto py-[12px] pr-[120px] pl-[40px] text-[14px] text-[#0d233e] border-[1px] border-[#80899633] transition-all duration-300 bg-white shadow-none block w-full font-normal rounded visible relative`}/>
                                        <button type={`submit`} className={`absolute top-1/2 -translate-y-1/2 right-[25px] cursor-pointer leading-[35px] px-[15px] text-[15px] text-white bg-primaryColor transition-all duration-300 inline-block font-medium rounded hover:bg-white hover:text-primaryColor border-primaryColor border-[1px]`}>Đăng ký</button>
                                        <span className={`text-[14px] pt-[0.25rem] mt-2 flex items-center`}>
                                            <MdSecurity className={`w-5 h-5 mr-2 text-[#ffffff80]`}/>
                                            <span className={`text-[#ffffff80] mr-1`}>
                                                Đừng lo lắng, thông tin của bạn được chúng tôi bảo mật an toàn
                                            </span>
                                            <span className={``}>&#128512;</span>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;