import React from "react";
import { useSelector } from "react-redux";
import StoryListItem from "../components/StoryListItem";
import Spinner from "../components/Spinner";

import "./StoryList.scss";

const StoryList = ({ requestConfirmation }) => {
    const loading = useSelector((state) => state.story.loading);
    const storyList = useSelector((state) => state.story.storyList);

    return (
        <>
            {storyList.map((story) => (
                <StoryListItem
                    key={story.id}
                    story={story}
                    requestConfirmation={requestConfirmation}
                />
            ))}
            {loading && <Spinner small={true} />}
        </>
    );
};

export default StoryList;
