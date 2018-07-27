import { createApplicationServer } from "./servers";
import { startServer } from "./utils";

main(...process.argv.slice(2));

async function main(...args: string[]) {
    // tslint:disable:no-console

    const port = 8080;

    const applicationServer = createApplicationServer({
        rootPath: "",
    });

    const serverContext = await startServer(applicationServer, { port });
    console.log(`Server listening at port ${port}`);

    const signals: NodeJS.Signals[] = [
        "SIGTERM",
        "SIGINT",
    ];

    const end = async () => {
        signals.forEach(signal => process.removeListener(signal, end));

        await serverContext.dispose();
        console.log(`Server stopped`);

        process.exit(0);
    };

    signals.forEach(signal => process.addListener(signal, end));

    process.addListener("SIGTERM", end);
    process.addListener("SIGINT", end);
}
