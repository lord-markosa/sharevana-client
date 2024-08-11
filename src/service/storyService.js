import apiWrapper from "./apiWrapper";

export const addStory = apiWrapper("stories/addStory", "/api/story", "post");

export const likeStory = apiWrapper(
    "stories/likeStory",
    "/api/story/like",
    "post"
);

export const updateStory = apiWrapper(
    "stories/updateStory",
    "/api/story",
    "put"
);

export const deleteStory = apiWrapper(
    "stories/deleteStory",
    "/api/story",
    "delete"
);
