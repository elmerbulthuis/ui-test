import * as Koa from "koa";
import { ApplicationServerConfig } from ".";

export function createNoContentServer({ }: ApplicationServerConfig) {
    const koaServer = new Koa();
    koaServer.use(ctx => {
        ctx.status = 204;
    });
    return koaServer;
}
