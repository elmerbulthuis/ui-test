import * as fs from "fs";
import * as Koa from "koa";
import * as staticCache from "koa-static-cache";
import * as path from "path";
import { ApplicationServerConfig } from ".";
import { projectRoot } from "../utils";

export function createAssetsServer({ }: ApplicationServerConfig) {

    const koaServer = new Koa();

    walk(path.join(projectRoot, "src", "components"));

    return koaServer;

    function walk(directory: string) {
        koaServer.use(staticCache(directory));
        fs.readdirSync(directory).
            map(name => path.join(directory, name)).
            map(name => ({ name, stat: fs.statSync(name) })).
            filter(({ stat }) => stat.isDirectory()).
            map(({ name }) => name).
            forEach(walk);
    }

}
