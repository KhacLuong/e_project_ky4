import React from 'react';
import useAuth from "../hooks/useAuth.jsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequiredAuth = ({allowedRoles, page:Page}) => {
    const location = useLocation()
    const {roles} = useAuth()
    return (
        roles.some(role => allowedRoles.includes(role))
            ? <Page/>
            : <Navigate to={location.pathname.includes("admin") ? '/admin/v1/cms/sign-in' : '/'} state={{from: location}} replace/>
    );
};

export default RequiredAuth;