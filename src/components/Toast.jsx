import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../store/appConfigSlice";
import "./Toast.scss";

const Toast = () => {
    const dispatch = useDispatch();
    const { toastMessage: message, showToast: show } = useSelector(
        (state) => state.appConfig
    );

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, dispatch]);

    if (!show) return null;
    console.log(message);
    return <div className="toast">{message}</div>;
};

export default Toast;
