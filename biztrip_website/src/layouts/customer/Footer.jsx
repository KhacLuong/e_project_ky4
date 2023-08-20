import React, {useContext} from 'react';
import {GiBookAura} from "react-icons/gi";
import {AiFillFacebook, AiOutlineTwitter, AiOutlineInstagram} from "react-icons/ai";
import {RiPinterestFill} from "react-icons/ri"
import footer_image from '../../assets/image/footer_img.png'
import mobile_store from '../../assets/image/mobile_store.png'
import {Link, useNavigate} from "react-router-dom";
import {BiPhoneCall} from "react-icons/bi";
import {Context} from "../../context/ContextProvider.jsx";

const Footer = () => {
    const mediaIcons = [AiFillFacebook, AiOutlineTwitter, AiOutlineInstagram, RiPinterestFill]
    const companyItems = ['About us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions', 'Contact Us', 'Support Center']
    const corporateItems = ['Become a Vendor', 'Affiliate Program', 'Our Suppliers', 'Accessibility', 'Promotions', 'Careers']
    const ourServiceItems = ['Help Center', 'Returns', 'Product', 'Recalls', 'Accessibility', 'Contact Us', 'Store Pickup']
    const navigate = useNavigate();
    const {openBookingNewTicketModal, openLoginModal, openModalCoach} = useContext(Context);
    return (
        <footer className={`block ${openBookingNewTicketModal || openLoginModal || openModalCoach ? 'pr-[0.4rem]' : ''}`}>
            <div className={`w-full`}>
                <div>
                    <section
                        className={`bg-gray-100 transition delay-0 ease-in-out duration-300 px-8 pt-20 pb-16 relative`}>
                        <div className={`max-w-7xl flex mx-auto relative`}>
                            <div className={`md:w-30 relative flex min-h-[1px]`}>
                                <div
                                    className={`border-r-[1px] border-borderColor mr-20 pr-4 flex relative w-full flex-wrap content-start`}>
                                    <div className={`pb-9`}>
                                        <Link to={``}>
                                            <span className={`text-3xl font-bold text-gray-800`}>BizTrip</span>
                                        </Link>
                                    </div>
                                    <div className={`text-darkColor w-full`}>
                                        <div className={`text-sm`}>
                                            <p className={`mb-4`}>1418 River Drive, Suite 35<br/>Cottonhall, CA 9622</p>
                                            <p className={`mb-4`}>Monday – Friday: 9:00-20:00<br/>Saturday: 11:00 –
                                                15:00</p>
                                        </div>
                                    </div>
                                    <div className={`w-full relative`}>
                                        <h2 className={`text-darkColor text-lg font-light leading-6`}>biztrip@gmail.com</h2>
                                    </div>
                                </div>
                            </div>
                            <div className={`md:w-15 relative min-h-[1px] flex`}>
                                <div className={`px-[15px] flex relative w-full flex-wrap content-start`}>
                                    <div className={`leading-6 pb-[15px]`}>
                                        <h2 className={`text-base font-semibold text-gray-800 leading-5 capitalize`}>Company</h2>
                                    </div>
                                    <div className={`w-full relative`}>
                                        <ul className={`list-none`}>
                                            {
                                                companyItems.map((item, index) => {
                                                    return (
                                                        <li key={`li-${index}`}
                                                            className={`flex content-center pb-[calc(6px/2)]`}>
                                                            <Link to={``}
                                                                  className={`footerTextHover`}>
                                                                <span>
                                                                     {item}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={`md:w-15 relative min-h-[1px] flex`}>
                                <div className={`px-[15px] flex relative w-full flex-wrap content-start`}>
                                    <div className={`leading-6 pb-[15px]`}>
                                        <h2 className={`text-gray-800 text-base font-semibold leading-5 capitalize`}>Our
                                            Service</h2>
                                    </div>
                                    <div className={`w-full relative`}>
                                        <ul className={`list-none`}>
                                            {
                                                ourServiceItems.map((item, index) => {
                                                    return (
                                                        <li key={`li-${index}`}
                                                            className={`flex content-center pb-[calc(6px/2)]`}>
                                                            <Link to={``}
                                                                  className={`footerTextHover`}>
                                                                <span>
                                                                     {item}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={`md:w-15 relative min-h-[1px] flex`}>
                                <div className={`px-[15px] flex relative w-full flex-wrap content-start`}>
                                    <div className={`leading-6 pb-[15px]`}>
                                        <h2 className={`text-gray-800 text-base font-semibold leading-5 capitalize`}>Corporate</h2>
                                    </div>
                                    <div className={`w-full relative`}>
                                        <ul className={`list-none`}>
                                            {
                                                corporateItems.map((item, index) => {
                                                    return (
                                                        <li key={`li-${index}`}
                                                            className={`flex content-center pb-[calc(6px/2)]`}>
                                                            <Link to={``}
                                                                  className={`footerTextHover`}>
                                                                <span>
                                                                     {item}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={`md:w-[24.704%] relative min-h-[1px] flex`}>
                                <div className={`pr-[15px] pl-10 flex relative w-full flex-wrap content-start`}>
                                    <div className={`pb-5 text-right w-full`}>
                                        <h2 className={`text-gray-700 text-base font-semibold leading-5 capitalize`}>Install
                                            app</h2>
                                    </div>
                                    <div className={`text-right text-sm w-full`}>
                                        <div className={`mb-2.5`}> From App Store or Google Play</div>
                                    </div>
                                    <div className={`text-right w-full`}>
                                        <div className={`mb-5`}>
                                            <img src={mobile_store} alt={`store`}
                                                 className={`align-middle inline-block h-auto max-w-full border-none`}/>
                                        </div>
                                    </div>
                                    <div className={`text-right w-full text-sm`}>
                                        <div className={`mb-2.5`}> Follow Us</div>
                                    </div>
                                    <div className={`text-right w-full relative`}>
                                        <div className={`overflow-hidden`}>
                                            <ul className={`mx-[calc(-9px/2)] justify-end flex flex-wrap list-none`}>
                                                {
                                                    mediaIcons.map((item, index) => {
                                                        const Item = item
                                                        return (
                                                            <li key={`li-${index}`}
                                                                className={`mx-[calc(9px/2)] break-words justify-end text-right items-center flex relative`}>
                                                                <Link to={``}
                                                                      className={`w-full flex items-center hover:text-primaryColor_hover duration-300 text-lightColor`}>
                                                                    <Item className={`w-6 h-6`}/>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        className={`bg-gray-100 border-[1px] border-borderColor transition delay-0 ease-in-out duration-300 py-[45px] px-8`}>
                        <div className={`max-w-7xl flex mx-auto relative`}>
                            <div className={`md:w-1/3 relative min-h-[1px] flex`}>
                                <div className={`items-center flex content-center relative w-full flex-wrap`}>
                                    <div className={`text-darkColor text-sm w-full relative`}>
                                        Copyright © 2023 <Link to={``} className={`text-primaryColor`}>BizTrip</Link>.
                                        All rights reserved.
                                    </div>
                                </div>
                            </div>
                            <div className={`md:w-1/3 relative min-h-[1px] flex`}>
                                <div className={`items-center flex content-center relative w-full flex-wrap`}>
                                    <div className={`w-full relative`}>
                                        <Link to={``} className={`flex items-center justify-center`}>
                                            <span>
                                                <BiPhoneCall className={`w-6 h-6`}/>
                                            </span>
                                            <span className={`pl-2.5`}>
                                                Hotline: <strong className={`text-primaryColor`}>+1 840 - 841 25 69</strong>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={`md:w-1/3 relative min-h-[1px] flex`}>
                                <div className={`items-center flex content-center relative w-full flex-wrap`}>
                                    <div className={`w-full relative text-right`}>
                                        <img src={footer_image} alt={`bank`} className={`align-middle inline-block`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    );
};

export default Footer;