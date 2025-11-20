# Angular

Angular 是由 Google 开发和维护的完整前端框架，提供了构建大型企业级应用所需的一切功能。它采用 TypeScript 作为主要开发语言，提供了强类型支持和丰富的工具链。

## 🌟 核心特性

### 组件和模板
```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular App';
  user = {
    name: 'John Doe',
    email: 'john@example.com'
  };
  
  onClick() {
    console.log('Button clicked!');
  }
}
```

```html
<!-- app.component.html -->
<div class="container">
  <h1>{{ title }}</h1>
  
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <button (click)="onClick()">Click me</button>
  </div>
  
  <!-- 条件渲染 -->
  <div *ngIf="user.name">
    Welcome, {{ user.name }}!
  </div>
  
  <!-- 列表渲染 -->
  <ul>
    <li *ngFor="let item of items; let i = index">
      {{ i + 1 }}. {{ item.name }}
    </li>
  </ul>
</div>
```

### 依赖注入
```typescript
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }
}

// user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```

### 响应式编程 (RxJS)
```typescript
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  private searchTerms = new BehaviorSubject<string>('');
  searchResults$: Observable<any[]>;

  constructor(private searchService: SearchService) {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 3),
      switchMap(term => this.searchService.search(term))
    );
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }
}
```

## 🔧 核心概念

### 1. 模块 (Modules)
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'users', component: UserComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. 路由
```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'about', 
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 3. 表单处理
```typescript
// 模板驱动表单
import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
      <input 
        name="name" 
        ngModel 
        required 
        placeholder="Name">
      
      <input 
        name="email" 
        ngModel 
        email 
        placeholder="Email">
      
      <button type="submit" [disabled]="!userForm.valid">
        Submit
      </button>
    </form>
  `
})
export class TemplateFormComponent {
  onSubmit(form: any) {
    console.log('Form submitted:', form.value);
  }
}

// 响应式表单
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.min(18), Validators.max(100)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }
}
```

## 📦 生态系统

### Angular Material
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ]
})
export class AppModule { }

// 组件中使用
@Component({
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>User Profile</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="user.name">
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="user.email">
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button (click)="save()">Save</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class UserProfileComponent {
  user = { name: '', email: '' };
  
  save() {
    console.log('Saving user:', this.user);
  }
}
```

### 状态管理 (NgRx)
```typescript
// actions/user.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

// reducers/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess } from '../actions/user.actions';

export const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => [...users])
);

// effects/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { loadUsersSuccess } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() => this.userService.getUsers().pipe(
        map(users => loadUsersSuccess({ users }))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
```

## 🏗️ 项目脚手架

### Angular CLI
```bash
# 安装 Angular CLI
npm install -g @angular/cli

# 创建新项目
ng new my-app

# 启动开发服务器
cd my-app
ng serve

# 生成组件
ng generate component user-profile

# 生成服务
ng generate service user

# 生成模块
ng generate module admin
```

### 项目结构
```
src/
├── app/
│   ├── components/         # 可复用组件
│   ├── services/          # 业务服务
│   ├── models/           # 数据模型
│   ├── guards/           # 路由守卫
│   ├── interceptors/      # HTTP 拦截器
│   ├── app.component.ts   # 根组件
│   ├── app.module.ts      # 根模块
│   └── app-routing.module.ts # 路由配置
├── assets/               # 静态资源
├── environments/         # 环境配置
└── styles/              # 全局样式
```

## ⚡ 性能优化

### OnPush 变更检测策略
```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user: User;
}
```

### 懒加载模块
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

### TrackBy 函数
```typescript
@Component({
  template: `
    <div *ngFor="let item of items; trackBy: trackByFn">
      {{ item.name }}
    </div>
  `
})
export class ItemListComponent {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
```

## 🧪 测试

### 单元测试
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should display users', () => {
    const mockUsers = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    userService.getUsers.and.returnValue(mockUsers);

    fixture.detectChanges();

    expect(component.users).toEqual(mockUsers);
  });
});
```

## 📱 移动端开发

### Ionic + Angular
```typescript
// 安装 Ionic
npm install -g @ionic/cli
ionic start my-app tabs --type=angular

// 页面组件
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  items = [
    { title: 'Item 1', icon: 'star' },
    { title: 'Item 2', icon: 'heart' }
  ];
}
```

```html
<!-- home.page.html -->
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>Home</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-list>
    <ion-item *ngFor="let item of items">
      <ion-icon [name]="item.icon" slot="start"></ion-icon>
      <ion-label>{{ item.title }}</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
```

## 🎯 最佳实践

1. **项目结构**
   - 按功能模块组织代码
   - 保持一致的命名规范
   - 合理使用共享模块

2. **性能优化**
   - 使用 OnPush 变更检测
   - 实现懒加载
   - 合理使用 TrackBy

3. **代码质量**
   - 强类型使用 TypeScript
   - 编写单元测试和集成测试
   - 遵循 Angular 风格指南

4. **安全性**
   - 防范 XSS 攻击
   - 使用 HTTPS
   - 验证用户输入

Angular 提供了完整的解决方案，特别适合大型企业级应用。虽然学习曲线较陡，但其强大的功能和完善的工具链使其成为构建复杂应用的理想选择。