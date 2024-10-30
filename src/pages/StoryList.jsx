import React from "react";
import { useSelector } from "react-redux";
import StoryListItem from "../components/StoryListItem";
import Spinner from "../components/Spinner";

import "./StoryList.scss";
import { selectStoryList } from "../selectors/storySelectors";

const StoryList = ({ requestConfirmation }) => {
    const { loading, storyList } = useSelector(selectStoryList);

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
