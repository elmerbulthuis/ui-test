import { second } from "msecs";
import * as webdriver from "selenium-webdriver";
import { DisposableComposition } from "using-disposable";
import { AnyPageObject, PageObjectConstructor } from "../automation";

export class BrowserTestContext extends DisposableComposition {

    private builder = new webdriver.Builder();

    constructor(protected baseUrl: string) {
        super();
    }

    public async open<T extends AnyPageObject>(
        constructor: PageObjectConstructor<T>,
        path: string,
    ): Promise<T> {
        const driver = await this.getDriver();
        const { baseUrl } = this;

        const url = `${baseUrl}${path}`;
        await driver.navigate().to(url);
        const pageObject = new constructor(driver);
        return pageObject;
    }

    private async getDriver() {
        const { builder } = this;

        const driver = await builder.build();
        driver.manage().timeouts().implicitlyWait(5 * second);
        this.registerDisposable({
            dispose: () => driver.quit(),
        });

        return driver;
    }

}
