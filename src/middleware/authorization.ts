import { second } from "msecs";
import { delay } from "promise-u";
import { Middleware } from "redux";
import * as actions from "../actions";
import { ApplicationState } from "../reducers";

export function createAuthorizationMiddleware(): Middleware<ApplicationState> {
    return ({ dispatch }) => (next) => async (
        action:
            actions.LoginAction |
            actions.LogoutAction |
            actions.AuthorizedAction |
            actions.NotAuthorizedAction,
    ) => {
        switch (action.type) {
            case "login": {
                await next(action);

                await delay(3 * second);

                const { email, password } = action.payload;
                if (email === "elmer@gameye.com" && password === "hupsakee") {
                    await dispatch(new actions.AuthorizedAction());
                }
                else {
                    await dispatch(new actions.NotAuthorizedAction());
                }
                break;
            }

            case "logout": {
                await next(action);
                await dispatch(new actions.NotAuthorizedAction());
                break;
            }

            case "authorized":
            case "not-authorized": {
                await next(action);
                await dispatch(new actions.NavigateAction("home", {}, true));
            }

            default: await next(action);
        }
    };
}
