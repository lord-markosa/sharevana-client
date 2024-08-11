import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";

const initialState = {
    token: null,
    username: null,
    fetched: false,
    isLoading: false,
    error: null,
    activeTabIndex: 0,
};

// Async actions

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        cacheToken: (state, action) => {
            state.token = action.payload;
        },
        loginUser: (state, action) => {
            state.username = action.payload.username;
            state.chats = action.payload.chats;
        },
        logoutUser: (state) => {
            state.username = null;
        },
        toggleActiveTab: (state) => {
            state.activeTabIndex = state.activeTabIndex ^ 1;
        },
        addChat: (state, action) => {
            state.chats.push(action.payload);
        },
        updateChat: (state, action) => {
            state.chats = state.chats.map((chat) =>
                chat.id !== action.payload.id
                    ? chat
                    : { ...chat, messages: action.payload.messages }
            );
        },
        insertMessage: (state, action) => {
            state.chats = state.chats.map((chat) =>
                chat.id !== action.payload.chatId
                    ? chat
                    : {
                          ...chat,
                          messages: [...chat.messages, action.payload.message],
                      }
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.username = action.payload.username;
                state.chats = action.payload.chats.map((chat) => ({
                    ...chat,
                    messages: [],
                    loading: false,
                    error: false,
                }));
                state.fetched = true;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.username = action.payload.username;
                state.chats = action.payload.chats;
                state.token = action.payload.token;
                state.fetched = true;
                state.isLoading = false;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.username = action.payload.username;
                state.chats = action.payload.chats;
                state.token = action.payload.token;
                state.fetched = true;
                state.isLoading = false;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const {
    logoutUser,
    addChat,
    updateChat,
    insertMessage,
    cacheToken,
    toggleActiveTab,
} = userSlice.actions;

export default userSlice.reducer;
