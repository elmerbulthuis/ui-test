import { ApplicationState } from "../reducers";

export function selectIsBusy(
    state: ApplicationState,
) {
    return state.busyCount > 0;
}
