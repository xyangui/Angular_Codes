import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard11" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
// routerLink="/dashboard" 告诉路由器，要去的路径
// 路由器就把激活的组件显示在<router-outlet>里面

//routerLinkActive指令，为匹配了活动路由的 HTML 导航元素自动添加一个 CSS 类

export class AppComponent {
  title = 'Tour of Heroes';
}
