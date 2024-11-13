import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";
import { likeStory } from "../service/storyService";
import { setToken } from "../utils/userToken";

const initialState = {
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
    reducers: {},
    extraReducers: (builder) => {
        [fetchUser, loginUser, registerUser].forEach((apiCall) => {
            builder
                .addCase(apiCall.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(apiCall.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.username = action.payload.username;
                    state.likedStories = action.payload.likedStories;
                    state.wpsUrl = action.payload.negotiation.url;
                    setToken(action.payload.token);
                })
                .addCase(apiCall.rejected, (state) => {
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
    toggleActiveTab,
} = userSlice.actions;

export default userSlice.reducer;
