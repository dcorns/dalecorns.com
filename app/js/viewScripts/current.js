/**
 * current
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var clientRoutes = require('../clientRoutes')();
module.exports = function current(){
  var tblActivity = document.getElementById('tbl-activity');
  var tblComplete = document.getElementById('tbl-complete');
  clientRoutes.getData('current', function(err, data){
    if(err){
      alert('No current data stored locally. Internet connection required');
      console.error(err);
      return;
    }
    buildActivityTable(data, tblActivity, tblComplete);
  });
};

function appendActivity(aObj, tbl, isComplete){
  var row = document.createElement('tr');
  var startDate = document.createElement('td');
  var activityLink = document.createElement('td');
  var activity = document.createElement('td');
  var endDate = isComplete ? document.createElement('td') : null;
  startDate.innerText = new Date(aObj.startDate).toLocaleDateString();
  activity.innerText = aObj.activity;

  if(aObj.link){
    var anchor = document.createElement('a'), anchorIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), anchorUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    anchor.href = aObj.link;
    anchorIcon.setAttribute('class', 'icon');
    anchorUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href','#icon-link');
    anchorIcon.appendChild(anchorUse);
    anchor.appendChild(anchorIcon);
    activityLink.appendChild(anchor);
  }

  row.appendChild(activity);
  row.appendChild(activityLink);
  row.appendChild(startDate);
  if(endDate){
    endDate.innerText = new Date(aObj.endDate).toLocaleDateString();
    row.appendChild(endDate);
  }
  tbl.appendChild(row);
}
function buildActivityTable(data, tblNow, tblOld){
  //Sort by start date using custom sort compare function
  data = data.json;
  data.sort(function(a, b){
    return new Date(a.startDate) - new Date(b.startDate);
  });
  var len = data.length;
  var c = 0;
  for(c; c < len; c++){
    if(!(data[c].endDate)){
      appendActivity(data[c], tblNow, false);
    }
    else{
      appendActivity(data[c], tblOld, true);
    }
  }
}