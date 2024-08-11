import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import storySlice from "./storySlice.js";
import chatSlice from "./chatSlice.js";
import appConfigSlice from "./appConfigSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice,
        story: storySlice,
        chat: chatSlice,
        appConfig: appConfigSlice,
    },
});

export default store;
