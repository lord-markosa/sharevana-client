import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";
import {
    fetchMessages,
    fetchNewChat,
    sendMessage,
} from "../service/chatService";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
        messages: {},
        loadingMessages: {},
        status: "idle",
        error: null,
        chatLoadState: null,
        loadingNewChat: false,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages[action.payload.chatId].push(action.payload.message);
        },
    },
    extraReducers: (builder) => {
        [loginUser, registerUser, fetchUser].forEach((apiCall) => {
            builder.addCase(apiCall.fulfilled, (state, action) => {
                state.chats = action.payload.chats;
            });
        });

        builder
            // Fetch messages
            .addCase(fetchMessages.pending, (state, action) => {
                state.loadingMessages[action.meta.arg.chatId] = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages[action.meta.arg.chatId] =
                    action.payload.messages;
                state.loadingMessages[action.meta.arg.chatId] = false;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loadingMessages[action.meta.arg.chatId] = false;
            })

            // Fetch new chat
            .addCase(fetchNewChat.pending, (state, action) => {
                state.loadingNewChat = true;
            })
            .addCase(fetchNewChat.fulfilled, (state, action) => {
                if (action.payload) {
                    state.chats.push(action.payload);
                }
                state.loadingNewChat = false;
            })
            .addCase(fetchNewChat.rejected, (state, action) => {
                state.loadingNewChat = false;
            })

            // Send message
            .addCase(sendMessage.pending, (state, action) => {
                state.loadingMessages[action.meta.arg.chatId] = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages[action.meta.arg.chatId].push(action.payload);
                state.loadingMessages[action.meta.arg.chatId] = false;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loadingMessages[action.meta.arg.chatId] = false;
            });
    },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
