import React, { useEffect, useState } from "react";
import "./Story.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useConfirmation } from "../hooks/useConfirmation";
import { addStory, updateStory } from "../service/storyService";

const Story = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currLocation = useLocation();
    const {
        message,
        isOpen,
        handleConfirm,
        handleCancel,
        requestConfirmation,
    } = useConfirmation();

    const story = currLocation.state;
    const isEditing = !!story;

    const [storyContent, setStoryContent] = useState(
        isEditing ? story.content : ""
    );

    const handleContentChange = (e) => setStoryContent(e.target.value);

    const actionHandler = () => {
        if (storyContent.trim() === "") return;
        requestConfirmation(
            isEditing
                ? "Are you sure you want to update this story?"
                : "Are you sure you want to add this story?",

            () => {
                isEditing
                    ? dispatch(
                          updateStory({
                              content: storyContent,
                              storyId: story.id,
                          })
                      )
                    : dispatch(addStory({ content: storyContent })),
                    setStoryContent("");
                navigate("/home");
            }
        );
    };

    const onCancel = () => {
        setStoryContent("");
        navigate("/home");
    };

    return (
        <div className="new-story">
            <div className="post-form">
                <textarea
                    placeholder="Share with us..."
                    value={storyContent}
                    onChange={handleContentChange}
                    className="content-textarea"
                    rows="4"
                />
                <div className="actions">
                    <button className="post-button" onClick={actionHandler}>
                        {isEditing ? "Update" : "Share"}
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
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

export default Story;
