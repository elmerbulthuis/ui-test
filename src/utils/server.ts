import * as net from "net";
import { Disposable } from "using-disposable";

export async function startServer(server: net.Server, options: net.ListenOptions) {
    const { env } = process;

    await new Promise((resolve, reject) => {
        server.listen(options, (err: any) => {
            if (err) reject(err);
            else resolve();
        });
    });

    const socketPool = new Set<net.Socket>();
    server.on("connection", socket => {
        socketPool.add(socket);
        socket.once("close", () => socketPool.delete(socket));
    });

    const dispose = async () => {
        await new Promise(resolve => {
            const maybeResolve = () => {
                if (socketPool.size === 0) resolve();
            };
            socketPool.forEach(socket => {
                socket.once("close", maybeResolve);
                socket.destroy();
            });
            maybeResolve();
        });

        await new Promise((resolve, reject) => {
            server.close((err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };

    return { dispose } as Disposable;
}
