import * as React from "react";
import { applicationEndpoint } from "../../../utils";

export interface LogoEvents {
    onClick: () => void;
}
export class Logo extends React.PureComponent<LogoEvents> {
    public render() {
        return <a
            className="logo"
            onClick={this.handleClick}
            href=""
        >
            <img
                src={`${applicationEndpoint}/logo.png`}
                alt="logo gameye"
                title="logo gameye"
                height="30px"
                width="166px"
            />
        </a>;
    }

    public handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        this.props.onClick();
    }
}
