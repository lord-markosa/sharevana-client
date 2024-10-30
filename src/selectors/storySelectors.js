import { createSelector } from "@reduxjs/toolkit";

export const selectStoryList = createSelector(
    (state) => state.story,
    (story) => ({
        loading: story.loading,
        storyList: story.storyList,
    })
);
