System.register(["express"], function(exports_1, context_1) {
    /**
     * server
     * Created by dcorns on 6/7/16
     * Copyright © 2016 Dale Corns
     */
    /// <reference path="all.d.ts" />
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var express;
    var corngoose, app, server_ip_address, server_port, server, path, webRoot;
    return {
        setters:[
            function (express_1) {
                express = express_1;
            }],
        execute: function() {
            corngoose = require("corngoose");
            app = express();
            server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
            server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
            path = require('path');
            //Serve static assets from public
            webRoot = process.argv[2] || '/public';
            app.use(express.static(path.join(__dirname, webRoot)));
            app.get('/', function (req, res) {
                console.log('get request');
                res.setHeader('Content-Security-Policy', "script-src 'self';" +
                    "style-src 'self'");
                res.status(200);
                res.header('Content-Type', 'text/html');
                res.sendFile('index.html');
                res.end();
            });
            require('./api/routes')(app);
            //if db server had to be started by host, this gives it some time before trying to connect
            setTimeout(function () { corngoose.startDB('drc'); }, 1000);
            server = app.listen(server_port, server_ip_address, function () {
                var host = server.address().address;
                var port = server.address().port;
                console.log('Server listening on ' + host + ', port: ' + port);
            });
            //Add this line for testing with superTest
            module.exports = server;
        }
    }
});
//# sourceMappingURL=server.js.map