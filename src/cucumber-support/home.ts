import * as cucumber from "cucumber";
import { TestWorld } from ".";
import { PageBag } from ".";
import * as automation from "../automation";

cucumber.When(
    /^ik naar de home pagina ga$/i,
    async function () {
        const { testContext, bag } = this as TestWorld<PageBag>;
        bag.page = await testContext.browser.open(
            automation.HomePageObject,
            `/`,
        );
    },
);

cucumber.Then(
    /^(?:blijf|kom) ik op de home pagina$/i,
    async function () {
        const { testContext, bag } = this as TestWorld<PageBag>;
        const page = bag.page = bag.page!.to(automation.HomePageObject);
        await page.waitForCurrent({});
    });
