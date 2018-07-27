import * as net from "net";
import { DisposableComposition } from "using-disposable";
import { createApplicationServer } from "../servers";
import { startServer } from "../utils";

export class ServerTestContext extends DisposableComposition {

    public static async create(
        rootPath: string,
    ) {
        const instance = new this(
            rootPath,
        );
        await instance.initialize();
        return instance;
    }

    public port!: number;
    public baseUrl!: string;

    private constructor(
        private rootPath: string,
    ) {
        super();
    }

    private async initialize() {
        const { rootPath } = this;

        const applicationServer = createApplicationServer({
            rootPath,
        });

        const serverDisposable = await startServer(applicationServer, { port: 0 });
        this.registerDisposable(serverDisposable);

        const { port } = applicationServer.address() as net.AddressInfo;

        this.port = port;
        this.baseUrl = `http://localhost:${port}${rootPath}`;

    }
}
