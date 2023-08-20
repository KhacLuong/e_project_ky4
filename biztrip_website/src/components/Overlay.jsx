import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import {Context} from "../context/ContextProvider.jsx";

const Overlay = () => {
    const {openBookingNewTicketModal, openLoginModal, openModalCoach} = useContext(Context);

    useEffect(() => {
        if (openBookingNewTicketModal || openLoginModal || openModalCoach) {
            document.body.style.overflow = 'hidden';
            // document.body.style.paddingRight = '0.4rem';
        } else {
            document.body.style.overflow = 'unset';
            // document.body.style.paddingRight = '0px';
        }
    }, [openBookingNewTicketModal, openLoginModal, openModalCoach])
    const OverlayLayout = styled.div`
      opacity: 0.58;
      display: ${openBookingNewTicketModal || openLoginModal || openModalCoach ? "block" : "none"};
      transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: fixed;
      z-index: 40;
      background: #484848;
    `
    return (
        <OverlayLayout/>
    );
};

export default Overlay;