import * as React from "react";
import * as mol from "../../molecules";

export class LoginHeader extends React.PureComponent {
    public render() {
        const { children } = this.props;

        return <>
            <mol.Title>Login please!!!</mol.Title>
        </>;
    }
}
