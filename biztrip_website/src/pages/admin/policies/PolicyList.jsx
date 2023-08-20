import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";

const PolicyList = () => {
    useDocumentTitle("Quản lý chính sách", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Tiêu đề', 'Nội dung', 'Lưu ý', 'Vị trí', 'Ngày thêm vào', 'Ngày cập nhật', 'Action'
    ]
    const tbodyAction = ['edit', 'delete']
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý chính sách",
            path: ""
        }
    ]
    return (
        <div>
            policies
        </div>
    );
};

export default PolicyList;