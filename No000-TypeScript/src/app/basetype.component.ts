import { Component } from '@angular/core';

@Component({
  selector: 'base-type',
  template: `<button (click)="onClick()">基本数据类型</button>`
})
export class BasetypeComponent {

  onClick() {

    //  基本数据类型参考：
    //  https://www.w3cschool.cn/typescript/typescript-basic-types.html

    //TypeScript是区分大小写的。这意味着，TypeScript大写和小写字符区分。

    //布尔
    let isDone: boolean = false;

    //数字
    let decLiteral: number = 6; //TypeScript里的所有数字都是浮点数

    //字符串
    let name: string = "bob"; // 和JavaScript一样，可以使用双引号（ "）或单引号（'）表示字符串

    //数组
    let list: number[] = [1, 2, 3];

    //元组
    let x: [string, number];
    x = ['hello', 10];

    //枚举
    enum Color {Red, Green, Blue};
    let c: Color = Color.Green;

    //任意值
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean

    //Null 和 Undefined
    let u: undefined = undefined;
    let n: null = null;


    //键值对map
    var map: { [key: string]: number; } = {
      "t": 3,
      "o": 5,
      "g": 10
    };
    let value;
    for (let k in map) {
      value = map[k];  //3，5，10
    }
  }

  //空值
  warnUser(): void {
    alert("This is my warning message");
  }
}
