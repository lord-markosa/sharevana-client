import { cacheToken } from "../store/userSlice";
import fetchToken from "./utils/fetchToken";

const initializeApp = async (store) => {
    const token = fetchToken();
    if (token !== "undefined") {
        store.dispatch(cacheToken(token));
    }
};

export default initializeApp;
