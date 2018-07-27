import * as cucumber from "cucumber";
import { hour, minute, second } from "msecs";
import { delay } from "promise-u";
import { DisposableComposition } from "using-disposable";
import { FullTestContext } from "../test";

export class TestWorld<TBag extends object = any>
    extends DisposableComposition
    implements cucumber.World {

    public testContext!: FullTestContext;
    public bag: Partial<TBag> = {};

    private readonly attach: () => void;
    private readonly parameters: any;

    constructor({ attach, parameters }: any) {
        super();

        this.attach = attach;
        this.parameters = parameters;
    }

    public async initialize() {
        this.testContext = await FullTestContext.create();
        this.registerDisposable(this.testContext);
    }
}

cucumber.setWorldConstructor(TestWorld);
if (
    process.execArgv.
        some(v => /^(?:--debug|--debug-brk|--inspect|--inspect-brk)\b/.test(v))
) {
    cucumber.setDefaultTimeout(1 * hour);
}
else {
    cucumber.setDefaultTimeout(1 * minute);
}

cucumber.Before(async function () {
    const world = this as TestWorld;
    await world.initialize();
});

cucumber.After(async function () {
    const world = this as TestWorld;
    await world.dispose();
});

cucumber.After(async function () {
    const world = this as TestWorld;
    await delay(2 * second);
});
