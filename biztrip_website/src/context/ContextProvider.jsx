import React, {createContext, useEffect, useReducer, useState} from 'react';
import {useSelector} from "react-redux";


export const Context = createContext();
const ContextProvider = ({children}) => {
    const account = useSelector(state => state.auth.account)
    const userId = useSelector(state => state.auth.account)?.user?.id
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [id, setId] = useState('');
    const [openModalCoach, setOpenModalCoach] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [openBookingNewTicketModal, setOpenBookingNewTicketModal] = useState(false)
    const [coach, setCoach] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [coachDistance, setCoachDistance] = useState({})
    return (
        <Context.Provider value={{
            account,
            id,
            setId,
            userId,
            isAuthenticated,
            openModalCoach,
            setOpenModalCoach,
            openLoginModal,
            setOpenLoginModal,
            openBookingNewTicketModal,
            setOpenBookingNewTicketModal,
            isLoading,
            setIsLoading,
            coach,
            setCoach,
            coachDistance,
            setCoachDistance
        }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider;