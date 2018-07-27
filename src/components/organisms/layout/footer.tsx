import * as React from "react";

export interface PageFooterProps {
    busy: boolean;
}

export class PageFooter extends React.PureComponent<PageFooterProps> {
    public render() {
        const { busy } = this.props;

        return <div className="page-footer">
            Footer! {busy && <>busy...</>}
        </div>;
    }
}
