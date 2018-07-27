// tslint:disable:max-classes-per-file

import { ActionWithPayload, PlainAction } from "../utils";

export class GoBackAction extends PlainAction {
    public readonly type: "go-back" = "go-back";
}

export class ReloadAction extends PlainAction {
    public readonly type: "reload" = "reload";
}

export interface NavigatePayload {
    routeName: string;
    routeParams: any;
    replace: boolean;
}
export class NavigateAction extends ActionWithPayload<NavigatePayload> {
    public readonly type: "navigate" = "navigate";
    constructor(routeName: string, routeParams: any, replace = false) {
        super({
            routeName,
            routeParams,
            replace,
        });
    }
}
