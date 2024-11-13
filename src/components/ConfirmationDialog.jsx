import React from "react";
import Button from "./Button";
import "./ConfirmationDialog.scss";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => (
    <div className="confirmation-dialog-overlay">
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-message">{message}</div>
            <div className="confirmation-dialog-actions">
                <Button onClick={onConfirm}>Confirm</Button>
                <Button type="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    </div>
);

export default ConfirmationDialog;
