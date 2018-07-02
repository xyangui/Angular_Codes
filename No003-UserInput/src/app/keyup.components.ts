/* tslint:disable:class-name component-class-suffix */
import { Component } from '@angular/core';

@Component({
  selector: 'key-up1',
  template: `
    <input (keyup)="onKey($event)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v1 {
  values = '';

  /*
  onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }
  */

  onKey(event: KeyboardEvent) { // with type info

    let input_value = (<HTMLInputElement>event.target).value; //整个输入框的值

    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }
}

//////////////////////////////////////////

@Component({
  selector: 'key-up2',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v2 {
  values = '';
  onKey(value: string) {  //整个输入框的值，这样写更简洁
    this.values += value + ' | ';
  }
}

//////////////////////////////////////////

@Component({
  selector: 'key-up3',
  template: `
    <input #box (keyup.enter)="onEnter(box.value)">
    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v3 {
  value = '';
  onEnter(value: string) { this.value = value; }
}

//////////////////////////////////////////

@Component({
  selector: 'key-up4',
  template: `
    <input #box
      (keyup.enter)="update(box.value)"
      (blur)="update(box.value)">

    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v4 {
  value = '';

  //当元素失去焦点时发生 blur 事件
  update(value: string) { this.value = value; }
}
