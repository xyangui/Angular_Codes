import { Component } from '@angular/core';

@Component({
  selector: 'array',
  template: `<button (click)="onClick()">数组</button>`
})
export class ArrayComponent {

  onClick() {

    var emptyArray: any[] = [];
    emptyArray[0] = "这是一个测试";
    //alert(emptyArray[0]);

    let actors: string[] = ["张三","李四","王五","赵六"];
    //alert(actors.length); //数组长度

    //遍历
    let str: string;
    for (let actor of actors)
    {
      str = actor; //"张三","李四","王五","赵六"
    }

    let str2: string;
    for (let index in actors)
    {
      str2 = index; //'0','1','2','3'
    }

    //push() 在最后位置中插入一个或多个元素,返回新的数组的长度
    let length: number = actors.push("顾七","徐八");//有6个元素就返回6

    //pop() 移除数组中的最后一个元素,并且返回被移除的元素
    let last: string = actors.pop();

    //shift() 移除数组中的首个元素,并且返回被移除的元素,如果数组的键为数字型,那么所有的元素将得到新的键,从0开始依次递增.

    //Concat() 数组合并
    var first: string[] = ['aa', 'bb'];
    var second: string[] = ['cc', 'dd'];
    var result = first.concat(second);
    var result1 = result.concat(first, second);

    //IndexOf() 从前搜素指定元素，返回第一个匹配下标-----------LastIndexOf() 返回最后一个匹配下标
    var arrayName: string[] = ['C','Sharp','Corner','Dot','Net','Heaven'];
    var index = arrayName.indexOf('Dot');

    //Join() 返回数组拼接的字符串，默认用，分割
    var result3 = arrayName.join();
    var result4 = arrayName.join('+');
    var result5 = arrayName.join('*');

    //reverse()方法  用于反转数组元素的顺序,reverse方法没有参数,
    // 返回被反转后的数组,使得最后一个元素变为第1个元素,第1个元素变为最后一个元素.

    //slice() 方法 该方法返回指定起始位置的一个新的数组,

    //sort() 方法 排序数组,如果没有指定参数,那么将会按照字母数字顺序进行排序


    //遍历方法三，forEach
    //forEach其实是JavaScript的循环语法，TypeScript作为JavaScript的语法超集，当然默认也是支持的。

    // let list = [4, 5, 6];
    // list.forEach((val, idx, array) => {
    //   // val: 当前值
    //   // idx：当前index
    //   // array: Array
    // });

    //遍历方法四，every和some
    //every和some也都是JavaScript的循环语法，TypeScript作为JavaScript的语法超集，
    // 当然默认也是支持的。因为forEach在iteration中是无法返回的，所以可以使用every和some来取代forEach。

    // let list = [4, 5, 6];
    // list.every((val, idx, array) => {
    //   // val: 当前值
    //   // idx：当前index
    //   // array: Array
    //   return true; // Continues
    //   // Return false will quit the iteration
    // });

  }
}
