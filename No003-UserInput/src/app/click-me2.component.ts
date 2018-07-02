import { Component } from '@angular/core';

@Component({
  selector: 'click-me2',
  template: `
    <button (click)="onClickMe2($event)">判断点击次数</button>
    {{clickMessage}}`
})
export class ClickMe2Component {
  clickMessage = '';
  clicks = 1;

  onClickMe2(event: any) {
    let evtMsg = event ? ' Event target is ' + event.target.tagName  : '';
    this.clickMessage = (`Click #${this.clicks++}. ${evtMsg}`);//字符串加不加（）都可以
  }
}
