/**
 * reference:  https://stackoverflow.com/questions/35296704/angular2-how-to-call-component-function-from-outside-the-app
 */

import {Component, NgZone, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'ng-custom-table',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private ngZone: NgZone) {}

  theadData = [];
  elements = [];

  ngOnInit() {
    window.my = window.my || {};
    window.my.customtable = window.my.customtable || {};
    window.my.customtable.loadTable = this.loadTable.bind(this);
  }

  generateArray(obj) {
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }

  loadHeader(): void {
    this.theadData = [
      {title: 'Date'},
      {title: 'No.'},
      {title: 'Status'},
      {title: 'Valid unit'},
      {title: 'Customer'},
      {title: 'Title'},
      {title: 'Currency'},
      {title: 'Net'},
      {title: 'Gross'},
      {title: 'Dispatch'}
    ];
  }

  loadBody(): Array<any> {
    return [
      {
        id: 35,
        updated_at: '2018-02-27',
        document_nr: 'AN-00035',
        status: 'draft',
        is_valid_until: '2018-08-01',
        customer: 'My Client AG1',
        title: 'Title1',
        currency: 'EUR',
        total_net: 0,
        total_gross: 0,
        dispatch: false,
      },
      {
        id: 50,
        updated_at: '2018-02-27',
        document_nr: 'AN-00050',
        status: 'confirmed',
        is_valid_until: '2018-08-26',
        customer: 'My Client AG2',
        title: 'Title 2',
        currency: 'EUR',
        total_net: 2222,
        total_gross: 2222,
        dispatch: true,
      }
    ];
  }


  ngOnDestroy() {
    window.my.customtable.loadTable = null;
  }

  loadTable(json) {
    this.ngZone.run(() => this.privateFunc(json));
  }

  privateFunc(json = []): void {
    // do private stuff
    //my.customtable.loadTable()
    this.loadHeader();

    this.elements = (!!json.length) ? json : this.loadBody();
  }
}
