import * as client from "./client";

declare global {
    interface Window {
        applicationClient: client.TestApplicationClient;
        client: typeof client;
    }
}
