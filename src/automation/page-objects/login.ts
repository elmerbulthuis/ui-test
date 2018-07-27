import { ApplicationClientPageObject } from ".";
import * as pnlo from "../panel-objects";

export class LoginPageObject
    extends ApplicationClientPageObject<pnlo.LoginRootPanelObject> {
    protected readonly RootPanelConstructor = pnlo.LoginRootPanelObject;
    protected readonly routeName = "login";
}
