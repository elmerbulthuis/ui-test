import * as React from "react";

export class Title extends React.PureComponent {
    public render() {
        const { children } = this.props;
        return <div className="title">{children}</div>;
    }
}
