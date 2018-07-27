import { RouteConfig } from "goodrouter";
import * as React from "react";
import * as actions from "../actions";
import { ApplicationState } from "../reducers";
import * as selectors from "../selectors";

export function createAuthorizedContextRoute(): RouteConfig {
    return {
        name: "authorized-context",
        validate({ context, local }) {
            const { store } = context;
            const state: ApplicationState = store.getState();
            const authorized = selectors.selectIsAuthorized(state);
            if (!authorized) {
                store.dispatch(new actions.NavigateAction("login", {}, true));
                return false;
            }
            return true;
        },
    };
}
