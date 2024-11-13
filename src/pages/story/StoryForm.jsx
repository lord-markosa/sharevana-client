import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useConfirmation } from "../../hooks/useConfirmation";
import { addStory, updateStory } from "../../service/storyService";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";

import "./StoryForm.scss";

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
        <>
            <div className="post-form">
                <TextArea
                    placeholder="Share with us..."
                    value={storyContent}
                    setValue={setStoryContent}
                    className="content-textarea"
                    minRows={16}
                    maxRows={16}
                />
                <div className="buttons-container">
                    {[
                        {
                            label: isEditing ? "Update" : "Share",
                            action: actionHandler,
                        },
                        {
                            label: "Cancel",
                            type: "secondary",
                            action: onCancel,
                        },
                    ].map(({ label, type, action }, idx) => (
                        <Button
                            type={type}
                            key={`story-action-button-${idx}`}
                            className={`action-button-${idx}`}
                            onClick={action}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </div>
            {isOpen && (
                <ConfirmationDialog
                    message={message}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default Story;
