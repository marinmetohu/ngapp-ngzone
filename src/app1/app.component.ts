/**
 * reference:  https://stackoverflow.com/questions/35296704/angular2-how-to-call-component-function-from-outside-the-app
 */

import {Component, NgZone, OnInit, OnDestroy, Input} from '@angular/core';
import {has} from 'lodash/has';
@Component({
  selector: 'app1-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App1Component implements OnInit, OnDestroy {
  constructor(private ngZone: NgZone) {}

  theadData = [];
  elements = [];
  isHidden: boolean;
  totalLength: number;

  ngOnInit() {
    window.my = window.my || {};
    window.my.app1 = window.my.app1 || {};
    window.my.app1.showHidden = this.showHidden.bind(this);
    this.isHidden = true;

    this.getTotalLength();
  }

  getTotalLength(): void {
    /** check if the other app has registered itself in the window */
    if(!!window.my && !!window.my.customtable && !!window.my.customtable.totalLength){
      /** totalLength is an observable in customtable so we can subscribe to it  */
      window.my.customtable.totalLength.subscribe(val => {
        console.log(val);
        this.totalLength = val;
      });
    }
  }

  ngOnDestroy() {
    window.my.app1.showHidden = null;
  }

  loadTable() {

    if(!!window.my && window.my.customtable) window.my.customtable.loadTable();
  }

  loadCustomTable() {
    if(!!window.my && window.my.customtable) {
      window.my.customtable.loadTable(
        [
          { id: 35, updated_at: '2018-02-27', status: 'draft', title: 'Title1', currency: 'EUR' },
          { id: 50, updated_at: '2018-02-28', status: 'confirmed', title: 'Title 2', currency: 'EUR' },
          { id: 51, updated_at: '2018-02-29', status: 'draft', title: 'Title1', currency: 'EUR' },
          { id: 52, updated_at: '2018-02-30', status: 'confirmed', title: 'Title 2', currency: 'EUR' }
        ]
      );
    }
  }

  showHidden(json = []): void {
    this.ngZone.run(() => this.privateFunc(json));
  }

  privateFunc(json = []): void {
    console.log('private called');
    this.isHidden = false;
  }
}
