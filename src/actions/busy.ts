// tslint:disable:max-classes-per-file

import { PlainAction } from "../utils";

export class BeginBusyAction extends PlainAction {
    public readonly type: "begin-busy" = "begin-busy";
}

export class EndBusyAction extends PlainAction {
    public readonly type: "end-busy" = "end-busy";
}
