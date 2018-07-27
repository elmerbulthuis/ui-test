import * as React from "react";
import * as mol from "../../molecules";

export interface PageHeaderEvents {
    onHome: () => void;
}
export class PageHeader extends React.PureComponent<PageHeaderEvents> {
    public render() {
        const { onHome } = this.props;

        return <div className="page-header">
            <mol.Logo onClick={onHome} />
        </div>;
    }
}
