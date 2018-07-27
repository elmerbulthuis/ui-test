import { DisposableComposition } from "using-disposable";
import {
    BrowserTestContext, ServerTestContext,
} from ".";

export class FullTestContext extends DisposableComposition {
    public static async create() {
        const instance = new this();
        await instance.initialize();
        return instance;
    }

    public browser!: BrowserTestContext;
    public server!: ServerTestContext;

    private rootPath = "";
    private constructor() {
        super();
    }

    private async initialize() {
        const { rootPath } = this;
        this.server = await ServerTestContext.create(rootPath);

        const { server } = this;
        this.registerDisposable(server);
        this.browser = new BrowserTestContext(server.baseUrl);

        const { browser } = this;
        this.registerDisposable(browser);
    }
}
