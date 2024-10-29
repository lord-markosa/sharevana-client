import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";
import { addStory, deleteStory, updateStory } from "../service/storyService";

const storySlice = createSlice({
    name: "story",
    initialState: {
        storyList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        [loginUser, registerUser, fetchUser].forEach((apiCall) => {
            builder.addCase(apiCall.fulfilled, (state, action) => {
                state.storyList = action.payload.storyList;
            });
        });
        builder
            // Add story
            .addCase(addStory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addStory.fulfilled, (state, action) => {
                state.storyList.push(action.payload);
                state.loading = false;
            })
            .addCase(addStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete story
            .addCase(deleteStory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteStory.fulfilled, (state, action) => {
                const storyId = action.meta.arg.storyId;
                state.storyList = state.storyList.filter(
                    (story) => story.id !== storyId
                );
                state.loading = false;
            })
            .addCase(deleteStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update story
            .addCase(updateStory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateStory.fulfilled, (state, action) => {
                const { storyId, content } = action.meta.arg;
                state.storyList = state.storyList.map((story) =>
                    story.id === storyId ? { ...story, content } : story
                );
                state.loading = false;
            })
            .addCase(updateStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { storyAdded, startEditingStory, cancelEditingStory } =
    storySlice.actions;

export default storySlice.reducer;
