import { createAsyncThunk } from "@reduxjs/toolkit";
import apiWrapper from "./apiWrapper";
import makeRequest from "./makeRequest";

export const addStory = apiWrapper("stories/addStory", "/api/story", "post");

export const likeStory = createAsyncThunk(
    "stories/likeStory",
    async ({ storyId }, thunkApi) =>
        makeRequest(`/api/story/${storyId}/like`, "get", thunkApi)
);

export const updateStory = createAsyncThunk(
    "stories/updateStory",
    async ({ storyId, content }, thunkApi) =>
        makeRequest(`/api/story/${storyId}`, "put", thunkApi, { content })
);

export const deleteStory = createAsyncThunk(
    "stories/deleteStory",
    async ({ storyId }, thunkApi) =>
        makeRequest(`/api/story/${storyId}`, "delete", thunkApi)
);
