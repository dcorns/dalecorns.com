/**
 * daterange.ts
 * Created by dcorns on 1/25/17
 * Copyright © 2017 Dale Corns
 */
/// <reference path="../../../all.d.ts" />
'use strict';
module.exports = function daterange(): void {
  let self: HTMLElement = document.getElementById('daterange');
  let host: HTMLElement = self.parentElement;
  let dateStart = <HTMLInputElement>document.getElementById('date-start');
  let dateEnd = <HTMLInputElement>document.getElementById('date-end');
  host.addEventListener('daterangeupdated', function(e){
    //Might replace host with e.target.dataset since host emits the event
    dateStart.value = host.dataset['startDate'];
    dateEnd.value = host.dataset['endDate'];
    self.dataset['startDate'] = dateStart.value;
    self.dataset['endDate'] = dateEnd.value;
  });
  dateStart.addEventListener('change', (e: Event) => {
    let target = <HTMLInputElement>e.target;
    self.dataset['startDate'] = target.value;
    emitEvent(self, 'dateRangeChange');
  });
  dateEnd.addEventListener('change', (e) => {
    let target = <HTMLInputElement>e.target;
    self.dataset['endDate'] = target.value;
    emitEvent(self, 'dateRangeChange');
  });
};
/**
 * Emits a custom event sending el as the target in the vent object provided to the listener
 * @param el
 * @param eventName
 */
function emitEvent(el: HTMLElement, eventName: string): void{
  let evt = document.createEvent('Events');
  evt.initEvent(eventName, true, false);
  el.dispatchEvent(evt);
}