# Vue 学习笔记

> Vue.js 是一套用于构建用户界面的渐进式 JavaScript 框架。

## 📚 学习路径

### 基础入门
- [Vue 核心概念](#vue-核心概念)
- [模板语法](#模板语法)
- [响应式原理](#响应式原理)
- [组件基础](#组件基础)

### 进阶内容
- [Composition API](/vue/composition-api)
- [路由管理](/vue/router)
- [状态管理](/vue/pinia)
- [性能优化](/vue/performance)

## 🎯 Vue 核心概念

### Vue 3 特性

Vue 3 带来了许多激动人心的新特性：

```javascript
// 创建 Vue 应用
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})

app.mount('#app')
```

### 响应式数据

```javascript
import { ref, reactive, computed } from 'vue'

// ref - 用于基本类型
const count = ref(0)

// reactive - 用于对象
const state = reactive({
  name: 'Vue',
  version: '3.0'
})

// computed - 计算属性
const doubled = computed(() => count.value * 2)
```

## 🎨 模板语法

### 插值与绑定

```vue
<template>
  <div>
    <!-- 文本插值 -->
    <h1>{{ message }}</h1>
    
    <!-- 属性绑定 -->
    <img :src="imageUrl" :alt="imageAlt">
    
    <!-- 类绑定 -->
    <div :class="{ active: isActive }"></div>
    
    <!-- 样式绑定 -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    
    <!-- 条件渲染 -->
    <p v-if="showMessage">{{ message }}</p>
    <p v-else>消息已隐藏</p>
    
    <!-- 列表渲染 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
```

### 事件处理

```vue
<template>
  <div>
    <!-- 基本事件 -->
    <button @click="handleClick">点击我</button>
    
    <!-- 事件修饰符 -->
    <form @submit.prevent="handleSubmit">
      <input @keyup.enter="handleEnter">
    </form>
    
    <!-- 动态事件 -->
    <button @[eventName]="handleDynamicEvent">动态事件</button>
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击了')
}

const handleSubmit = () => {
  console.log('表单提交')
}

const handleEnter = (event) => {
  console.log('回车键被按下:', event.target.value)
}

const eventName = 'mouseover'
const handleDynamicEvent = () => {
  console.log('动态事件触发')
}
</script>
```

## 🧩 组件基础

### 组件定义

```vue
<!-- MyComponent.vue -->
<template>
  <div class="my-component">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
// 定义 props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '默认描述'
  }
})

// 定义事件
const emit = defineEmits(['update', 'delete'])

// 组件方法
const handleUpdate = (newValue) => {
  emit('update', newValue)
}
</script>

<style scoped>
.my-component {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

### 组件通信

```vue
<!-- 父组件 -->
<template>
  <div>
    <ChildComponent 
      :message="parentMessage"
      @child-event="handleChildEvent"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const parentMessage = ref('来自父组件的消息')

const handleChildEvent = (data) => {
  console.log('收到子组件事件:', data)
}
</script>

<!-- 子组件 -->
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="notifyParent">通知父组件</button>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String
})

const emit = defineEmits(['child-event'])

const notifyParent = () => {
  emit('child-event', { data: '来自子组件的数据' })
}
</script>
```

## 🔄 生命周期

```vue
<script setup>
import { 
  onMounted, 
  onUnmounted, 
  onUpdated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate
} from 'vue'

// 组件挂载前
onBeforeMount(() => {
  console.log('组件即将挂载')
})

// 组件挂载后
onMounted(() => {
  console.log('组件已挂载')
  // 可以访问 DOM
})

// 组件更新前
onBeforeUpdate(() => {
  console.log('组件即将更新')
})

// 组件更新后
onUpdated(() => {
  console.log('组件已更新')
})

// 组件卸载前
onBeforeUnmount(() => {
  console.log('组件即将卸载')
})

// 组件卸载后
onUnmounted(() => {
  console.log('组件已卸载')
  // 清理定时器、事件监听器等
})
</script>
```

## 🎭 组合式 API (Composition API)

### 自定义组合函数

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubled = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  }
}
```

### 使用组合函数

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <p>双倍: {{ doubled }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script setup>
import { useCounter } from './useCounter'

const { count, doubled, increment, decrement, reset } = useCounter(10)
</script>
```

## 🛡️ 最佳实践

### 1. 组件命名规范
```javascript
// 使用 PascalCase
export default {
  name: 'UserProfile'
}
```

### 2. Props 定义
```javascript
const props = defineProps({
  // 基础类型检查
  propA: Number,
  
  // 多个可能的类型
  propB: [String, Number],
  
  // 必填字符串
  propC: {
    type: String,
    required: true
  },
  
  // 带默认值的数字
  propD: {
    type: Number,
    default: 100
  },
  
  // 带默认值的对象
  propE: {
    type: Object,
    default: () => ({ message: 'hello' })
  }
})
```

### 3. 性能优化
```vue
<script setup>
import { shallowRef, markRaw, computed } from 'vue'

// 对于大型对象，使用 shallowRef
const largeData = shallowRef({ /* 大型数据对象 */ })

// 对于不需要响应式的对象，使用 markRaw
const staticConfig = markRaw({
  apiUrl: 'https://api.example.com',
  timeout: 5000
})

// 计算属性缓存
const expensiveValue = computed(() => {
  // 耗时计算
  return heavyCalculation()
})
</script>
```

## 🔗 相关链接

- [Composition API 详解](/vue/composition-api)
- [Vue Router 路由](/vue/router)
- [Pinia 状态管理](/vue/pinia)
- [性能优化指南](/vue/performance)
- [Vue 官方文档](https://vuejs.org/)

---

> 💡 **学习建议**: Vue 3 的 Composition API 是现代 Vue 开发的核心，建议重点掌握。通过实际项目练习，深入理解响应式原理和组件设计模式。