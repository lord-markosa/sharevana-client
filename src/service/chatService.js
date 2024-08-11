import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../store/appConfigSlice";
import apiWrapper from "./apiWrapper";
import { API_URL } from "../utils/apiUrl";

export const fetchMessages = createAsyncThunk(
    "chats/fetchMessages",
    async (chatId, { getState, dispatch, rejectWithValue }) => {
        const token = getState().user.token;
        try {
            const response = await axios.get(`${API_URL}/api/chats/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred";
            dispatch(showToast(errorMessage));
            rejectWithValue(error.response.data);
        }
    }
);

export const fetchNewChat = apiWrapper("user/fetchNewChat", "/api/chats/new");

export const sendMessage = createAsyncThunk(
    "chats/sendMessage",
    async ({ chatId, content }, { getState, dispatch, rejectWithValue }) => {
        const token = getState().user.token;
        try {
            const response = await axios.post(
                `${API_URL}/api/chats/${chatId}/send`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred";
            dispatch(showToast(errorMessage));
            rejectWithValue(error.response.data);
        }
    }
);
