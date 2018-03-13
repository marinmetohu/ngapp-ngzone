/**
 * reference:  https://stackoverflow.com/questions/35296704/angular2-how-to-call-component-function-from-outside-the-app
 */

import {Component, NgZone, OnInit, OnDestroy, Input} from '@angular/core';
 
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
    if(!!window.my && !!window.my.customtable && !!window.my.customtable.totalLength){
      window.my.customtable.totalLength.subscribe(val => {
        console.log(val);
        this.totalLength = val;
      });
    }
  }

  ngOnDestroy() {
    window.my.customtable.showHidden = null;
  }

  loadTable() {

    if(!!window.my && window.my.customtable) window.my.customtable.loadTable();
  }

  showHidden(json = []): void {
    this.ngZone.run(() => this.privateFunc(json));
  }

  privateFunc(json = []): void {
    console.log('private called');
    this.isHidden = false;
  }
}
