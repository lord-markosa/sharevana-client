import React, { useState, useEffect, useRef } from "react";
import Persona from "../components/Persona";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import LoadingScreen from "../components/LoadingScreen";
import { initializePubSubClient } from "../webPubSubClient/webPubSubClient";
import { fetchUser } from "../service/userService";
import { fetchMessages, sendMessage } from "../service/chatService";
import "./ChatBox.scss";
import Spinner from "../components/Spinner";

const ChatBox = () => {
    const params = useParams();
    const chatId = params?.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const textareaRef = useRef(null);
    const msgListRef = useRef(null);
    const [newMessage, setNewMessage] = useState("");

    const {
        username,
        fetched: userFetched,
        isLoading: userLoading,
        token,
    } = useSelector((state) => state.user);

    const chatDetail = useSelector((state) =>
        state.chat.chats.find((chat) => chat.id === chatId)
    );

    const messages = useSelector((state) => state.chat.messages[chatId]);
    const loadingMessages = useSelector(
        (state) => state.chat.loadingMessages[chatId]
    );

    useEffect(() => {
        if (!userFetched && !userLoading) {
            dispatch(fetchUser(token));
        }

        if (token) {
            initializePubSubClient(token, dispatch);
        }

        if (!messages && !loadingMessages) {
            dispatch(fetchMessages(chatId));
        }
    }, [
        token,
        chatId,
        userFetched,
        messages,
        userLoading,
        loadingMessages,
        dispatch,
    ]);

    useEffect(() => {
        const msgList = msgListRef.current;
        if (!msgList) return;
        msgList.scrollTop = msgList.scrollHeight;
    }, [messages?.length, loadingMessages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.length == 0) return;
        const msgToSend = newMessage;
        setNewMessage("");
        dispatch(sendMessage({ chatId, content: msgToSend }));
    };

    const onBack = () => {
        navigate("/home");
    };

    const handleChange = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const maxRows = 3;
        const textareaLineHeight = 20; // This should match the line-height in your CSS

        textarea.rows = 1; // Reset the rows so textarea height can shrink on delete
        const currentRows = Math.floor(
            textarea.scrollHeight / textareaLineHeight
        );

        if (currentRows >= maxRows) {
            textarea.rows = maxRows;
            textarea.scrollTop = textarea.scrollHeight;
        } else {
            textarea.rows = currentRows;
        }
        setNewMessage(textarea.value);
    };

    return !userFetched || !messages ? (
        <LoadingScreen msg="Sharing reduces stress, increases happiness..." />
    ) : (
        <div className="chat-screen">
            <div className="chat-header">
                <button className="back-button" onClick={onBack}>
                    <FiArrowLeft size={24} />
                </button>
                <Persona
                    title={
                        chatDetail.username1 === username
                            ? chatDetail.username2
                            : chatDetail.username1
                    }
                />
            </div>
            <div className="chat-messages" ref={msgListRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.sent ? "self" : "other"}`}
                    >
                        {msg.content}
                    </div>
                ))}
                {loadingMessages && <Spinner small={true} />}
            </div>
            <div className="chat-footer">
                <textarea
                    ref={textareaRef}
                    className="message-input"
                    value={newMessage}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows={1}
                />
                <button className="send-button" onClick={handleSendMessage}>
                    <IoSend size={24} />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
