import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AllRoutes from "../routes/AllRoutes";
import Toast from "../components/Toast";

const renderApp = (store) => {
    const container = document.getElementById("root");
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <AllRoutes />
            <Toast />
        </Provider>
    );
};

export default renderApp;
