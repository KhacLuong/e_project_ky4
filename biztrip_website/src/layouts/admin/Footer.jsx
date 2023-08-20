import React from 'react';
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter, AiOutlineGithub, AiOutlineLinkedin} from "react-icons/ai";

const Footer = () => {
    return (
        <footer
            className="p-6 my-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-200 md:flex md:items-center md:justify-between">
            <ul className="flex flex-wrap items-center mb-6 md:mb-0">
                <li>
                    <a href="#" className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6">Terms and
                        conditions</a>
                </li>
                <li>
                    <a href="#" className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6">Privacy
                        Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6">Cookie
                        Policy</a>
                </li>
                <li>
                    <a href="#" className="text-sm font-normal text-gray-500 hover:underline">Contact</a>
                </li>
            </ul>
            <div className="flex space-x-6 sm:justify-center">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                    <AiOutlineFacebook className={`w-5 h-5`}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                    <AiOutlineInstagram className={`w-5 h-5`}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                    <AiOutlineTwitter className={`w-5 h-5`}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                    <AiOutlineGithub className={`w-5 h-5`}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                    <AiOutlineLinkedin className={`w-5 h-5`}/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;