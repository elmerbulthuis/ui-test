// tslint:disable:max-classes-per-file

import * as React from "react";

export interface FieldProps<TValue> {
    label: string;
    name: string;
    value: TValue | null;
    validation?: boolean;
    onValue: (name: string, value: TValue | null) => void;
    onDone: (name: string, value: TValue | null) => void;
}

export class TextField extends React.PureComponent<FieldProps<string>> {

    public render() {
        const { validation, label, name, value } = this.props;
        const stringValue = value || "";
        const classNames = ["form__field"];
        if (validation === false) classNames.push("form__field--invalid");

        return <div className={classNames.join(" ")}>
            <input
                className="form__input"
                type="text"
                name={name}
                value={stringValue}
                placeholder={label}
                onChange={this.valueChange}
                onBlur={this.handleBlur}
            />
        </div>;
    }

    private valueChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, onValue } = this.props;
        const target = e.currentTarget;
        const stringValue = target.value;
        const value = stringValue.trim();
        onValue(name, value);
    }

    private handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, onDone } = this.props;
        const target = e.currentTarget;
        const stringValue = target.value;
        const value = stringValue.trim();
        onDone(name, value);
    }
}
export class PasswordField extends React.PureComponent<FieldProps<string>> {

    public render() {
        const { validation, label, name, value } = this.props;
        const stringValue = value || "";
        const classNames = ["form__field"];
        if (validation === false) classNames.push("form__field--invalid");

        return <div className={classNames.join(" ")}>
            <input
                className="form__input"
                type="password"
                name={name}
                value={stringValue}
                placeholder={label}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            />
        </div>;
    }

    private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, onValue } = this.props;
        const target = e.currentTarget;
        const stringValue = target.value;
        const value = stringValue;
        onValue(name, value);
    }

    private handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, onDone } = this.props;
        const target = e.currentTarget;
        const stringValue = target.value;
        const value = stringValue;
        onDone(name, value);
    }
}
