import { ApplicationClientPageObject } from ".";
import * as pnlo from "../panel-objects";

export class HomePageObject
    extends ApplicationClientPageObject<pnlo.HomeRootPanelObject> {
    protected readonly RootPanelConstructor = pnlo.HomeRootPanelObject;
    protected readonly routeName = "home";
}
