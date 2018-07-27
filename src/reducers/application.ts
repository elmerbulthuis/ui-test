import * as reducers from ".";
import { ActionWithPayload, reduceMap } from "../utils";

export interface ApplicationState {
    busyCount: reducers.BusyCountState;
    authorization: reducers.AuthorizationState;
}

export function reduceApplicationState(
    state?: ApplicationState,
    action?: any,
) {
    return reduceMap({
        busyCount: reducers.reduceBusyCountState,
        authorization: reducers.reduceAuthorization,
    }, state, action);
}
