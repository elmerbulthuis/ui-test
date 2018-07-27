import { Router } from "goodrouter";
import * as Koa from "koa";
import { ApplicationServerConfig } from ".";
import { TestApplicationConfig } from "../applications";
import * as routes from "../routes";

export function createPageServer(
    {
        rootPath,
    }: ApplicationServerConfig,
) {

    const koaServer = new Koa();
    const routeList = [
        routes.createHomeRoute(),
        routes.createLoginRoute(),
    ];
    const router = new Router(routeList);
    const applicationConfig: TestApplicationConfig = {
        rootPath,
    };

    koaServer.use((ctx, next) => {
        const [routeConfig] = router.matchRoute(ctx.url);
        if (routeConfig === null) {
            return next();
        }

        ctx.body = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gameye</title>
    <script src="${rootPath}/client.js"></script>
</head>

<body>
    <div id="application"></div>
    <script>
        window.applicationClient = new client.TestApplicationClient(
            window,
            document.getElementById("application"),
            ${JSON.stringify(applicationConfig)}
        );
        window.applicationClient.run();
    </script>
</body>

</html>
`;
    });

    return koaServer;
}
