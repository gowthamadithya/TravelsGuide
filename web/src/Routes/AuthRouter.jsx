import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StoreContext } from "../Store/Store";

function ProtectedRoutes() {

    const {state, dispatch } = useContext(StoreContext)

    if (state.auth.access) {
        return (
            <Outlet />
        );
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoutes;
