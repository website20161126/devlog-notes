# JavaScript 学习笔记

> JavaScript 是一种高级的、解释型的编程语言，是 Web 开发的核心技术之一。

## 📚 学习路径

### 基础知识
- [变量与数据类型](#变量与数据类型)
- [函数与作用域](#函数与作用域)
- [对象与数组](#对象与数组)
- [原型与继承](#原型与继承)

### 进阶内容
- [异步编程](/javascript/async/)
- [ES6+ 新特性](/javascript/es/)
- [设计模式](#设计模式)
- [性能优化](#性能优化)

## 🎯 核心概念

### 变量与数据类型

JavaScript 有以下基本数据类型：

```javascript
// 原始类型
let str = "Hello World";        // String
let num = 42;                   // Number
let bool = true;                // Boolean
let nothing = null;             // Null
let notDefined;                 // Undefined
let unique = Symbol("id");      // Symbol
let bigInt = 123n;              // BigInt

// 引用类型
let obj = { name: "JavaScript" };  // Object
let arr = [1, 2, 3];               // Array
let func = function() {};          // Function
```

### 函数与作用域

```javascript
// 函数声明
function greet(name) {
  return `Hello, ${name}!`;
}

// 箭头函数
const add = (a, b) => a + b;

// 作用域链
let globalVar = "global";

function outer() {
  let outerVar = "outer";
  
  function inner() {
    let innerVar = "inner";
    console.log(globalVar); // 可以访问
    console.log(outerVar);  // 可以访问
    console.log(innerVar);  // 可以访问
  }
  
  inner();
}
```

### 对象与数组

```javascript
// 对象操作
const person = {
  name: "Alice",
  age: 30,
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

// 解构赋值
const { name, age } = person;

// 数组方法
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, x) => acc + x, 0);
```

## 🚀 异步编程

JavaScript 的异步编程是处理耗时操作的关键：

### Promise 基础

```javascript
// 创建 Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 1000);
  });
};

// 使用 Promise
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Async/Await

```javascript
// 更清晰的异步代码
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## 📖 ES6+ 新特性

### 解构赋值

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// 对象解构
const { title, author, year = 2024 } = {
  title: "JavaScript Guide",
  author: "Developer"
};
```

### 模板字符串

```javascript
const name = "World";
const greeting = `Hello, ${name}!
Today is ${new Date().toLocaleDateString()}`;
```

### 展开运算符

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

## 🎨 设计模式

### 单例模式

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = [];
    Singleton.instance = this;
  }
  
  addData(item) {
    this.data.push(item);
  }
}
```

### 观察者模式

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}
```

## ⚡ 性能优化

### 防抖与节流

```javascript
// 防抖 - 延迟执行，在指定时间内重复调用会重置计时器
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 节流 - 固定时间间隔执行
function throttle(func, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}
```

### 内存管理

```javascript
// 避免内存泄漏
class Component {
  constructor() {
    this.data = new Map();
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.handleClick);
  }
  
  // 清理方法
  destroy() {
    document.removeEventListener('click', this.handleClick);
    this.data.clear();
  }
}
```

## 🔗 相关链接

- [异步编程详解](/javascript/async/)
- [ES6+ 特性详解](/javascript/es/)
- [MDN JavaScript 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

---

> 💡 **学习建议**: 从基础语法开始，逐步深入到异步编程和高级特性。多动手实践，理解每个概念的底层原理。