import { Router } from "goodrouter";
import { History } from "history";
import { Middleware } from "redux";
import * as actions from "../actions";
import { ApplicationState } from "../reducers";

export function createNavigationMiddleware(
    router: Router,
    history: History,
): Middleware<ApplicationState> {
    return ({ dispatch }) => (next) => async (
        action:
            actions.GoBackAction |
            actions.NavigateAction |
            actions.ReloadAction,
    ) => {
        switch (action.type) {
            case "go-back":
                await next(action);

                history.goBack();
                break;

            case "reload": {
                const loc = history.location;
                history.replace(loc);
                break;
            }

            case "navigate": {
                await next(action);

                const { routeName, routeParams, replace } = action.payload;
                const location = router.path(routeName, routeParams);
                if (replace) history.replace(location);
                else history.push(location);
                break;
            }

            default: await next(action);
        }
    };
}
