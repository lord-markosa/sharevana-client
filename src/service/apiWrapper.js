import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../store/appConfigSlice";
import { API_URL } from "../utils/apiUrl";

const apiWrapper = (actionName, url, method = "get") => {
    return createAsyncThunk(
        actionName,
        async (data, { getState, dispatch, rejectWithValue }) => {
            const token = getState().user.token;
            try {
                const response = await axios({
                    method,
                    url: `${API_URL}${url}`,
                    data,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message || "An error occurred";
                dispatch(showToast(errorMessage));
                return rejectWithValue(errorMessage);
            }
        }
    );
};

export default apiWrapper;
