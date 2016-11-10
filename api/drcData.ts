/**
 * activityData
 * Created by dcorns on 9/29/16
 * Copyright © 2016 Dale Corns
 */
///<reference path='../all.d.ts' />
'use strict';
let cg = require('corngoose');
  export class ActivityData{
    _id: string;
    activity: string;
    startDate: string;
    endDate: string;
    link: string;
    details: string;
    type: number;
  }

