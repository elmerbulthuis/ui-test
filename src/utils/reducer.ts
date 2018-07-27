import { ActionWithPayload } from ".";

export type ReducerMap<S extends object> = {
    [ChildKey in keyof S]: Reducer<S[ChildKey]>;
};

export type Reducer<S> = (state?: S, action?: ActionWithPayload) => S;

export function reduceMap<S extends object>(
    reducerMap: ReducerMap<S>,
    state?: S,
    action?: ActionWithPayload,
): S {
    const childKeys = Object.keys(reducerMap) as Array<keyof S>;

    if (state === undefined) state = getInitialState();
    if (action === undefined) return state;
    return reduceNextState(state, action);

    // tslint:disable-next-line:no-shadowed-variable
    function reduceNextState(state: S, action: ActionWithPayload): S {
        let nextState = state;
        for (const childKey of childKeys) {
            const reducer = reducerMap[childKey];
            const childState = state[childKey];
            const nextChildState = reducer(childState, action);
            if (nextChildState === childState) continue;
            nextState = { ...(nextState as any), ...{ [childKey]: nextChildState } };
        }
        return nextState;
    }

    function getInitialState(): S {
        const initialState: Partial<S> = {};
        for (const childKey of childKeys) {
            const reducer = reducerMap[childKey];
            initialState[childKey] = reducer();
        }
        return initialState as S;
    }
}
