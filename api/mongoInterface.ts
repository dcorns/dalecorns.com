/**
 * mongoInterface
 * Created by dcorns on 9/27/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
const cg = require('corngoose');

// interface IactivityQueryRequest{
//   type: string;
//   status?: string; //true means closed activities
//   startDateRange: string;
//   endDateRange?: string;
// }
// class ActivityQuery {
//   type: number;
//   startDateRange: Date;
//   endDateRange?: Date;
//   status?: boolean;
// }
//
// function makeActivityQueryObject(obj: IactivityQueryRequest): ActivityQuery {
//   let result = new ActivityQuery();
//   result.type = parseInt(obj.type, 10);
//   result.startDateRange = Date(obj.startDateRange);
//   if (obj.endDateRange) result.endDateRange = Date(obj.endDateRange);
//   if(obj.status) result.status = true;
//   return result;
// }