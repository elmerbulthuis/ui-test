import {
    BeginBusyAction,
    EndBusyAction,
} from "../actions";

export type BusyCountState = number;

export function reduceBusyCountState(
    state?: BusyCountState,
    action?: BeginBusyAction | EndBusyAction,
): BusyCountState {
    if (state === undefined) state = 0;
    if (action === undefined) return state;

    switch (action.type) {
        case "begin-busy": return state + 1;
        case "end-busy": return state - 1;
        default: return state;
    }
}
