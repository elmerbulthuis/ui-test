import { ApplicationState } from "../reducers";

export function selectIsAuthorized(
    state: ApplicationState,
) {
    return state.authorization;
}
