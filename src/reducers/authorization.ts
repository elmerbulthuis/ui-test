import {
    AuthorizedAction, NotAuthorizedAction,
} from "../actions";

export type AuthorizationState = boolean;

export function reduceAuthorization(
    state?: AuthorizationState,
    action?: AuthorizedAction | NotAuthorizedAction,
): AuthorizationState {
    if (state === undefined) state = false;
    if (action === undefined) return state;

    switch (action.type) {
        case "authorized": return true;
        case "not-authorized": return false;
        default: return state;
    }
}
