import { WebDriver, WebElement } from "selenium-webdriver";
import { AnyPageObject } from "../page-objects";

export interface PanelObjectConstructor<T extends AnyPanelObject> {
    new(
        page: AnyPageObject,
        contextElement: WebElement,
    ): T;
}

export abstract class AnyPanelObject {
    constructor(
        protected page: AnyPageObject,
        protected contextElement: WebElement,
    ) { }
}
