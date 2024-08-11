import initializeApp from "./boot/initializeApp";
import renderApp from "./boot/renderApp";
import store from "./store/store";

const initializeAndRenderApp = async () => {
    await initializeApp(store);
    renderApp(store);
};

initializeAndRenderApp();
