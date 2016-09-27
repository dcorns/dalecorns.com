System.register([], function(exports_1, context_1) {
    /**
     * Created by dcorns on 8/4/16.
     */
    ///<reference path='all.d.ts' />
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var proc, DbRunner, db;
    function checkForRunningDb(dbType, cb) {
        switch (dbType) {
            case 'mongo':
                //Spawns a shell then executes the command within that shell, buffering any generated output.
                proc.exec('pgrep mongod', function (err, stdout) {
                    if (stdout) {
                        cb(null, stdout);
                    }
                    else {
                        cb(err, null);
                    }
                });
                break;
            default:
                break;
        }
    }
    return {
        setters:[],
        execute: function() {
            proc = require('child_process');
            DbRunner = (function () {
                function DbRunner() {
                }
                DbRunner.prototype.startDb = function (dbType, cb) {
                    var _this = this;
                    switch (dbType) {
                        case 'mongo':
                            checkForRunningDb('mongo', function (err, data) {
                                if (err) {
                                    _this.dbProc = proc.exec('mongod');
                                    cb(null, _this.dbProc.pid + ' (started by host)');
                                }
                                else {
                                    cb(null, data);
                                }
                            });
                            break;
                        default:
                            break;
                    }
                };
                return DbRunner;
            }());
            db = new DbRunner();
        }
    }
});
//# sourceMappingURL=dbRunner.js.map