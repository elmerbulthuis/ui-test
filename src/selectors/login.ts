import * as mdl from "../models";

export function initialLoginModel() {
    const loginModel: mdl.LoginModel = {
        email: "",
        password: "",
    };
    return loginModel;
}
