import * as http from "http";
import * as Koa from "koa";
import * as mount from "koa-mount";
import { createRootServer } from ".";

export interface ApplicationServerConfig {
    rootPath: string;
}

export function createApplicationServer(config: ApplicationServerConfig) {
    const { rootPath } = config;

    const koaServer = new Koa();
    koaServer.proxy = true;
    koaServer.use(mount(rootPath || "/", createRootServer(config)));

    const httpServer = http.createServer();
    httpServer.on("request", koaServer.callback());

    return httpServer;
}
