import * as React from "react";
import * as mol from "../../molecules";

export class PageContainer extends React.PureComponent {
    public render() {
        const { children } = this.props;

        return <main className="page-container">
            {children}
        </main>;
    }
}
