import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import GetStarted from "../pages/GetStarted";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Story from "../pages/Story";
import ChatBox from "../pages/ChatBox";
import { fetchUser } from "../service/userService";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { fetchMessages } from "../service/chatService";

const AllRoutes = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const router = createBrowserRouter([
        {
            loader: async () => {
                if (token && token !== "undefined") {
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
                            loader: ({ params }) => {
                                const chatId = params?.id;
                                if (chatId) {
                                    dispatch(fetchMessages({ chatId }));
                                }
                                return null;
                            },
                        },
                        {
                            path: "new-story",
                            element: <Story />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AllRoutes;
