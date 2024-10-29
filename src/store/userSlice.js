import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";
import { likeStory } from "../service/storyService";

const initialState = {
    token: null,
    username: null,
    likedStories: [],
    status: "idle",
    activeTabIndex: 0,
    wpsUrl: null,
};

// Async actions

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        cacheToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        [fetchUser, loginUser, registerUser].forEach((apiCall) => {
            builder
                .addCase(apiCall.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(apiCall.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.username = action.payload.username;
                    state.token = action.payload.token;
                    state.likedStories = action.payload.likedStories;
                    state.wpsUrl = action.payload.negotiation.url;
                    localStorage.setItem("token", action.payload.token);
                })
                .addCase(apiCall.rejected, (state, action) => {
                    state.status = "failed";
                });
        });

        // Like story
        builder.addCase(likeStory.fulfilled, (state, action) => {
            state.likedStories.push(action.meta.arg.storyId);
        });
    },
});

export const {
    // [TODO] Implement logout functionality
    // logoutUser,
    cacheToken,
    toggleActiveTab,
} = userSlice.actions;

export default userSlice.reducer;
