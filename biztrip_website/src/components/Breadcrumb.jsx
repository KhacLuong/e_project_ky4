import React from 'react';
import {Link} from "react-router-dom";
import {RiArrowRightSLine} from "react-icons/ri";
import {AiOutlineHome} from "react-icons/ai";

const Breadcrumb = ({dataBreadcrumb}) => {
    return (
        <nav className={`flex w-full mb-5`}>
            <ol className={`inline-flex items-center space-x-1 md:space-x-2`}>
                {
                    dataBreadcrumb.map((item, index) => {
                        return (
                            <li key={`breadcrumb-${index}`} className={index === 0 ? 'inline-flex items-center' : ''}>
                                {
                                    index === 0 ?
                                        <Link to={item?.path} state={item?.data}
                                              className={`inline-flex items-center text-primaryColor hover:text-primaryColor_hover font-semibold`}>
                                            <AiOutlineHome className={`w-5 h-5 mr-2 mb-1`}/>
                                            {item.name}
                                        </Link> :
                                        <div className={`flex items-center`}>
                                            <RiArrowRightSLine className={`w-6 h-6 text-gray-400`}/>
                                            {
                                                index + 1 === dataBreadcrumb.length ?
                                                    <span
                                                        className="ml-1 text-[0.95rem] font-medium text-gray-600 md:ml-2">{item.name}</span> :
                                                    <Link to={item?.path} state={item?.data}
                                                          className={`ml-1 text-[0.95rem] font-medium text-primaryColor hover:text-primaryColor_hover md:ml-2`}>{item.name}</Link>
                                            }
                                        </div>
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    );
};

export default Breadcrumb;