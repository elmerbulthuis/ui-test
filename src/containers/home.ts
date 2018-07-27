import { connect } from "react-redux";
import * as actions from "../actions";
import {
    HomePage, HomePageEvents, HomePageProps,
} from "../components/pages";
import { ApplicationState } from "../reducers";
import * as selectors from "../selectors";

const connectHomePageContainer = connect(
    (state: ApplicationState): HomePageProps => ({
        busy: selectors.selectIsBusy(state),
    }),
    (dispatch): HomePageEvents => ({
        onHome: () =>
            dispatch(new actions.NavigateAction("home", {})),
    }),
);
export const HomePageContainer = connectHomePageContainer(HomePage);
