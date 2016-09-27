System.register(['./dbRunner', 'child_process'], function(exports_1, context_1) {
    /**
     * host
     * Created by dcorns on 6/27/16
     * Copyright © 2016 Dale Corns
     * Start the mongo database server the www server hello
     */
    ///<reference path='all.d.ts' />
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var DbRunner, proc;
    var webRoot;
    return {
        setters:[
            function (DbRunner_1) {
                DbRunner = DbRunner_1;
            },
            function (proc_1) {
                proc = proc_1;
            }],
        execute: function() {
            webRoot = process.argv[2] || '/public';
            DbRunner.startDb('mongo', function (err, data) {
                if (err) {
                    throw new Error('It appears that no mongo database is installed');
                }
                console.log('MongoDB running in', data);
                proc.fork('server', [webRoot]);
            });
        }
    }
});
//# sourceMappingURL=host.js.map