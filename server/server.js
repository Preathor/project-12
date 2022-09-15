/***
 * Author: Link
 * This is front server that serves data from database
 * This is also a web server that serves data from webserver folder index.html
 * Use configuration file to specify the directory of deploy folder / web files or web page
 *
 * @type {{logToConsole: boolean, webFolder: string, serverPort: number, logToFile: boolean, jwtTokenExp: string, logSettings: {categories: {default: {level: string, appenders: [string, string]}}, appenders: {app: {layout: {pattern: string, type: string}, filename: string, compress: boolean, maxLogSize: number, type: string}, out: {type: string}}}, dbSettings: {password: string, database: string, connectionLimit: number, host: string, user: string}, webPort: number, jwtTokenSecret: string}}
 */

const settings = require("./settings");
const express = require("express");
const cron = require('node-cron');
const fs = require("fs");
const app = express();
const cors = require("cors"); // cors is for server side calls
const log4js = require("log4js");
log4js.configure(settings.logSettings);
const logger = log4js.getLogger("app");
const bodyParser = require("body-parser");
const serverPort = settings.serverPort;
const webPort = settings.webPort;
const webFolder = settings.webFolder;
let functions = require("./functions")(logger, settings);
let router = require("./router")(logger, functions, settings);

app.use(cors({
    // write this, to only allow this specific ip
    // credentials: true,
    // origin: "http://192.168.178.72:8080"
}));

app.use(express.static(webFolder));
app.get('/', (req, res) => {
    fs.existsSync(webFolder) ? res.sendFile("index.html", {root: webFolder}) : res.send("You got lost?")
});

// redirect to front for everything else. Turn this on/off
app.get('/*',function (req, res) {
    res.redirect('/');
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    req.cid = functions.getCid();
    next();
});

app.use("/app", router); // entry point to all the calls
app.listen(serverPort, () => {
    console.log(" ");
    console.log(` Front server started. FrontServer listening on port ${serverPort}!`)
});
app.listen(webPort, () => { console.log(` Web server started. FrontServer listening on port ${webPort}!`);  console.log(" ")});


