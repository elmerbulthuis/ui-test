// tslint:disable:max-classes-per-file

import * as React from "react";

export class FormButtonGroup extends React.PureComponent {
    public render() {
        const { children } = this.props;

        return <div>
            {children}
        </div>;
    }
}

export interface FormButtonEvents {
    onClick: () => void;
}

export class FormButton extends React.PureComponent<FormButtonEvents> {
    public render() {
        const { children } = this.props;

        return <button
            type="button"
            onClick={this.handleClick}
        >
            {children}
        </button>;
    }

    private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { onClick } = this.props;
        onClick();
    }
}

export class FormSubmitButton extends React.PureComponent {
    public render() {
        const { children } = this.props;

        return <button
            type="submit"
        >{children}</button>;
    }
}
