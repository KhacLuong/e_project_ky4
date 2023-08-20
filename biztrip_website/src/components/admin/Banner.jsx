import React from 'react';
import {BiPlus} from "react-icons/bi";
import Breadcrumb from "../Breadcrumb.jsx";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

const Banner = ({dataBreadcrumb, title, pathCreate, fetchData, pageNumber, perPage, sortField, sortDir, setKeyword, keyword}) => {
    const dispatch = useDispatch()
    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(fetchData({pageNumber, perPage, sortField, sortDir, keyword}))
    }
    const handleReset = (e) => {
        e.preventDefault()
        const keyword = ""
        setKeyword(keyword)
        dispatch(fetchData({pageNumber, perPage, sortField, sortDir, keyword}))
    }

    return (
        <div
            className={`block justify-between items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex`}
            data-aos="fade-right"
            data-aos-delay="100">
            <div className={`mb-1 w-full`}>
                <div className={`mb-4`}>
                    <Breadcrumb dataBreadcrumb={dataBreadcrumb}/>
                    <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{title}</h1>
                </div>
                <div className={`sm:flex`}>
                    {
                        setKeyword && (
                            <div className={`items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0`}>
                                <form className={`lg:pr-3 flex items-center`}>
                                    <label htmlFor={`user-search`} className={`sr-only`}>Search</label>
                                    <div className={`relative lg:w-64 xl:w-96`}>
                                        <input onChange={(e) => setKeyword(e.target.value)}
                                               value={keyword}
                                               type={`text`} id={`user-search`}
                                               className={`border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-neutral-50 focus:border-neutral-600 block w-full p-2.5`}
                                               placeholder={`Tìm kiếm...`}/>
                                    </div>
                                    <div className={`flex items-center ml-2 `}>
                                        <div className={`h-max`}>
                                            <button onClick={handleSearch} className={`inline-flex items-center py-2 px-3 mr-2 text-sm font-medium text-center text-white rounded-lg bg-primaryColor hover:bg-primaryColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>Tìm kiếm</button>
                                            <button onClick={handleReset} className={`${keyword === "" ? 'pointer-events-none bg-gray-100 text-gray-400' : 'bg-dangerColor-default_2 hover:bg-dangerColor-hover_2 text-white'} inline-flex items-center py-2 px-3 text-sm font-medium text-center rounded-lg sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>Hủy</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                    <div className={`flex items-center space-x-2 sm:space-x-3 ${setKeyword ? 'ml-auto' : ''}`}>
                        {
                            pathCreate ?
                                <Link to={pathCreate}
                                      className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                    <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                    Thêm mới
                                </Link> :
                                <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;