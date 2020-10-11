---
title: TS 奇怪的符号
lang: zh-CN
---

## !非空断言

从含有 `undefined` `null` 的类型合集中去除 `undefined` `null`。
```ts
function myFunc(maybeString: string | undefined | null) {
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

## ?.

尝试着取属性。  
`?.` 只会验证对象是否为 `null` 或 `undefined，对于` `0` 或空字符串来说，并不会出现 “短路”。
```ts
a?.b
a?.['b']
obj.customMethod?.()
```

## ?? 空值合并运算符

与逻辑或 `||` 运算符不同，当左侧操作数为 `null` 或 `undefined` 时，其返回右侧的操作数，否则返回左侧的操作数。
```ts
// 与可选链结合使用
let customerCity = customer?.city ?? "Unknown city"
```

## ?: 可选属性

### 工具类型

#### `Partial<T>` 将 T 中的所有属性都变成可选的
```ts
// Partial 的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

#### `Required<T>` 将 T 中的所有属性都变成必须的
```ts
// Required 的实现
// 通过 -? 移除了可选属性中的 ?，使得属性从可选变为必选的。
type Required<T> = {
  [P in keyof T]-?: T[P];
}
```

#### `Readonly<T>` 将某个类型所有属性变为只读属性
```ts
// 实现
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}
// 如果将上面的 readonly 改成 -readonly， 就是移除子属性的 readonly 标识。
```

#### `Record<K extends keyof any, T>` 将 K 中所有的属性的值转化为 T 类型
```ts
// 实现
type Record<K extends keyof any, T> = {
  [P in K]: T;
}

// 示例
interface PageInfo {
  title: string
}

type Page = "home" | "about" | "contact"

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
}
```

#### `Pick<T, K extends keyof T>` 将 T 类型中包含 K 的一部分属性摘出来
```ts
// 实现
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}

// 示例
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, "title" | "completed">

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
}
```

#### `Exclude<T, U>` 将 T 中包含 U 部分的属性剔除
```ts
// 实现
type Exclude<T, U> = T extends U ? never : T

// 示例
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

#### `Extract<T, U>` 取 T 与 U 的交集
```ts
type Extract<T, U> = T extends U ? T : never

// 示例
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void
```

#### `Omit<T, K extends keyof any>` 剔除 T 中健为 K 的属性
```ts
// 实现
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// 示例
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Omit<Todo, "description">

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
}
```

#### `NonNullable` 过滤类型中的 `null` 及 `undefined` 类型
```ts
// 实现
type NonNullable<T> = T extendsnull | undefined ? never : T

// 示例
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

#### `ReturnType<T>` 获取函数 T 的返回类型
```ts
// 实现
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// 示例
type T0 = ReturnType<() =>string>; // string
```

#### `InstanceType` 获取构造函数类型的实例类型
```ts
// 实现
type InstanceType<T extendsnew (...args: any) => any> = T extendsnew (...args: any) => infer R ? R : any

// 示例
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C> // C
```

#### `ThisType<T>` 用于指定上下文对象的类型
```ts
// 实现
interface ThisType<T> { }

// 示例
// 注意：使用 ThisType<T> 时，必须确保 --noImplicitThis 标志设置为 true。
interface Person {
  name: string
  age: number
}

const obj: ThisType<Person> = {
  dosth() {
    this.name // string
  }
}
```

#### `Parameters<T>` 获得函数的参数类型组成的元组类型
```ts
// 实现
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any
  ? P : never

// 示例
type A = Parameters<() =>void>; // []
type B = Parameters<typeofArray.isArray>; // [any]
type C = Parameters<typeofparseInt>; // [string, (number | undefined)?]
type D = Parameters<typeofMath.max>; // number[]
```

#### `ConstructorParameters<T>` 提取构造函数类型的所有参数类型
```ts
// 实现
type ConstructorParameters<T extendsnew (...args: any) => any> = T extendsnew (...args: infer P) => any ? P : never

// 示例
type A = ConstructorParameters<ErrorConstructor>; // [(string | undefined)?]
type B = ConstructorParameters<FunctionConstructor>; // string[]
type C = ConstructorParameters<RegExpConstructor>; // [string, (string | undefined)?]
```

#### `typeof` 用来获取一个变量声明或对象的类型。
```ts
interface Person {
  name: string
  age: number
}

const sem: Person = { name: 'semlinker', age: 30 };
type Sem= typeof sem; // -> Person
```

#### `keyof` 用来获取一个对象中的所有 key 值
```ts
interface Person {
    name: string;
    age: number;
}

type K1 = keyof Person; // "name" | "age"
```

#### `in` 用来遍历枚举类型
```ts
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
```

#### `infer` 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用
```ts
// 提取 T 函数的返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R 
  ? R 
  : any
```

## & 运算符

将多个类型合并为一个类型
```ts
type PartialPointX = { x: number }
type Point = PartialPointX & { y: number }

let point: Point = {
  x: 1,
  y: 1
}
```

## | 分隔符

表示取值可以为多种类型中的一种
```ts
const sayHello = (name: string | undefined) => { /* ... */ }
```

### 类型保护

联合类型是将类型的可能性拓宽了，但是很多时候我们也需要将这种可能性收窄，这就要用到类型保护了。

#### in

```ts
interface Admin {
  name: string
  privileges: string[]
}

interface Employee {
  name: string
  startDate: Date
}

type UnknownEmployee = Employee | Admin

function printEmployeeInformation(emp: UnknownEmployee) {
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges)
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate)
  }
}
```

#### typeof

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

#### instanceof

```ts
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {}

class StringPadder implements Padder {}

let padder: Padder = new SpaceRepeatingPadder();

if (padder instanceof SpaceRepeatingPadder) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

