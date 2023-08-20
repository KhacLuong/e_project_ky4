import React, {useEffect, useState} from 'react';
import Header from "./Header.jsx";
import Banner from "../../pages/customer/home/Banner.jsx";
import Footer from "./Footer.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {CUSTOMER_DOCUMENT_TITLE} from "../../utils/data.jsx";
import {Outlet} from "react-router-dom";
import CoachModal from "../../components/CoachModal.jsx";
import Overlay from "../../components/Overlay.jsx";
import ContextProvider from "../../context/ContextProvider.jsx";
import AuthenticationModal from "../../components/customer/AuthenticationModal.jsx";

const MainLayout = () => {
    useDocumentTitle(CUSTOMER_DOCUMENT_TITLE, true)
    return (
        <ContextProvider>
            <CoachModal/>
            <Overlay/>
            <AuthenticationModal/>
            <section className={`relative`}>
                <Header/>
                <main className={`mt-[70px] min-[1680px]:mt-[70px]`}>
                    <Outlet/>
                </main>
                <Footer/>
            </section>
        </ContextProvider>

    );
};

export default MainLayout;