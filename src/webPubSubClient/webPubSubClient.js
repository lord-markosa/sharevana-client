import { WebPubSubClient } from "@azure/web-pubsub-client";
import { addMessage } from "../store/chatSlice";
import { API_URL } from "../utils/apiUrl";

const groupName = "test_group_01";

let pubSubClient;

let initialized = false;
let initializing = false;

export async function initializePubSubClient(token, dispatch) {
    if (initializing || initialized) {
        return;
    }

    initializing = true;

    try {
        const wpsToken = await fetch(`${API_URL}/api/users/negotiate`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const parsedWpsToken = await wpsToken.json();

        const client = new WebPubSubClient(parsedWpsToken.url);
        await client.start();

        client.on("connected", (e) => {
            console.log("connected", e.connectionId);
        });

        client.on("disconnected", (e) => {
            console.log("disconnected", e.message);
        });

        client.on("server-message", (e) => {
            const receivedData = e.message.data;
            console.log(receivedData);
            dispatch(
                addMessage({
                    chatId: receivedData.chatId,
                    message: receivedData.message,
                })
            );
        });
    } catch (error) {
        console.error("Failed to initialize pubsub client", error);
    }

    initialized = true;
    initializing = false;
}

export default pubSubClient;
