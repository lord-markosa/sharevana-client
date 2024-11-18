import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import GetStarted from "../pages/start/GetStarted";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import StoryForm from "../pages/story/StoryForm";
import ChatBox from "../pages/chat/ChatBox";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { fetchUser } from "../service/userService";
import { getToken } from "../utils/userToken";

const AllRoutes = () => {
    const dispatch = useDispatch();
    const token = getToken();
    const router = createBrowserRouter([
        {
            loader: async () => {
                if (token) {
                    await dispatch(fetchUser());
                }
                return null;
            },
            children: [
                {
                    index: true,
                    path: "*",
                    element: <GetStarted />,
                },
                {
                    element: <AuthRoutes />,
                    children: [
                        {
                            path: "login",
                            element: <Login />,
                        },
                        {
                            path: "register",
                            element: <Register />,
                        },
                    ],
                },
                {
                    element: <ProtectedRoutes />,
                    children: [
                        {
                            path: "home",
                            element: <Home />,
                            // [TODO] Add children to Home
                            // children: [
                            //     {
                            //         index: true,
                            //         element: <StoryList />,
                            //     },
                            //     {
                            //         path: "chats",
                            //         element: <ChatList />,
                            //     },
                            // ],
                        },
                        {
                            path: "chat/:id",
                            element: <ChatBox />,
                        },
                        {
                            path: "new-story",
                            element: <StoryForm />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AllRoutes;
