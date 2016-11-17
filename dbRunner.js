/**
 * Created by dcorns on 8/4/16.
 */
///<reference path='all.d.ts' />
'use strict';
let proc = require('child_process');
class DbRunner {
    startDb(dbType, cb) {
        switch (dbType) {
            case 'mongo':
                checkForRunningDb('mongo', (err, data) => {
                    if (err) {
                        this.dbProc = proc.exec('mongod');
                        cb(null, this.dbProc.pid + ' (started by host)');
                    }
                    else {
                        cb(null, data);
                    }
                });
                break;
            default:
                break;
        }
    }
}
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
let db = new DbRunner();
module.exports = db;
//# sourceMappingURL=dbRunner.js.map