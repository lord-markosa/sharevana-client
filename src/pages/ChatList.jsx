import React from "react";
import { useSelector } from "react-redux";
import ChatListItem from "../components/ChatListItem";
import Spinner from "../components/Spinner";

const ChatList = () => {
    const chats = useSelector((state) => state.chat.chats);
    const username = useSelector((state) => state.user.username);
    const loadingNewChat = useSelector((state) => state.chat.loadingNewChat);

    return (
        <>
            {chats.map((chat) => (
                <ChatListItem key={chat.id} chat={chat} user={username} />
            ))}
            {loadingNewChat && <Spinner small={true} />}
        </>
    );
};

export default ChatList;
