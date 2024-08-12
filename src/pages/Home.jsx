import React, { useEffect, useState } from "react";
import StoryList from "./StoryList";
import ChatList from "./ChatList";
import ToggleSlider from "../components/ToggleSlider";
import ConfirmationDialog from "../components/ConfirmationDialog";
import FloatingAddButton from "../components/FloatingButton";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { toggleActiveTab } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmation } from "../hooks/useConfirmation";
import { initializePubSubClient } from "../webPubSubClient/webPubSubClient";
import { fetchUser } from "../service/userService";
import { fetchNewChat } from "../service/chatService";
import "./Home.scss";

const Home = () => {
    const { isLoading, activeTabIndex, token, fetched } = useSelector(
        (state) => state.user
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        isOpen,
        message,
        handleConfirm,
        handleCancel,
        requestConfirmation,
    } = useConfirmation();

    useEffect(() => {
        if (!fetched) {
            dispatch(fetchUser());
        }

        if (token) {
            initializePubSubClient(token, dispatch);
        }
    }, [dispatch, fetched, token]);

    const handleTabChange = () => {
        dispatch(toggleActiveTab());
    };

    const tabs = [
        {
            view: <StoryList requestConfirmation={requestConfirmation} />,
            addActionHandler: () => navigate("/new-story"),
        },
        {
            view: <ChatList />,
            addActionHandler: () => {
                requestConfirmation(
                    "Are you sure you want to create a new chat?",
                    () => dispatch(fetchNewChat())
                );
            },
        },
    ];

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <div className="home-page">
            <ToggleSlider
                tab1="Everyone"
                tab2="Someone"
                tabIndex={activeTabIndex}
                handleTabChange={handleTabChange}
            />

            <div className="list-view">{tabs[activeTabIndex].view}</div>

            <FloatingAddButton
                onClick={tabs[activeTabIndex].addActionHandler}
            />
            {isOpen && (
                <ConfirmationDialog
                    message={message}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Home;
