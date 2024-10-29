import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import GetStarted from "../pages/GetStarted";

export default function ProtectedRoutes() {
    const userFetched = useSelector(
        (state) => state.user.status === "succeeded"
    );
    return userFetched ? <Outlet /> : <Navigate to="/" />;
}
