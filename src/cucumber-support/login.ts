import * as cucumber from "cucumber";
import { TestWorld } from ".";
import { PageBag } from ".";
import * as automation from "../automation";

cucumber.Then(
    /^(?:blijf|kom) ik op de login pagina$/i,
    async function () {
        const { testContext, bag } = this as TestWorld<PageBag>;
        const page = bag.page = bag.page!.to(automation.LoginPageObject);
        await page.waitForCurrent({});
    });
