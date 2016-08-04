/**
 * host
 * Created by dcorns on 6/27/16
 * Copyright © 2016 Dale Corns
 * Start the mongo database server the www server hello
 */
///<reference path='all.d.ts' />
'use strict';
var DbRunner = require('./dbRunner');
var proc = require('child_process');
DbRunner.startDb('mongo', function (err, data) {
    if (err) {
        throw new Error('It appears that no mongo database is installed');
    }
    console.log('MongoDB running in', data);
    proc.fork('server');
});
//# sourceMappingURL=host.js.map