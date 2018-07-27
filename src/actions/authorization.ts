// tslint:disable:max-classes-per-file

import { ActionWithPayload, PlainAction } from "../utils";

export interface LoginPayload {
    email: string;
    password: string;
}
export class LoginAction extends ActionWithPayload<LoginPayload> {
    public readonly type: "login" = "login";
    constructor(email: string, password: string) {
        super({ email, password });
    }
}

export class LogoutAction extends PlainAction {
    public readonly type: "logout" = "logout";
}

export class AuthorizedAction extends PlainAction {
    public readonly type: "authorized" = "authorized";
}

export class NotAuthorizedAction extends PlainAction {
    public readonly type: "not-authorized" = "not-authorized";
}
