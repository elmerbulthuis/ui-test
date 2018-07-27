import { connect } from "react-redux";
import * as actions from "../actions";
import {
    LoginPage, LoginPageEvents, LoginPageProps,
} from "../components/pages";
import { ApplicationState } from "../reducers";
import * as selectors from "../selectors";

const connectLoginPageContainer = connect(
    (state: ApplicationState): LoginPageProps => ({
        busy: selectors.selectIsBusy(state),
        loginModel: selectors.initialLoginModel(),
    }),
    (dispatch): LoginPageEvents => ({
        onHome: () =>
            dispatch(new actions.NavigateAction("home", {})),
        onCancel: () =>
            dispatch(new actions.GoBackAction()),
        onLogin: ({ email, password }) =>
            dispatch(new actions.LoginAction(email, password)),

    }),
);
export const LoginPageContainer = connectLoginPageContainer(LoginPage);
