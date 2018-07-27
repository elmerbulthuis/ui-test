import { AnyPageObject } from ".";
import { shallowequal } from "../../utils";
import { AnyPanelObject } from "../panel-objects";

export abstract class ApplicationClientPageObject<TRootPanel extends AnyPanelObject>
    extends AnyPageObject<TRootPanel> {

    protected abstract readonly routeName: string;

    public async isReady(): Promise<boolean> {
        const { driver } = this;
        const result =
            await driver.executeScript<boolean>(() => {
                if (!window.applicationClient) return true;
                if (!window.applicationClient.isRendering()) return false;
                return true;
            }) &&
            await super.isReady();
        return result;
    }

    public async isCurrent(parameters: object): Promise<boolean> {
        const { driver, routeName } = this;

        const currentRouteName = await this.getCurrentRouteName();
        if (currentRouteName !== routeName) return false;

        const currentRouteParameters = await this.getCurrentRouteParameters();
        if (!shallowequal(currentRouteParameters, parameters)) return false;

        return true;
    }

    public async waitForCurrent(arg: object): Promise<void> {
        const { driver } = this;
        await driver.wait(() => this.isCurrent(arg));
    }

    protected async getCurrentRouteName(): Promise<string> {
        const routeName = await this.driver.executeScript<string>(() => {
            const { applicationClient } = window;
            if (!applicationClient) return "";

            const { router } = applicationClient;
            if (!router.lastRoute) return "";

            return router.lastRoute.name;
        });
        return routeName;
    }

    protected async getCurrentRouteParameters(): Promise<any> {
        const routeParameters = await this.driver.executeScript<any>(() => {
            const { applicationClient } = window;
            if (!applicationClient) return {};

            const { router } = applicationClient;
            if (!router.lastRoute) return {};

            return router.lastParams;
        });
        return routeParameters;
    }

}
