import { RouteConfig } from "goodrouter";
import * as React from "react";
import * as containers from "../containers";

export function createHomeRoute(): RouteConfig {
    return {
        name: "home",
        parent: "authorized-context",
        path: "/",
        render() {
            return <containers.HomePageContainer />;
        },
    };
}
