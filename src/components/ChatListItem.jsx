import React from "react";
import { useNavigate } from "react-router-dom";
import Persona from "./Persona";
import "./ChatListItem.scss";

export default function ChatListItem({ chat, user }) {
    const navigate = useNavigate();
    const { username1, username2, id } = chat;
    const onClick = () => navigate(`/chat/${id}`);

    const username = username1 === user ? username2 : username1;

    return (
        <div className="chatListItem" onClick={onClick}>
            <Persona title={username} />
        </div>
    );
}
