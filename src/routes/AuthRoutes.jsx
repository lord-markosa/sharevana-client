import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoutes() {
    const userFetched = useSelector(
        (state) => state.user.status === "succeeded"
    );

    return userFetched ? <Navigate to="/home" /> : <Outlet />;
}
