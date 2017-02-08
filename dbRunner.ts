/**
 * dbRunner
 * Used check for running databases and starts them if they are not running already
 * Created by dcorns on 8/4/16.
 */
///<reference path='all.d.ts' />
'use strict';
let proc = require('child_process');

class DbRunner{
  dbProc: any;
  /**
   * Starts a data base if it is not already running and then executes the callback function (currently only supports mongodb dbType 'mongo')
   * @param dbType string specifying the database type
   * @param cb function that is returned
   */
  startDb(dbType: string, cb: (err: any, data: string) => any): void {
    switch (dbType){
      case 'mongo':
        checkForRunningDb('mongo', (err, data) => {
          if(err){
            this.dbProc = proc.exec('mongod');
            return cb(null, this.dbProc.pid + ' (started by host)');
          }
          else{
            return cb(null, data);
          }
        });
        break;
      default:
        break;
    }
  }
}
/**
 * Uses pgrep to see if a database is already running (currently only supports mongodb dbType 'mongo')
 * @param dbType string specifying the database type
 * @param cb function that is returned
 */
function checkForRunningDb(dbType: string, cb: (err: any, data: string) => any): void{
  switch (dbType){
    case 'mongo':
      //Spawns a shell then executes the command within that shell, buffering any generated output.
      proc.exec('pgrep mongod', function(err, stdout){
        if(stdout){
          return cb(null, stdout);
        }
        else{
          return cb(err, null);
        }
      });
      break;
    default:
      break;
  }
}
/**
 * create instance of DbRunner
 * @type {DbRunner}
 */
let db = new DbRunner();
export = db;