import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StoryListItem from "../components/StoryListItem";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "./StoryList.scss";

const StoryList = ({ requestConfirmation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.story.loading);
    const stories = useSelector((state) => state.story.stories);
    const username = useSelector((state) => state.user.username);

    return (
        <>
            {stories.map((story) =>
                StoryListItem({
                    story,
                    username,
                    dispatch,
                    navigate,
                    requestConfirmation,
                })
            )}
            {loading && <Spinner small={true} />}
        </>
    );
};

export default StoryList;
