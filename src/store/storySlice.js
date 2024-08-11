import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "../service/userService";
import {
    addStory,
    deleteStory,
    likeStory,
    updateStory,
} from "../service/storyService";

const storySlice = createSlice({
    name: "story",
    initialState: {
        stories: [],
        loading: false,
        status: "idle",
        error: null,
        editingStoryId: null,
        editContent: "",
    },
    reducers: {
        storyAdded: (state, action) => {
            state.stories.push(action.payload);
        },
        startEditingStory: (state, action) => {
            const { storyId, content } = action.payload;
            state.editingStoryId = storyId;
            state.editContent = content;
        },
        cancelEditingStory: (state) => {
            state.editingStoryId = null;
            state.editContent = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.stories = action.payload.storyList;
                parseLikedBy(state);
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.stories = action.payload.storyList;
                parseLikedBy(state);
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.stories = action.payload.storyList;
                parseLikedBy(state);
            })
            .addCase(addStory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addStory.fulfilled, (state, action) => {
                state.stories.push(action.payload);
                state.loading = false;
            })
            .addCase(addStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(likeStory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(likeStory.fulfilled, (state, action) => {
                const { storyId, username } = action.payload;
                const existingStory = state.stories.find(
                    (story) => story.id === storyId
                );
                if (existingStory) {
                    existingStory.likedBy.push(username);
                }
                state.loading = false;
            })
            .addCase(likeStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteStory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteStory.fulfilled, (state, action) => {
                const storyId = action.payload;
                state.stories = state.stories.filter(
                    (story) => story.id !== storyId
                );
                state.loading = false;
            })
            .addCase(deleteStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateStory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateStory.fulfilled, (state, action) => {
                const { storyId, content } = action.payload;
                const existingStory = state.stories.find(
                    (story) => story.id === storyId
                );
                if (existingStory) {
                    existingStory.content = content;
                }
                state.editingStoryId = null; // Clear editing state after update
                state.editContent = "";
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

const parseLikedBy = (state) => {
    state.stories = state.stories?.map((story) => ({
        ...story,
        likedBy: JSON.parse(story.likedBy),
    }));
};
