# Vue

Vue 是一套用于构建用户界面的渐进式 JavaScript 框架。它被设计为可以自底向上逐层应用，核心库只关注视图层，易于上手且便于与第三方库整合。

## 🌟 核心特性

### 响应式数据绑定
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message" placeholder="edit me">
    <p>Reversed message: {{ reversedMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    }
  }
}
</script>
```

### 组件化系统
```vue
<!-- ButtonCounter.vue -->
<template>
  <button @click="count++">
    You clicked me {{ count }} times.
  </button>
</template>

<script>
export default {
  name: 'ButtonCounter',
  data() {
    return {
      count: 0
    }
  }
}
</script>
```

### 指令系统
```vue
<template>
  <div>
    <!-- 条件渲染 -->
    <p v-if="seen">Now you see me</p>
    
    <!-- 列表渲染 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
    
    <!-- 事件处理 -->
    <button @click="doSomething">Click me</button>
    
    <!-- 属性绑定 -->
    <img :src="imageSrc" :alt="imageAlt">
    
    <!-- 双向绑定 -->
    <input v-model="inputValue">
  </div>
</template>
```

## 🔧 Vue 3 Composition API

### setup() 函数
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const double = computed(() => count.value * 2)
    
    function increment() {
      count.value++
    }
    
    return {
      count,
      double,
      increment
    }
  }
}
</script>
```

### `<script setup>` 语法糖
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>
```

## 📦 生态系统

### Vue Router
```vue
<!-- 路由配置 -->
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

<!-- 组件中使用 -->
<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>
```

### Pinia 状态管理
```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

// 组件中使用
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
counter.increment()
```

### UI 组件库
- **Element Plus** - Vue 3 企业级 UI 组件库
- **Ant Design Vue** - 企业级 UI 设计语言
- **Vuetify** - Material Design 组件框架
- **Quasar** - 高性能 Vue.js Material Design 2 框架

## 🏗️ 项目脚手架

### Vue CLI
```bash
npm install -g @vue/cli
vue create my-project
cd my-project
npm run serve
```

### Vite + Vue
```bash
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev
```

### Nuxt.js (SSR/SSG)
```bash
npx nuxi init nuxt-app
cd nuxt-app
npm install
npm run dev
```

## ⚡ 性能优化

### 计算属性缓存
```vue
<script>
export default {
  data() {
    return {
      numbers: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    evenNumbers() {
      // 只有当 numbers 改变时才会重新计算
      return this.numbers.filter(n => n % 2 === 0)
    }
  }
}
</script>
```

### 组件懒加载
```javascript
const AsyncComponent = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)
```

### v-memo 指令
```vue
<template>
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p :class="{ active: item.id === selected }">
      {{ item.text }}
    </p>
  </div>
</template>
```

## 🧪 测试

### Vue Test Utils
```javascript
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

test('increments counter when button is clicked', async () => {
  const wrapper = mount(Counter)
  
  await wrapper.find('button').trigger('click')
  
  expect(wrapper.find('p').text()).toContain('Count: 1')
})
```

## 📱 移动端开发

### Uni-app
```vue
<template>
  <view class="container">
    <text>{{ message }}</text>
    <button @click="handleClick">Click me</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Uni-app!'
    }
  },
  methods: {
    handleClick() {
      uni.showToast({
        title: 'Button clicked!',
        icon: 'success'
      })
    }
  }
}
</script>
```

### Taro
```jsx
import Taro, { useState } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

function Index() {
  const [count, setCount] = useState(0)

  return (
    <View className='index'>
      <Text>{count}</Text>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </View>
  )
}

export default Index
```

## 🎯 最佳实践

1. **组件设计**
   - 单文件组件组织
   - Props 验证和默认值
   - 合理使用 v-model

2. **状态管理**
   - 优先使用组件本地状态
   - 跨组件通信使用事件总线或状态管理
   - 避免深层嵌套的响应式对象

3. **性能优化**
   - 合理使用计算属性
   - 组件懒加载
   - 虚拟滚动处理大列表

4. **代码规范**
   - 组件命名使用 PascalCase
   - 文件命名使用 kebab-case
   - 遵循 Vue 官方风格指南

Vue 的渐进式特性和简洁的 API 使其成为初学者和经验丰富的开发者的理想选择。无论是小型项目还是大型企业应用，Vue 都能提供灵活且高效的解决方案。