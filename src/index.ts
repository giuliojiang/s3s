import express = require("express");

const createApp = (): express.Express => {

    const app = express();

    app.get("/", (req, res) => {
        res.redirect("/v/home");
    });

    return app;

};

export {createApp};
