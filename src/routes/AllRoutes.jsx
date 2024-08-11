import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import GetStarted from "../pages/GetStarted";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Story from "../pages/Story";
import ChatBox from "../pages/ChatBox";

const AllRoutes = () => {
    const { token, error } = useSelector((state) => state.user);

    const AuthPageWrapper = (authElement) =>
        token && !error ? <Navigate to="/home" /> : authElement;

    const PrivatePageWrapper = (privateElement) =>
        token && !error ? privateElement : <Navigate to="/login" />;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="/login" element={AuthPageWrapper(<Login />)} />
                <Route
                    path="/register"
                    element={AuthPageWrapper(<Register />)}
                />
                <Route path="/home" element={PrivatePageWrapper(<Home />)} />
                <Route
                    path="/new-story"
                    element={PrivatePageWrapper(<Story />)}
                />
                <Route
                    path="/chat/:id"
                    element={PrivatePageWrapper(<ChatBox />)}
                />

                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
};

export default AllRoutes;
