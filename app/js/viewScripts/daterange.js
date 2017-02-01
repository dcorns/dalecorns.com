/**
 * daterange.ts
 * Created by dcorns on 1/25/17
 * Copyright © 2017 Dale Corns
 */
/// <reference path="../../../all.d.ts" />
'use strict';
module.exports = function daterange() {
    var self = document.getElementById('daterange');
    var host = self.parentElement;
    var dateStart = document.getElementById('date-start');
    var dateEnd = document.getElementById('date-end');
    host.addEventListener('daterangeupdated', function () {
        dateStart.value = extractDate(host.dataset.startDate);
        dateEnd.value = extractDate(host.dataset.endDate);
    });
};
function extractDate(dateString) {
    return dateString.slice(0, 10);
}
//# sourceMappingURL=daterange.js.map