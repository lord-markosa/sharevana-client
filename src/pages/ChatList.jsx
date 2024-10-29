import React from "react";
import { useSelector } from "react-redux";
import ChatListItem from "../components/ChatListItem";
import Spinner from "../components/Spinner";

const ChatList = () => {
    const { loadingNewChat, chats } = useSelector((state) => ({
        loadingNewChat: state.chat.loadingNewChat,
        chats: state.chat.chats,
    }));

    return (
        <>
            {chats.map((chat) => (
                <ChatListItem key={chat.chatId} chat={chat} />
            ))}
            {loadingNewChat && <Spinner small={true} />}
        </>
    );
};

export default ChatList;
