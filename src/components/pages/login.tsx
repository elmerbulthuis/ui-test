import * as React from "react";
import * as mdl from "../../models";
import { LoginForm, LoginHeader } from "../organisms";
import { MasterTemplate } from "../templates";

export interface LoginPageProps {
    busy: boolean;
    loginModel: mdl.LoginModel;
}

export interface LoginPageEvents {
    onHome: () => void;
    onLogin: (model: mdl.LoginModel) => void;
    onCancel: () => void;
}

export class LoginPage extends React.PureComponent<
    LoginPageProps & LoginPageEvents
    > {
    public render() {
        const {
            loginModel,
            busy,
            onHome,
            onLogin,
            onCancel,
        } = this.props;

        return <MasterTemplate
            busy={busy}
            onHome={onHome}
        >
            <LoginHeader />
            <LoginForm
                model={loginModel}
                disabled={busy}
                onCancel={onCancel}
                onLogin={onLogin}
            />
        </MasterTemplate>;
    }

}
