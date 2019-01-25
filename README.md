
cd No00x-xxx
npm  install
ng serve -o

教程：英雄指南
http://origin.angular.live/docs/ts/latest/tutorial/

代码库目录

No000-TypeScript         TypeScript语言基础
No001-HelloWorld         初始化工程得到的纯净工程
No002-CSSandShowData     css和显示数据例子，ngFor和ngIf的使用，字符串和实体类数组
No003-UserInput          按钮点击，输入框输入数据，keyup、enter键、失去焦点事件
No004-Forms              表单
No005-TourofHeroes1      英雄编辑器：显示数据，输入框输入数据，*ngModel双向数据绑定
No006-TourofHeroes2      主从结构：  *ngFor，*ngIf
No007-TourofHeroes3      多个组件：  创建组件，并添加到模块，@Input()属性输入，主组件向子组件传参：
                         <hero-detail [hero]="selectedHero"></hero-detail>
No008-TourofHeroes4      服务：     service类依赖注入：providers: [HeroService]，@Injectable()
                                   返回Promise，ngOnInit，模拟英雄数据
No009-TourofHeroes5      路由：     组件之路由，路由链接参数id，共享HeroService服务，uppercase管道
No010-TourofHeroes6      HTTP：    在Service里，增加了增删改，增加了serch组件，rxjs升级到6.1.0
No011-TourofHeroes7      英雄指南终极版本：升级了 heroes.component.html 和 heroes.component.ts
                         增加 hero 整合到 detail 页面里，在Service里增加修改统一由save处理
                         heroes.component.html里有：子组件向父组件传递参数：
                         子组件可以通过  @Output() close55 = new EventEmitter();  传参数
No012-TourofHeroes8      英雄指南web终极版本：调用网络api，http://www.empirecclt.com.au/public/api/allapi
                         完成单元测试，并修改完成No005至No011所有单元测试
No018-Directive          自定义指令Directive的使用，改变鼠标悬停的背景色，ngModel，ngFor和ngIf是angular自带指令


