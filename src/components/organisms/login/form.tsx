import * as React from "react";
import * as mdl from "../../../models";
import { isEmail, isEmpty, ModelFormBase } from "../../../utils";
import * as mol from "../../molecules";

export interface LoginFormProps {
    /**
     * Disable the form for like when things are loading
     */
    disabled: boolean;
}

export interface LoginFormEvents {
    onCancel: () => void;
    onLogin: (model: mdl.LoginModel) => void;
}

export class LoginForm extends ModelFormBase<
    mdl.LoginModel,
    LoginFormProps & LoginFormEvents> {

    public render() {
        const {
            onCancel,
            disabled,
        } = this.props;

        const isValid = true;

        return <mol.Form onSubmit={this.handleLogin} disabled={disabled}>
            <mol.TextField
                name="email"
                label="email address"
                value={this.getFieldValue("email")}
                validation={this.getFieldValidation("email")}
                onValue={this.handleFieldValue}
                onDone={this.handleFieldDone}
            />

            <mol.PasswordField
                name="password"
                label="password"
                value={this.getFieldValue("password")}
                validation={this.getFieldValidation("password")}
                onValue={this.handleFieldValue}
                onDone={this.handleFieldDone}
            />

            <mol.FormButtonGroup>
                <mol.FormButton onClick={onCancel}>
                    Cancel
                </mol.FormButton>
                <mol.FormSubmitButton>
                    Login
                    </mol.FormSubmitButton>
            </mol.FormButtonGroup>
        </mol.Form >;
    }

    protected calculateModelError(model: mdl.LoginModel) {
        const email =
            isEmpty(model.email) ||
            !isEmail(model.email);

        const password =
            isEmpty(model.password);

        return {
            email,
            password,
        };
    }

    private handleLogin = () => {
        if (this.getModelErrorCount()) {
            this.setModelDirty();
            return;
        }

        const { model } = this.state;
        const { onLogin } = this.props;
        onLogin(model);
    }

}
