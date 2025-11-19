# TypeScript 学习笔记

> TypeScript 是 JavaScript 的超集，添加了静态类型检查和现代 JavaScript 特性。

## 📚 学习路径

### 基础类型
- [基本类型系统](#基本类型系统)
- [接口与类型](#接口与类型)
- [联合类型与交叉类型](#联合类型与交叉类型)
- [类型推断与类型守卫](#类型推断与类型守卫)

### 进阶内容
- [泛型编程](/typescript/generics)
- [高级类型](/typescript/advanced-types)
- [装饰器](/typescript/decorators)
- [类型工具](#类型工具)

## 🎯 基本类型系统

### 基础类型

```typescript
// 基本类型
let isDone: boolean = false
let decimal: number = 6
let color: string = "blue"
let list: number[] = [1, 2, 3]
let x: [string, number] = ["hello", 10] // 元组

// 枚举
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green

// any 和 unknown
let notSure: any = 4
notSure = "maybe a string"
notSure = false

let value: unknown = 4
// value.length // 错误，unknown 需要类型检查

// void 和 never
function warnUser(): void {
  console.log("This is a warning message")
}

function error(message: string): never {
  throw new Error(message)
}
```

### 对象类型

```typescript
// 接口定义
interface Person {
  name: string
  age: number
  readonly id: number // 只读属性
  email?: string // 可选属性
  [key: string]: any // 索引签名
}

// 使用接口
let user: Person = {
  name: "Alice",
  age: 30,
  id: 1
}

// 类型别名
type Point = {
  x: number
  y: number
}

type ID = string | number

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function(source: string, subString: string) {
  return source.search(subString) > -1
}
```

## 🎨 接口与类型

### 接口扩展

```typescript
// 基础接口
interface Shape {
  color: string
}

// 扩展接口
interface Square extends Shape {
  sideLength: number
}

let square: Square = {
  color: "blue",
  sideLength: 10
}

// 多重继承
interface PenStroke {
  penWidth: number
}

interface Circle extends Shape, PenStroke {
  radius: number
}
```

### 类型别名 vs 接口

```typescript
// 类型别名 - 可以表示更复杂的类型
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver

function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n
  } else {
    return n()
  }
}

// 接口 - 可以被扩展和实现
interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

class GoldenRetriever implements Dog {
  name: string
  breed: string
  
  constructor(name: string) {
    this.name = name
    this.breed = "Golden Retriever"
  }
}
```

## 🔄 联合类型与交叉类型

### 联合类型 (Union Types)

```typescript
// 基本联合类型
type StringOrNumber = string | number

function printId(id: StringOrNumber) {
  if (typeof id === "string") {
    console.log(id.toUpperCase())
  } else {
    console.log(id.toFixed(2))
  }
}

// 字面量联合类型
type Status = "loading" | "success" | "error"

function handleStatus(status: Status) {
  switch (status) {
    case "loading":
      console.log("正在加载...")
      break
    case "success":
      console.log("操作成功")
      break
    case "error":
      console.log("操作失败")
      break
  }
}

// 可辨识联合类型
interface Circle {
  kind: "circle"
  radius: number
}

interface Square {
  kind: "square"
  sideLength: number
}

type Shape = Circle | Square

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.sideLength ** 2
  }
}
```

### 交叉类型 (Intersection Types)

```typescript
// 基本交叉类型
interface Person {
  name: string
}

interface Employee {
  id: number
  department: string
}

type EmployeePerson = Person & Employee

let employee: EmployeePerson = {
  name: "John",
  id: 123,
  department: "Engineering"
}

// 泛型交叉类型
type Identity<T> = T & { __type: "Identity" }

function identity<T>(arg: T): Identity<T> {
  return { ...arg, __type: "Identity" }
}
```

## 🛡️ 类型推断与类型守卫

### 类型推断

```typescript
// 基本推断
let x = 3 // 推断为 number
let y = "hello" // 推断为 string

// 最佳通用类型
let zoo = [new Rhino(), new Elephant(), new Snake()]
// 推断为 (Rhino | Elephant | Snake)[]

// 上下文推断
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button) // 推断为 MouseEvent
}
```

### 类型守卫

```typescript
// typeof 类型守卫
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value
  }
  if (typeof padding === "string") {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

// instanceof 类型守卫
class Bird {
  fly() {
    console.log("Bird is flying")
  }
}

class Fish {
  swim() {
    console.log("Fish is swimming")
  }
}

function move(animal: Bird | Fish) {
  if (animal instanceof Bird) {
    animal.fly()
  } else {
    animal.swim()
  }
}

// 自定义类型守卫
interface Cat {
  meow(): void
}

interface Dog {
  bark(): void
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow()
  } else {
    animal.bark()
  }
}
```

## 🛠️ 类型工具

### 条件类型

```typescript
// 基本条件类型
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string> // true
type Test2 = IsString<number> // false

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never

type StrArrayOrNumArray = ToArray<string | number> // string[] | number[]

// 映射条件类型
type NonNullable<T> = T extends null | undefined ? never : T

type Test3 = NonNullable<string | null> // string
```

### 映射类型

```typescript
// 基本映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 自定义映射类型
type Stringify<T> = {
  [K in keyof T]: string
}

interface Person {
  name: string
  age: number
}

type StringifiedPerson = Stringify<Person>
// { name: string; age: string; }

// 条件映射类型
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

interface User {
  id: number
  name: string
}

type UserGetters = Getters<User>
// { getId: () => number; getName: () => string; }
```

### 模板字面量类型

```typescript
// 基本模板字面量类型
type Greeting = `Hello, ${string}!`

const greeting: Greeting = "Hello, World!" // ✅
// const invalid: Greeting = "Hi there!" // ❌

// 操作模板字面量类型
type AllCaps<T extends string> = Uppercase<T>
type LowerFirst<T extends string> = Uncapitalize<T>

type Result = AllCaps<"hello"> // "HELLO"

// 组合使用
type EventName<T extends string> = `on${Capitalize<T>}`

type ButtonEvents = EventName<"click" | "hover">
// "onClick" | "onHover"
```

## 🎭 装饰器基础

### 类装饰器

```typescript
// 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class Greeter {
  greeting: string
  
  constructor(message: string) {
    this.greeting = message
  }
  
  greet() {
    return "Hello, " + this.greeting
  }
}

// 工厂装饰器
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new property"
    hello = "override"
  }
}

@classDecorator
class Greeter2 {
  property = "original property"
  
  hello = "original"
}

console.log(new Greeter2())
```

## 🔗 相关链接

- [泛型编程详解](/typescript/generics)
- [高级类型应用](/typescript/advanced-types)
- [装饰器深入](/typescript/decorators)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

---

> 💡 **学习建议**: TypeScript 的类型系统是其核心优势，建议从基础类型开始，逐步学习高级类型特性。通过实际项目练习，理解类型安全和代码质量提升的重要性。