import { RouteConfig } from "goodrouter";
import * as React from "react";
import * as containers from "../containers";

export function createLoginRoute(): RouteConfig {
    return {
        name: "login",
        path: "/login",
        render() {
            return <containers.LoginPageContainer />;
        },
    };
}
