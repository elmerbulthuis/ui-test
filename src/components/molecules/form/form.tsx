import * as React from "react";

export interface FormStateProps {
    disabled: boolean;
}

export interface FormDispatchProps {
    onSubmit: () => void;
}

export class Form extends React.PureComponent<FormStateProps & FormDispatchProps> {
    public render() {
        const { children, disabled } = this.props;

        return <form onSubmit={this.handleSubmit}>
            <fieldset disabled={disabled}>
                {children}
            </fieldset>
        </form>;
    }

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { onSubmit } = this.props;
        onSubmit();
    }

}
