import * as cucumber from "cucumber";
import { TestWorld } from ".";
import { PageBag } from ".";
import * as automation from "../automation";

cucumber.When(
    /^ik naar de login pagina ga$/i,
    async function () {
        const { testContext, bag } = this as TestWorld<PageBag>;
        bag.page = await testContext.browser.open(
            automation.LoginPageObject,
            `/login`,
        );
    },
);

cucumber.Then(
    /^(?:blijf|kom) ik op de login pagina$/i,
    async function () {
        const { testContext, bag } = this as TestWorld<PageBag>;
        const page = bag.page = bag.page!.to(automation.LoginPageObject);
        await page.waitForCurrent({});
    });

cucumber.Then(
    /^ik voer correcte login gegevens in$/i,
    async function () {
        const { testContext, bag } = this as TestWorld<PageBag>;
        if (bag.page instanceof automation.LoginPageObject) {
            const panel = await bag.page.getRootPanel();
            panel.setEmail("elmer@gameye.com");
            panel.setPassword("hupsakee");
            panel.clickLogin();
        }

    });
