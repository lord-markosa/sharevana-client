import React from "react";
import "./StoryListItem.scss";
import Persona from "./Persona";
import DropdownMenu from "./DropdownMenu";
import getFormattedTime from "../utils/getFormattedTime";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { deleteStory, likeStory } from "../service/storyService";

export default function StoryListItem({
    story,
    username,
    dispatch,
    navigate,
    requestConfirmation,
}) {
    const handleDelete = () => {
        requestConfirmation("Are you sure you want to delete this story?", () =>
            dispatch(deleteStory(story.id))
        );
    };

    const handleLike = () => {
        dispatch(likeStory({ storyId: story.id, username }));
    };

    const handleEdit = (story) => {
        navigate("/new-story", { state: story });
    };

    const isLiked = story.likedBy.includes(username);

    return (
        <div key={story.id} className="story">
            <div className="story-header">
                <Persona
                    title={story.creator}
                    subtitle={getFormattedTime(Date(story.createdAt))}
                />

                {story.creator == username && (
                    <DropdownMenu
                        options={[
                            {
                                label: "Edit",
                                onClick: () => handleEdit(story),
                            },
                            {
                                label: "Delete",
                                onClick: () => handleDelete(story.id),
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
