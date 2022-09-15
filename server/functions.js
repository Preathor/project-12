const Q = require("q");
const async = require("async");
const WebSocketServer = require("ws");


module.exports = (logger, settings) => {
    let cidAddOn = 0;
    let cid;

    // MYSQL localhost Data
    let mySql = require('mysql');
    let connectionPool = mySql.createPool(settings.dbSettings);
    let connection = mySql.createConnection(settings.dbSettings);

    const wss = new WebSocketServer.Server({port: 9001});

    wss.on("connection", ws => {
        // sending message
        ws.on("message", data => {
            console.log(`Client has sent us: ${data}`)
        });

        setInterval(sendWebSocketInformation, 50);

        function sendWebSocketInformation() {
            ws.send(JSON.stringify({
               someValue: "1"
            }))
        }
    });

    let functions = {
        getCid: () => {
            cid = new Date().getTime().toString() + cidAddOn.toString();
            this.cidAddOn = this.cidAddOn + 1;
            if (this.cidAddOn > 1000) this.cidAddOn = 0;
            return cid;
        },
        writeLog: (type, app, direction, action, message) => {

            let jsonMessage = {
                cid: cid,
                type: type,
                app: app || "[NO app]",
                direction: direction || "[NO direction]",
                action: action || ["NO action"],
                message: message || ["NO message"]
            };

            if (settings.logToFile && settings.logToFile === true) {
                switch (type) {
                    case "info":
                        logger.info(JSON.stringify(jsonMessage));
                        break;
                    case "error":
                        logger.error(JSON.stringify(jsonMessage));
                        break;
                }
            }
        },
        getUporabniki: () => {
            let Q = require("q");
            let dfd = Q.defer();
            connectionPool.getConnection((error, connection) => {
                if (error) dfd.resolve({responseCode: 500, message: "Database error while trying to getUporabniki"});
                connectionPool.query(
                    'WRITE SELECTION QUERY',
                    (error, result) => {
                        if (connection) connection.release();
                        if (error) dfd.resolve({responseCode: 500, message: "Database error."});
                        dfd.resolve({responseCode: 200, uporabniki: result.length === 0 ? [] : result});
                    }
                );
            });
            return dfd.promise;
        },
        getSettings: () => {
            let Q = require("q");
            let dfd = Q.defer();
            connectionPool.getConnection((error, connection) => {
                if (error) dfd.resolve({responseCode: 500, message: "Database error while trying to getSettings"});
                connectionPool.query(
                    'WRITE SELECTION QUERY',
                    (error, result) => {
                        if (connection) connection.release();
                        if (error) dfd.resolve({responseCode: 500, message: "Database error."});
                        dfd.resolve({responseCode: 200, settings: result.length === 0 ? [] : result});
                    }
                );
            });
            return dfd.promise;
        },



    };
    return functions;
};
