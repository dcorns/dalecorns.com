/**
 * Created by dcorns on 8/4/16.
 */
///<reference path='all.d.ts' />
'use strict';
var proc = require('child_process');
var DbRunner = (function () {
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
var db = new DbRunner();
module.exports = db;
//# sourceMappingURL=dbRunner.js.map