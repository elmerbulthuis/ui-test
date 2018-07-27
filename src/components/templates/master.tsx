import * as React from "react";
import * as org from "../organisms";

export interface MasterTemplateProps {
    busy: boolean;
}

export interface MasterTemplateEvents {
    onHome: () => void;
}

export class MasterTemplate extends React.PureComponent<
    MasterTemplateProps & MasterTemplateEvents
    > {
    public render() {
        const {
            children,
            onHome,
            busy,
        } = this.props;

        return <>
            <org.PageHeader onHome={onHome} />
            <org.PageContainer>{children}</org.PageContainer>
            <org.PageFooter busy={busy} />
        </>;
    }
}
