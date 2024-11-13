import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import Persona from "../../components/Persona";
import LoadingScreen from "../../components/LoadingScreen";
import { initializePubSubClient } from "../../webPubSubClient/webPubSubClient";
import { sendMessage } from "../../service/chatService";
import Spinner from "../../components/Spinner";
import { selectWpsUrl } from "../../selectors/userSelectors";
import { selectMessageDetailsById } from "../../selectors/chatSelectors";
import Button from "../../components/Button";

import "./ChatBox.scss";
import TextArea from "../../components/TextArea";

const ChatBox = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const msgListRef = useRef(null);
    const [newMessage, setNewMessage] = useState("");

    const chatId = params?.id;

    const { messages, isMessageLoading, chatDetail } = useSelector((state) =>
        selectMessageDetailsById(state, chatId)
    );

    const wpsUrl = useSelector(selectWpsUrl);

    useEffect(() => {
        // Initialize the Web PubSub client already initialized
        // logic is handled inside this function
        initializePubSubClient(wpsUrl, dispatch);
    }, []);

    // Scroll to the bottom of the message list when new message is added
    useEffect(() => {
        const msgList = msgListRef.current;
        if (!msgList) return;
        msgList.scrollTop = msgList.scrollHeight;
    }, [messages?.length, isMessageLoading]);

    // Send message logic
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

    return !messages ? (
        <LoadingScreen msg="Sharing reduces stress, increases happiness..." />
    ) : (
        <div className="chat-screen">
            <div className="chat-header">
                <Button
                    type="transparent"
                    className="back-button"
                    onClick={onBack}
                >
                    <FiArrowLeft size={24} />
                </Button>
                <Persona title={chatDetail.partnerName} />
            </div>
            <div className="chat-messages" ref={msgListRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.timestamp}
                        className={`message ${
                            !!msg.sentBy1 ^ !!chatDetail.isUser1
                                ? "other"
                                : "self"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {isMessageLoading && <Spinner small={true} />}
            </div>
            <div className="chat-footer">
                <TextArea
                    minRows={1}
                    maxRows={3}
                    value={newMessage}
                    setValue={setNewMessage}
                    placeholder="Type your message..."
                    className="message-input"
                />
                <Button className="send-button" onClick={handleSendMessage}>
                    <IoSend size={24} />
                </Button>
            </div>
        </div>
    );
};

export default ChatBox;
