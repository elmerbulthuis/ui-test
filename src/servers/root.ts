import * as Koa from "koa";
import * as mount from "koa-mount";
import * as staticCache from "koa-static-cache";
import * as path from "path";
import {
    ApplicationServerConfig,
    createAssetsServer,
    createNoContentServer,
    createPageServer,
} from ".";
import { projectRoot } from "../utils";

export function createRootServer(config: ApplicationServerConfig) {
    const koaServer = new Koa();

    koaServer.use(staticCache(path.join(projectRoot, "pub")));
    koaServer.use(mount("/heartbeat", createNoContentServer(config)));
    koaServer.use(mount("/", createPageServer(config)));
    koaServer.use(mount("/", createAssetsServer(config)));

    return koaServer;
}
