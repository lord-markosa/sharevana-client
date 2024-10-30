import React from "react";
import { useNavigate } from "react-router-dom";
import StoryList from "./StoryList";
import ChatList from "./ChatList";
import ToggleSlider from "../components/ToggleSlider";
import ConfirmationDialog from "../components/ConfirmationDialog";
import FloatingAddButton from "../components/FloatingButton";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmation } from "../hooks/useConfirmation";
import { fetchNewChat } from "../service/chatService";
import { toggleActiveTab } from "../store/appConfigSlice";
import { selectActiveTabIndex } from "../selectors/appConfigSelectors";

import "./Home.scss";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeTabIndex = useSelector(selectActiveTabIndex);

    const {
        isOpen,
        message,
        handleConfirm,
        handleCancel,
        requestConfirmation,
    } = useConfirmation();

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

    return (
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
