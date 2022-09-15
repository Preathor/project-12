module.exports = {
    serverPort: 3000,
    webPort: 3001,
    webFolder: "../deploy/",




    // logger
    logToFile: true,
    logSettings: {
        appenders: {
            out: {type: 'stdout'},
            app: {
                type: 'file',
                filename: "./../log/server.log",
                maxLogSize: 10485760,
                compress: true,
                layout: {
                    type: "pattern",
                    pattern: "%d{yyyy-MM-ddThh:mm:ss.SSS}Z %-5p %m"
                }
            }
        },
        categories: {
            default: { appenders: [ 'out', 'app' ], level: 'debug' }
        }
    },

    // db settings
    dbSettings: {
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'someRandomUser',
        password : 'someRandomPassword',
        database: 'imeBaze',
        insecureAuth : true
    },

};
