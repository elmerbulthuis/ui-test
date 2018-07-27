import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import * as actions from "../actions";
import { ApplicationState } from "../reducers";
import { ActionWithPayload } from "../utils";

export function createBusyMiddleware(): Middleware<ApplicationState> {
    return () => (next) => async (
        action: ActionWithPayload,
    ) => {
        try {
            next(new actions.BeginBusyAction());
            await next(action);
        }
        finally {
            next(new actions.EndBusyAction());
        }
    };
}
