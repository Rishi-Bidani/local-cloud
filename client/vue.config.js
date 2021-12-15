const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../server/public"),
    devServer: {
        // proxy: {
        //     "^/posts": {
        //         target: "http://localhost:5000",
        //         changeOrigin: true,
        //         secure: false,
        //     },
        //     "^/gets/": {
        //         target: "http://localhost:5000",
        //         changeOrigin: true,
        //         secure: false,
        //     },
        //     "deletes/": {
        //         target: "http://localhost:5000",
        //         changeOrigin: true,
        //         secure: false,
        //     }
        // },
        proxy: "http://localhost:5000",

    },
};
