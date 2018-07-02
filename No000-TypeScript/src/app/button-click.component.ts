/* FOR DOCS ... MUST MATCH ClickMeComponent template
  <button (click)="onClickMe()">Click me!</button>
*/

import { Component } from '@angular/core';

@Component({
  selector: 'button-click',
  template: `
    <button (click)="onClick()">点击事件</button>
    {{clickMessage}}`
})
export class ButtonClickComponent {
  clickMessage = '';

  onClick() {

  }

  // onClick() {
  //   this.clickMessage = 'You are my hero!';
  // }
}
