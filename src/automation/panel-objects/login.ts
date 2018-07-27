// tslint:disable:max-classes-per-file

import { AnyPanelObject } from ".";

export class LoginRootPanelObject extends AnyPanelObject {

    public async setEmail(value: string): Promise<void> {
        const { contextElement } = this;
        const driver = contextElement.getDriver();

        const inputElement = await contextElement.findElement({
            css: `form input[name=email]`,
        });
        await inputElement.sendKeys(value);
    }

    public async setPassword(value: string): Promise<void> {
        const { contextElement } = this;
        const driver = contextElement.getDriver();

        const inputElement = await contextElement.findElement({
            css: `form input[name=password]`,
        });
        await inputElement.sendKeys(value);
    }

    public async clickLogin(): Promise<void> {
        const { contextElement } = this;
        const driver = contextElement.getDriver();

        const buttonElement = await contextElement.findElement({
            css: `form button[type=submit]`,
        });
        await buttonElement.click();
    }
}
