const path = require("path");
const webpack = require("webpack")

const plugins = [];
plugins.push(new webpack.DefinePlugin({
    "process.browser": JSON.stringify(true),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
}))

if (process.env.NODE_ENV === "production") {
    plugins.push(new UglifyJsPlugin({
        sourceMap: true,
    }));
}

module.exports = {
    mode: "development",
    plugins,
    devtool: "source-map",
    entry: path.join(__dirname, "./src/client.ts"),
    output: {
        library: "client",
        path: path.join(__dirname, "pub"),
        filename: "client.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.webpack.json"
                    }
                },
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            import: false,
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            strictMath: true,
                            noIeCompat: true
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    externals: {
    },
}