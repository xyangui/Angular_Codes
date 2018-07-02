import { Component } from '@angular/core';
@Component({
  selector: 'loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent {

//   用以下方法也可以实现
//   @Component({
//     selector: 'key-up2',
//     template: `
//     <input #box (keyup)="onKey(box.value)">
//     <p>{{values}}</p>
//   `
//   })
//   export class KeyUpComponent_v2 {
//   values = '';
//   onKey(value: string) {
//     this.values = value;
//   }
// }
}
