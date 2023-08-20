import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md"
import {HiOutlineArrowNarrowRight} from "react-icons/hi";
import {useDispatch} from "react-redux";

const Paginate = ({
                      sortField,
                      sortDir,
                      fetchData,
                      totalPages,
                      perPage,
                      totalItems,
                      setPageNumber,
                      firstItemPerPage,
                      setFirstItemPerPage,
                      lastItemPerPage,
                      setLastItemPerPage,
                      pageNumber
                  }) => {
    const dispatch = useDispatch()
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)

    useEffect(() => {
        setFirstItemPerPage(perPage * (pageNumber - 1) + 1)
        if (pageNumber === totalPages) {
            setLastItemPerPage(totalItems)
        } else {
            const lastItemPerPage = perPage * pageNumber
            setLastItemPerPage(lastItemPerPage)
        }
    }, [perPage, pageNumber, totalPages])
    const handleClickToPage = (event) => {
        const keyword = ""
        const pageNumber = +event.selected + 1
        setPageNumber(pageNumber)
        dispatch(fetchData({pageNumber, perPage, sortField, sortDir, keyword}))
        if ((+event.selected + 1) === totalPages) {
            setTurnOffPrevNextBtn(true)
            setLastItemPerPage(totalItems)
        }
    }
    return (
        <div
            className={`items-center p-4 my-4 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-200 sm:flex sm:justify-between`}>
            <div className={`flex items-center mb-4 sm:mb-0`}>
                {
                    firstItemPerPage === totalItems
                        ? <span className={`text-sm font-normal text-gray-500 flex`}>
                            Hiển thị từ
                            <span className={`font-semibold text-gray-900 mx-1`}>{firstItemPerPage}/{totalItems}</span>
                            kết quả
                        </span>
                        : <span className={`text-sm font-normal text-gray-500 flex`}>
                            Hiển thị từ
                            <span
                                className={`font-semibold text-gray-900 flex items-center mx-1`}>{firstItemPerPage}
                                <HiOutlineArrowNarrowRight className={`mx-1`}/>
                                {totalItems <= perPage ? totalItems : lastItemPerPage}
                            </span>
                            /
                            <span className={`font-semibold text-gray-900 mx-1`}>{totalItems}</span> kết quả
                </span>
                }

            </div>
            <ReactPaginate pageCount={totalPages}
                           nextLabel={<div className={`flex items-center`}>Sau <MdKeyboardArrowRight
                               className={`w-5 h-5 ml-2`}/></div>}
                           previousLabel={<div className={`flex items-center`}><MdOutlineKeyboardArrowLeft
                               className={`w-5 h-5 mr-2`}/> Trước</div>}
                           onPageChange={handleClickToPage}
                           pageRangeDisplayed={3}
                           marginPagesDisplayed={2}
                           pageClassName="pageClassName"
                           pageLinkClassName="pageLinkClassName font-medium"
                           previousClassName="previousClassName"
                           previousLinkClassName="previousLinkClassName font-medium"
                           nextClassName="nextClassName"
                           nextLinkClassName="nextLinkClassName font-medium"
                           breakLabel="..."
                           breakClassName="breakLinkClassName text-xl font-medium"
                           containerClassName="flex items-center justify-center inline-flex -space-x-px"
                           activeLinkClassName="text-white bg-primaryColor"
                           renderOnZeroPageCount={null}
                           disabledClassName={turnOffPrevNextBtn ? 'hidden' : ''}
                           disabledLinkClassName={turnOffPrevNextBtn ? 'hidden' : ''}
            />
        </div>
    );
};

export default Paginate;