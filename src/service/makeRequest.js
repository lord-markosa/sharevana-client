import axios from "axios";
import { showToast } from "../store/appConfigSlice";
import { API_URL } from "../utils/apiUrl";

const makeRequest = async (
    url,
    method,
    { getState, dispatch, rejectWithValue },
    data
) => {
    const token = getState().user.token || localStorage.getItem("token");
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
};

export default makeRequest;
