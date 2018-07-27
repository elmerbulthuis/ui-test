import * as querystring from "querystring";
import { WebDriver } from "selenium-webdriver";
import * as URL from "url";
import { AnyPanelObject, PanelObjectConstructor } from "../panel-objects";

export interface PageObjectConstructor<TPage extends AnyPageObject> {
    new(
        driver: WebDriver,
    ): TPage;
}

export abstract class AnyPageObject<TRootPanel extends AnyPanelObject = AnyPanelObject> {

    protected readonly abstract RootPanelConstructor: PanelObjectConstructor<TRootPanel>;

    constructor(
        protected driver: WebDriver,
    ) { }

    public async getRootPanel(): Promise<TRootPanel> {
        await this.waitForReady();
        await this.isReady();

        const { driver } = this;
        const element = await driver.findElement({ tagName: "body" });
        const panel = new this.RootPanelConstructor(this, element);
        return panel;
    }

    public async getUrl() {
        const url = await this.driver.getCurrentUrl();
        return URL.parse(url, true);
    }

    public async getTitle() {
        const { driver } = this;
        return await driver.getTitle();
    }

    public async getError() {
        return "";
    }

    public async waitForReady(): Promise<void> {
        const { driver } = this;
        await driver.wait(() => this.isReady());
    }

    public async isReady(): Promise<boolean> {
        const { driver } = this;

        return await driver.executeScript<boolean>(() => {
            const { images } = window.document;
            for (
                let imageIndex = 0;
                imageIndex < images.length;
                imageIndex++
            ) {
                const image = images.item(imageIndex);
                if (!image.complete) return false;
            }
            return true;
        });
    }

    public to<TPageObject extends AnyPageObject>(
        constructor: PageObjectConstructor<TPageObject>,
    ) {
        const { driver } = this;
        const pageObject = new constructor(driver);
        return pageObject;
    }

}
