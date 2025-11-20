# React

React 是由 Facebook 开发和维护的声明式 JavaScript 库，用于构建用户界面。它是目前最流行的前端框架之一，拥有庞大的生态系统和社区支持。

## 🌟 核心特性

### JSX 语法
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
```

### 组件化开发
- **函数组件** - 使用 Hooks 管理状态和副作用
- **类组件** - 传统方式，使用生命周期方法
- **高阶组件** - 组件复用模式

### 状态管理
```jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 🔧 核心概念

### 1. 虚拟 DOM
React 使用虚拟 DOM 来提高性能，通过对比算法只更新变化的部分。

### 2. 单向数据流
数据从父组件流向子组件，通过 props 传递，通过回调函数向上通信。

### 3. 组件生命周期
- **挂载阶段** - constructor → render → componentDidMount
- **更新阶段** - render → componentDidUpdate  
- **卸载阶段** - componentWillUnmount

### 4. Hooks 系统
```jsx
// useState - 状态管理
const [state, setState] = useState(initialValue);

// useEffect - 副作用处理
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数
  };
}, [dependencies]);

// useContext - 跨组件状态共享
const value = useContext(MyContext);

// useReducer - 复杂状态管理
const [state, dispatch] = useReducer(reducer, initialState);
```

## 📦 生态系统

### 路由管理
```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 状态管理
- **Redux** - 可预测的状态容器
- **MobX** - 响应式状态管理
- **Zustand** - 轻量级状态管理
- **Recoil** - Facebook 实验性状态管理

### UI 组件库
- **Ant Design** - 企业级 UI 设计语言
- **Material-UI** - Google Material Design
- **Chakra UI** - 简洁现代的组件库
- **Mantine** - 功能丰富的组件库

## 🏗️ 项目脚手架

### Create React App
```bash
npx create-react-app my-app
cd my-app
npm start
```

### Vite + React
```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

### Next.js (SSR/SSG)
```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## ⚡ 性能优化

### 代码分割
```jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### React.memo
```jsx
const MemoizedComponent = React.memo(function MyComponent({ name }) {
  return <div>{name}</div>;
});
```

### useMemo 和 useCallback
```jsx
function ExpensiveComponent({ data, onUpdate }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);
  
  const handleClick = useCallback(() => {
    onUpdate(expensiveValue);
  }, [expensiveValue, onUpdate]);
  
  return <button onClick={handleClick}>Update</button>;
}
```

## 🧪 测试

### Jest + React Testing Library
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter when button is clicked', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /click me/i });
  
  fireEvent.click(button);
  
  expect(screen.getByText(/you clicked 1 times/i)).toBeInTheDocument();
});
```

## 📱 移动端开发

### React Native
```jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
```

## 🎯 最佳实践

1. **组件设计原则**
   - 单一职责原则
   - 组合优于继承
   - 保持组件纯净

2. **状态管理**
   - 优先使用本地状态
   - 合理使用 Context
   - 复杂状态使用状态管理库

3. **性能优化**
   - 避免不必要的重渲染
   - 使用代码分割
   - 优化 bundle 大小

4. **代码组织**
   - 按功能模块组织
   - 分离容器组件和展示组件
   - 保持一致的命名规范

React 强大的生态系统和灵活的架构使其成为构建现代 Web 应用的优秀选择。无论是简单的单页应用还是复杂的企业级系统，React 都能提供合适的解决方案。