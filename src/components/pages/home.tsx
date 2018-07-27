import * as React from "react";
import { HomeHeader } from "../organisms";
import { MasterTemplate } from "../templates";

export interface HomePageProps {
    busy: boolean;
}

export interface HomePageEvents {
    onHome: () => void;
}

export class HomePage extends React.PureComponent<
    HomePageProps & HomePageEvents
    > {
    public render() {
        const {
            busy,
            onHome,
        } = this.props;

        return <MasterTemplate
            busy={busy}
            onHome={onHome}
        >
            <HomeHeader />
        </MasterTemplate>;
    }

}
