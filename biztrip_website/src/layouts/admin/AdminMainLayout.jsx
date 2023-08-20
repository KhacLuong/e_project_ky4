import React, {useContext} from 'react';
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router-dom";
import "aos/dist/aos.css"
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {ADMIN_DOCUMENT_TITLE} from "../../utils/data.jsx";
import CoachModal from "../../components/CoachModal.jsx";
import Overlay from "../../components/Overlay.jsx";
import ContextProvider, {Context} from "../../context/ContextProvider.jsx";

const AdminMainLayout = () => {
    useDocumentTitle(ADMIN_DOCUMENT_TITLE, true)

    return (
        <ContextProvider>
            <nav className={`fixed z-30 w-full bg-gray-50`}>
                <Navbar/>
            </nav>
            <div className={`flex overflow-hidden bg-white pt-16 h-screen`}>
                <aside id={`sidebar`}
                       className={`flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-[4.5rem] w-64 h-full duration-200 lg:flex transition-width lg:w-64`}
                       aria-label={`Sidebar`}>
                    <Sidebar/>
                </aside>
                <div id={`main-content`} className={`h-full w-full bg-gray-50 relative overflow-y-scroll lg:ml-64`}>
                    <Outlet/>
                </div>
            </div>
            <CoachModal/>
            <Overlay/>
        </ContextProvider>
    );
};

export default AdminMainLayout;