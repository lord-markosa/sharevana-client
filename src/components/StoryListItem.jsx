import React from "react";
import Persona from "./Persona";
import DropdownMenu from "./DropdownMenu";
import getFormattedTime from "../utils/getFormattedTime";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { deleteStory, likeStory } from "../service/storyService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./StoryListItem.scss";
import { selectLikedStories, selectUsername } from "../selectors/userSelectors";

export default function StoryListItem({ story, requestConfirmation }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const likedStories = useSelector(selectLikedStories);
    const username = useSelector(selectUsername);
    const storyId = story.id;

    const handleDelete = () => {
        requestConfirmation("Are you sure you want to delete this story?", () =>
            dispatch(deleteStory({ storyId }))
        );
    };

    const handleLike = () => {
        dispatch(likeStory({ storyId }));
    };

    const handleEdit = (_story) => {
        navigate("/new-story", { state: _story });
    };

    const isLiked = likedStories.includes(storyId);

    return (
        <div key={story.id} className="story">
            <div className="story-header">
                <Persona
                    title={story.createdBy}
                    subtitle={getFormattedTime(story.createdAt)}
                />

                {username === story.createdBy && (
                    <DropdownMenu
                        options={[
                            {
                                label: "Edit",
                                onClick: () => handleEdit(story),
                            },
                            {
                                label: "Delete",
                                onClick: () => handleDelete(storyId),
                            },
                        ]}
                        position="right"
                    />
                )}
            </div>
            <div className="story-content">{story.content}</div>
            <div className="bottomContainer">
                <div className={`likeContainer ${isLiked ? "liked" : ""}`}>
                    {isLiked ? (
                        <FaHeart />
                    ) : (
                        <FaRegHeart onClick={handleLike} />
                    )}
                </div>
            </div>
        </div>
    );
}
