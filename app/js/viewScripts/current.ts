/**
 * current
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var clientRoutes = require('../clientRoutes')();
module.exports = function current() {
  let tblActivity: HTMLTableElement = <HTMLTableElement>document.getElementById('tbl-activity');
  let tblComplete: HTMLTableElement = <HTMLTableElement>document.getElementById('tbl-complete');
  let dateRange: HTMLElement = document.getElementById('date-range');
  let btnActivityMenu: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btn-activity-menu');
  let activityMenu: HTMLMenuElement = <HTMLMenuElement>document.getElementById('menu-activities-category');
  btnActivityMenu.addEventListener('click', function () {
    activityMenu.classList.toggle('hide');
  });
  let typeIdx: string = window.sessionStorage.getItem('typeIndex') || '0';
  //Put the daterange component inside of date-range
  mySkills.route('daterange', 'date-range');
  dateRange.addEventListener('dateRangeChange', (e) => {
    let sdate = e.target.dataset.startDate;
    let edate = e.target.dataset.endDate;
    getTableData(typeIdx, {start: sdate, end: edate}, (err, data) => {
      if (err) {
        playTableDataError(err);
        return;
      }
      sortTableData(data, 'endDate');
      loadNewTableHtml(tblComplete, data, true);
    });
  });
  getTableData(typeIdx, null, (err, data) => {
    if (err) {
      playTableDataError(err);
      return;
    }
    buildActivityTable(data, tblActivity, tblComplete, dateRange);
  });
  clientRoutes.getData('currentCategoryMenu', function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    buildMenu(data.json[0].activityCategories, activityMenu);
  });
};
//expects tbl to be a tbody element
function appendActivity(aObj, tbl, isComplete) {
  let row: HTMLTableRowElement = document.createElement('tr');
  let startDate: HTMLTableDataCellElement = document.createElement('td');
  let activityLink: HTMLTableDataCellElement = document.createElement('td');
  let activity: HTMLTableDataCellElement = document.createElement('td');
  activity.innerText = aObj.activity;
  let endDate = isComplete ? document.createElement('td') : null;
  startDate.innerText = aObj.startDate;
  if (aObj.link) {
    var anchor = document.createElement('a'), anchorIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), anchorUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    anchor.href = aObj.link;
    anchorIcon.setAttribute('class', 'icon');
    anchorUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#icon-link');
    anchorIcon.appendChild(anchorUse);
    anchor.appendChild(anchorIcon);
    activityLink.appendChild(anchor);
  }

  row.appendChild(activity);
  row.appendChild(activityLink);
  row.appendChild(startDate);
  if (endDate) {
    endDate.innerText = aObj.endDate;// new Date(aObj.endDate).toLocaleDateString();
    row.appendChild(endDate);
  }
  if (aObj['details']) {
    addDetails(row, aObj.details, 'activity-detail');
  }
  tbl.appendChild(row);
}
/**
 * @function buildActivityTable
 * Builds the completed and incomplete activity tables
 * Depends on the splitAndIndexData and appendActivity functions
 * @param data
 * @param tblNow
 * @param tblOld
 * @param dateRange
 */
function buildActivityTable(data, tblNow, tblOld, dateRange) {
  let splitData = splitAndIndexData(data);
  sortTableData(splitData.incomplete, 'startDate');
  loadNewTableHtml(tblNow, splitData.incomplete, false);
  sortTableData(splitData.complete, 'endDate');
  loadNewTableHtml(tblOld, splitData.complete, true);
  setDateRange(splitData.complete, dateRange);
}
/**
 * @function addDetails
 * Prepends a button to click for details on the first td of the rowIn. Adds a data-details attribute to rowIn and sets its value to details. Adds an event listener to set the innerHTML of the element with the id of viewContainer to data-details and toggle display of viewContainer below the row when the button is clicked. Depends on tableInsertView
 * @param rowIn tr
 * @param details String
 * @param viewContainer
 */
function addDetails(rowIn, details, viewContainer) {
  let btn = document.createElement('button');
  btn.textContent = '*';
  rowIn.setAttribute('data-details', details);
  btn.addEventListener('click', function () {
    let detailSection = document.getElementById(viewContainer);
    let row = this.parentNode.parentNode;
    detailSection.innerHTML = row.getAttribute('data-details');
    tableInsertView(detailSection, row);
  });
  rowIn.childNodes[0].insertBefore(btn, rowIn.childNodes[0].childNodes[0]);
}

function buildMenu(data, menuElement) {
  var menuCount = 0;
  data.forEach(function (item) {
    let btn = document.createElement('button');
    btn.textContent = item;
    btn.value = menuCount;
    btn.addEventListener('click', function () {
      var tblActivity = document.getElementById('tbl-activity');
      var tblComplete = document.getElementById('tbl-complete');
      tblActivity.innerHTML = '';
      tblComplete.innerHTML = '';
      window.sessionStorage.setItem('typeIndex', this.value);
      clientRoutes.getData('current?typeIndex=' + this.value, function (err, data) {
        if (err) {
          alert('No current data stored locally. Internet connection required');
          console.error(err);
          return;
        }
        buildActivityTable(data.json, tblActivity, tblComplete);
      });
    });
    menuElement.appendChild(btn);
    menuCount++;
  });
}
/**
 * @function tableInsertView
 * Take in a DOM nade view and a DOM node tr. Toggle insert or remove view after the tr.
 * Depends on layout css hide class and that the viewIn nade be assign absolute positioning
 * @param viewIn
 * @param insertRow
 */
function tableInsertView(viewIn, insertRow) {
  viewIn.classList.toggle('hide');
  if (!(viewIn.classList.contains('hide'))) {
    let rect = insertRow.getBoundingClientRect();
    viewIn.style.left = `${rect.left + scrollX}px`;
    viewIn.style.top = `${rect.top + rect.height + scrollY}px`;
    viewIn.style.width = `${rect.width}px`;
  }
}
/**
 * @function splitAndIndexData
 * Separates data by data[i].endDate and add its index within the array to it.
 * @param data
 * @returns {{incomplete: Array, complete: Array}}
 */
function splitAndIndexData(data) {
  let i = 0, len = data.length, noEndDate = [], hasEndDate = [];
  for (i; i < len; i++) {
    data[i].idx = i;
    data[i].endDate ? hasEndDate.push(data[i]) : noEndDate.push(data[i]);
  }
  return {incomplete: noEndDate, complete: hasEndDate};
}
function setDateRange(data, el) {
  el.dataset.endDate = data[0].endDate;
  el.dataset.startDate = data[data.length - 1].endDate;
  let dateRangeChangeEvt = document.createEvent('Events');
  dateRangeChangeEvt.initEvent('daterangeupdated', true, false);
  el.dispatchEvent(dateRangeChangeEvt);
}
/**
 * Pull down table data from server
 * @param typeIdx
 * @param dateRange
 * @param cb
 */
function getTableData(typeIdx: string, dateRange: {start: string, end: string}, cb: Function): void {
  let route = `current?typeIndex=${typeIdx}`;
  if (dateRange) {
    route = `${route}&startDate=${dateRange.start}&endDate=${dateRange.end}`
  }
  clientRoutes.getData(route, function (err, data) {
    if (err) {
      cb(err, null);
    }
    cb(null, data.json);
  });
}
/**
 * Generic table data error handling
 * @param err
 */
function playTableDataError(err) {
  alert('No current data stored locally. Internet connection required');
  console.error(err);
}
/**
 *
 * @param tbl
 * @param data
 */
function loadNewTableHtml(tbl: HTMLTableElement, data: [Object], includeEndDate: boolean) {
  let len = data.length, c = 0;
  tbl.innerHTML = '';
  for (c; c < len; c++) {
    appendActivity(data[c], tbl, includeEndDate);
  }
}
function sortTableData(data: [], sortkey: string) {
  data.sort(function (a, b) {
    return new Date(b[sortkey]) - new Date(a[sortkey]);
  });
}