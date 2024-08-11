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
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chats = action.payload.chats;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chats = action.payload.chats;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chats = action.payload.chats;
            })
            .addCase(fetchMessages.pending, (state, action) => {
                state.loadingMessages[action.meta.arg] = true;
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages[action.meta.arg] = action.payload;
                state.loadingMessages[action.meta.arg] = false;
                state.loading = false;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loadingMessages[action.meta.arg] = false;
            })
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
