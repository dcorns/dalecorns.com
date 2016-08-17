/**
 * current
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var clientRoutes = require('../clientRoutes')();
module.exports = function current(){
  var tblActivity = document.getElementById('tbl-activity');
  clientRoutes.getData('current', function(err, data){
    if(err){
      alert('No current data stored locally. Internet connection required');
      console.error(err);
      return;
    }
    buildActivityTable(data, tblActivity);
  });
};

function appendActivity(aObj, tbl){
  var row = document.createElement('tr');
  var startDate = document.createElement('td');
  var activity = document.createElement('td');
  startDate.innerText = new Date(aObj.startDate).toLocaleDateString();
  activity.innerText = aObj.activity;
  row.appendChild(activity);
  row.appendChild(startDate);
  tbl.appendChild(row);
}
function buildActivityTable(data, tbl){
  //Sort by start date using custom sort compare function
  data.sort(function(a, b){
    if(a.startDate > b.startDate) return 1;
    if(a.startDate < b.startDate) return -1;
    return 0;
  });
  var len = data.length;
  var c = 0;
  for(c; c < len; c++){
    if(!(data[c].endDate)){
      appendActivity(data[c], tbl);
    }
  }
}