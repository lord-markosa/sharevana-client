import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Main from "../routes/Main";

const renderApp = (store) => {
    const container = document.getElementById("root");
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default renderApp;
