import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import storySlice from "./storySlice";
import chatSlice from "./chatSlice";
import appConfigSlice from "./appConfigSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        story: storySlice,
        chat: chatSlice,
        appConfig: appConfigSlice,
    },
});

export default store;
