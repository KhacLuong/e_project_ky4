import React, {useContext} from 'react';
import "aos/dist/aos.css"
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {CUSTOMER_DOCUMENT_TITLE} from "../../../utils/data.jsx";
import Banner from "./Banner.jsx";
import PopularSchedule from "./PopularSchedule.jsx";
import InfoArea from "./InfoArea.jsx";
import Testimonial from "./Testimonial.jsx";
import News from "./News.jsx";
import Subscribe from "./Subscribe.jsx";
import SpecialOffer from "./SpecialOffer.jsx";
import {Context} from "../../../context/ContextProvider.jsx";


const CustomerHomePage = () => {
    useDocumentTitle(CUSTOMER_DOCUMENT_TITLE, true)
    const {openBookingNewTicketModal, openLoginModal, openModalCoach} = useContext(Context);
    return (
        <div className={`${openBookingNewTicketModal || openLoginModal || openModalCoach ? 'pr-[0.4rem]' : ''}`}>
            <Banner/>
            <InfoArea/>
            <PopularSchedule/>
            <SpecialOffer/>
            <Testimonial/>
            <News/>
            <Subscribe/>
        </div>
    );
};

export default CustomerHomePage;