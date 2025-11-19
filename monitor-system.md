# 监控系统

> 监控系统是保障系统稳定性和性能的重要工具，通过实时监控、告警和分析来确保服务质量。

## 📚 学习路径

### 核心技术
- [WebSocket 实时通信](/monitor-system/websocket)
- [数据采集](#数据采集)
- [告警系统](#告警系统)
- [性能监控](#性能监控)

### 应用场景
- [地图转换](/monitor-system/map-convert)
- [日志分析](#日志分析)
- [用户行为追踪](#用户行为追踪)
- [系统健康检查](#系统健康检查)

## 🌐 WebSocket 实时通信

### WebSocket 基础

```javascript
// 客户端 WebSocket 连接
class WebSocketClient {
  constructor(url) {
    this.url = url
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 1000
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url)
      
      this.ws.onopen = () => {
        console.log('WebSocket 连接已建立')
        this.reconnectAttempts = 0
        this.heartbeat()
      }
      
      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data))
      }
      
      this.ws.onclose = () => {
        console.log('WebSocket 连接已关闭')
        this.reconnect()
      }
      
      this.ws.onerror = (error) => {
        console.error('WebSocket 错误:', error)
      }
    } catch (error) {
      console.error('连接失败:', error)
      this.reconnect()
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      
      setTimeout(() => {
        this.connect()
      }, this.reconnectInterval * this.reconnectAttempts)
    }
  }

  heartbeat() {
    setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({ type: 'heartbeat' })
      }
    }, 30000)
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case 'metric':
        this.updateMetrics(message.data)
        break
      case 'alert':
        this.handleAlert(message.data)
        break
      case 'heartbeat':
        // 心跳响应
        break
    }
  }

  updateMetrics(metrics) {
    // 更新监控指标
    console.log('收到指标数据:', metrics)
  }

  handleAlert(alert) {
    // 处理告警
    console.warn('收到告警:', alert)
  }
}

// 使用示例
const monitorClient = new WebSocketClient('ws://localhost:8080/monitor')
monitorClient.connect()
```

### 服务器端实现 (Node.js)

```javascript
// 服务器端 WebSocket
const WebSocket = require('ws')
const http = require('http')

const server = http.createServer()
const wss = new WebSocket.Server({ server })

// 存储所有客户端连接
const clients = new Set()

wss.on('connection', (ws) => {
  clients.add(ws)
  console.log('新的监控客户端连接')

  // 发送欢迎消息
  ws.send(JSON.stringify({
    type: 'welcome',
    message: '连接成功'
  }))

  // 处理客户端消息
  ws.on('message', (message) => {
    const data = JSON.parse(message)
    
    if (data.type === 'heartbeat') {
      ws.send(JSON.stringify({ type: 'heartbeat-response' }))
    }
  })

  // 连接关闭时清理
  ws.on('close', () => {
    clients.delete(ws)
    console.log('监控客户端断开连接')
  })
})

// 广播数据给所有客户端
function broadcast(data) {
  const message = JSON.stringify(data)
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

// 模拟数据推送
setInterval(() => {
  const metrics = {
    type: 'metric',
    data: {
      timestamp: Date.now(),
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      disk: Math.random() * 100,
      network: Math.random() * 1000
    }
  }
  broadcast(metrics)
}, 2000)

server.listen(8080, () => {
  console.log('监控服务器运行在端口 8080')
})
```

## 📊 数据采集

### 性能指标采集

```javascript
// 性能监控类
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: {},
      resources: [],
      userTiming: [],
      vitals: {}
    }
    this.init()
  }

  init() {
    // 页面加载性能
    window.addEventListener('load', () => {
      this.collectPageLoadMetrics()
    })

    // 资源加载性能
    if ('PerformanceObserver' in window) {
      this.observeResources()
      this.observeUserTiming()
    }

    // Web Vitals
    this.collectWebVitals()
  }

  collectPageLoadMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0]
    
    this.metrics.pageLoad = {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ssl: navigation.secureConnectionStart > 0 ? 
        navigation.connectEnd - navigation.secureConnectionStart : 0,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domParse: navigation.domContentLoadedEventStart - navigation.responseEnd,
      domReady: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart
    }
  }

  observeResources() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        this.metrics.resources.push({
          name: entry.name,
          type: entry.initiatorType,
          duration: entry.duration,
          size: entry.transferSize || 0,
          timestamp: entry.startTime
        })
      })
    })
    observer.observe({ entryTypes: ['resource'] })
  }

  observeUserTiming() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        this.metrics.userTiming.push({
          name: entry.name,
          startTime: entry.startTime,
          duration: entry.duration,
          type: entry.entryType
        })
      })
    })
    observer.observe({ entryTypes: ['measure', 'mark'] })
  }

  collectWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.vitals.lcp = lastEntry.renderTime || lastEntry.loadTime
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        this.metrics.vitals.fid = entry.processingStart - entry.startTime
      })
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          this.metrics.vitals.cls = clsValue
        }
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }

  getMetrics() {
    return this.metrics
  }

  // 发送数据到监控服务器
  sendMetrics(endpoint) {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.metrics)
    }).catch(error => {
      console.error('发送监控数据失败:', error)
    })
  }
}

// 使用示例
const monitor = new PerformanceMonitor()

// 定期发送数据
setInterval(() => {
  monitor.sendMetrics('/api/metrics')
}, 30000)
```

### 错误监控

```javascript
// 错误监控类
class ErrorMonitor {
  constructor() {
    this.errors = []
    this.init()
  }

  init() {
    // 全局错误捕获
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now()
      })
    })

    // Promise 错误捕获
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now()
      })
    })

    // 资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleError({
          type: 'resource',
          message: `Failed to load ${event.target.tagName}`,
          source: event.target.src || event.target.href,
          timestamp: Date.now()
        })
      }
    }, true)
  }

  handleError(errorInfo) {
    // 添加用户信息
    errorInfo.userAgent = navigator.userAgent
    errorInfo.url = window.location.href
    errorInfo.userId = this.getUserId()

    // 存储错误
    this.errors.push(errorInfo)

    // 发送错误报告
    this.reportError(errorInfo)
  }

  getUserId() {
    // 获取或生成用户ID
    let userId = localStorage.getItem('monitor-user-id')
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('monitor-user-id', userId)
    }
    return userId
  }

  reportError(errorInfo) {
    // 发送错误到监控服务器
    fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(errorInfo)
    }).catch(error => {
      console.error('发送错误报告失败:', error)
    })
  }

  // 手动报告错误
  report(message, extra = {}) {
    this.handleError({
      type: 'manual',
      message,
      ...extra,
      timestamp: Date.now()
    })
  }
}

// 使用示例
const errorMonitor = new ErrorMonitor()

// 手动报告错误
try {
  // 可能出错的代码
  riskyOperation()
} catch (error) {
  errorMonitor.report('操作失败', {
    operation: 'riskyOperation',
    error: error.message
  })
}
```

## 🚨 告警系统

### 告警规则引擎

```javascript
// 告警规则引擎
class AlertEngine {
  constructor() {
    this.rules = []
    this.alerts = []
    this.alertCallbacks = []
  }

  // 添加告警规则
  addRule(rule) {
    this.rules.push({
      id: rule.id,
      name: rule.name,
      condition: rule.condition,
      threshold: rule.threshold,
      severity: rule.severity || 'warning',
      cooldown: rule.cooldown || 300000, // 5分钟冷却
      lastTriggered: 0
    })
  }

  // 检查指标
  checkMetrics(metrics) {
    const now = Date.now()
    
    this.rules.forEach(rule => {
      if (this.evaluateCondition(rule.condition, metrics)) {
        // 检查冷却时间
        if (now - rule.lastTriggered > rule.cooldown) {
          this.triggerAlert(rule, metrics)
          rule.lastTriggered = now
        }
      }
    })
  }

  // 评估条件
  evaluateCondition(condition, metrics) {
    try {
      // 简单的条件评估器
      const func = new Function('metrics', `return ${condition}`)
      return func(metrics)
    } catch (error) {
      console.error('条件评估失败:', error)
      return false
    }
  }

  // 触发告警
  triggerAlert(rule, metrics) {
    const alert = {
      id: Date.now().toString(),
      ruleId: rule.id,
      ruleName: rule.name,
      severity: rule.severity,
      message: this.generateAlertMessage(rule, metrics),
      timestamp: Date.now(),
      metrics: metrics,
      acknowledged: false
    }

    this.alerts.push(alert)
    this.notifyAlert(alert)
  }

  // 生成告警消息
  generateAlertMessage(rule, metrics) {
    return `告警: ${rule.name} - 当前值: ${JSON.stringify(metrics)}`
  }

  // 通知告警
  notifyAlert(alert) {
    // 调用所有回调函数
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert)
      } catch (error) {
        console.error('告警回调执行失败:', error)
      }
    })

    // 控制台输出
    console.warn(`🚨 ${alert.severity.toUpperCase()}: ${alert.message}`)
  }

  // 添加告警回调
  addAlertCallback(callback) {
    this.alertCallbacks.push(callback)
  }

  // 确认告警
  acknowledgeAlert(alertId) {
    const alert = this.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.acknowledged = true
      alert.acknowledgedAt = Date.now()
    }
  }

  // 获取活跃告警
  getActiveAlerts() {
    return this.alerts.filter(alert => !alert.acknowledged)
  }
}

// 告警通知器
class AlertNotifier {
  constructor() {
    this.channels = []
  }

  // 添加通知渠道
  addChannel(channel) {
    this.channels.push(channel)
  }

  // 发送通知
  async send(alert) {
    const promises = this.channels.map(channel => {
      return channel.send(alert).catch(error => {
        console.error(`${channel.name} 通知发送失败:`, error)
      })
    })

    await Promise.allSettled(promises)
  }
}

// 邮件通知渠道
class EmailChannel {
  constructor(config) {
    this.name = 'email'
    this.config = config
  }

  async send(alert) {
    // 模拟邮件发送
    console.log(`📧 发送邮件告警: ${alert.message}`)
    // 实际实现中会调用邮件服务API
  }
}

// 短信通知渠道
class SMSChannel {
  constructor(config) {
    this.name = 'sms'
    this.config = config
  }

  async send(alert) {
    // 模拟短信发送
    console.log(`📱 发送短信告警: ${alert.message}`)
    // 实际实现中会调用短信服务API
  }
}

// 使用示例
const alertEngine = new AlertEngine()
const notifier = new AlertNotifier()

// 添加通知渠道
notifier.addChannel(new EmailChannel({ recipients: ['admin@example.com'] }))
notifier.addChannel(new SMSChannel({ recipients: ['+1234567890'] }))

// 添加告警规则
alertEngine.addRule({
  id: 'cpu-high',
  name: 'CPU使用率过高',
  condition: 'metrics.cpu > 80',
  severity: 'warning',
  cooldown: 300000
})

alertEngine.addRule({
  id: 'memory-critical',
  name: '内存使用率危急',
  condition: 'metrics.memory > 95',
  severity: 'critical',
  cooldown: 60000
})

// 添加告警回调
alertEngine.addAlertCallback((alert) => {
  notifier.send(alert)
})

// 模拟指标检查
setInterval(() => {
  const metrics = {
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100
  }
  
  alertEngine.checkMetrics(metrics)
}, 5000)
```

## 📈 可视化监控面板

```vue
<!-- MonitorDashboard.vue -->
<template>
  <div class="monitor-dashboard">
    <h1>系统监控面板</h1>
    
    <!-- 实时指标卡片 -->
    <div class="metrics-grid">
      <div class="metric-card" v-for="metric in metrics" :key="metric.name">
        <h3>{{ metric.name }}</h3>
        <div class="metric-value" :class="getMetricClass(metric.value, metric.threshold)">
          {{ metric.value.toFixed(1) }}%
        </div>
        <div class="metric-chart">
          <canvas :ref="metric.name"></canvas>
        </div>
      </div>
    </div>

    <!-- 告警列表 -->
    <div class="alerts-section">
      <h2>活跃告警</h2>
      <div class="alerts-list">
        <div 
          v-for="alert in activeAlerts" 
          :key="alert.id"
          :class="['alert-item', alert.severity]"
        >
          <div class="alert-info">
            <h4>{{ alert.ruleName }}</h4>
            <p>{{ alert.message }}</p>
            <small>{{ formatTime(alert.timestamp) }}</small>
          </div>
          <button @click="acknowledgeAlert(alert.id)">确认</button>
        </div>
      </div>
    </div>

    <!-- 性能图表 -->
    <div class="charts-section">
      <h2>性能趋势</h2>
      <div class="chart-container">
        <canvas ref="performanceChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart } from 'chart.js/auto'

const metrics = ref([
  { name: 'CPU', value: 0, threshold: 80, data: [] },
  { name: 'Memory', value: 0, threshold: 90, data: [] },
  { name: 'Disk', value: 0, threshold: 85, data: [] }
])

const activeAlerts = ref([])
const performanceChart = ref(null)
const ws = ref(null)

onMounted(() => {
  initWebSocket()
  initCharts()
})

onUnmounted(() => {
  if (ws.value) {
    ws.value.close()
  }
})

function initWebSocket() {
  ws.value = new WebSocket('ws://localhost:8080/monitor')
  
  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    
    if (data.type === 'metric') {
      updateMetrics(data.data)
    } else if (data.type === 'alert') {
      activeAlerts.value.unshift(data.data)
    }
  }
}

function updateMetrics(newMetrics) {
  metrics.value.forEach(metric => {
    if (newMetrics[metric.name.toLowerCase()] !== undefined) {
      metric.value = newMetrics[metric.name.toLowerCase()]
      metric.data.push({
        time: new Date(),
        value: metric.value
      })
      
      // 保持最近50个数据点
      if (metric.data.length > 50) {
        metric.data.shift()
      }
    }
  })
  
  updateCharts()
}

function getMetricClass(value, threshold) {
  if (value > threshold) return 'critical'
  if (value > threshold * 0.8) return 'warning'
  return 'normal'
}

function acknowledgeAlert(alertId) {
  // 发送确认请求
  fetch(`/api/alerts/${alertId}/acknowledge`, {
    method: 'POST'
  }).then(() => {
    const index = activeAlerts.value.findIndex(alert => alert.id === alertId)
    if (index !== -1) {
      activeAlerts.value.splice(index, 1)
    }
  })
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString()
}

function initCharts() {
  const ctx = performanceChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: metrics.value.map(metric => ({
        label: metric.name,
        data: [],
        borderColor: getColorForMetric(metric.name),
        tension: 0.4
      }))
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  })
}

function updateCharts() {
  // 更新图表数据
  // 实现图表更新逻辑
}

function getColorForMetric(name) {
  const colors = {
    CPU: '#ff6384',
    Memory: '#36a2eb',
    Disk: '#ffce56'
  }
  return colors[name] || '#999'
}
</script>

<style scoped>
.monitor-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.metric-value {
  font-size: 2em;
  font-weight: bold;
  margin: 10px 0;
}

.metric-value.normal { color: #4caf50; }
.metric-value.warning { color: #ff9800; }
.metric-value.critical { color: #f44336; }

.alerts-section {
  margin-bottom: 30px;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  border-left: 4px solid;
}

.alert-item.warning {
  background: #fff3cd;
  border-color: #ffc107;
}

.alert-item.critical {
  background: #f8d7da;
  border-color: #dc3545;
}

.chart-container {
  height: 300px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
```

## 🔗 相关链接

- [WebSocket 实时通信](/monitor-system/websocket)
- [地图转换技术](/monitor-system/map-convert)
- [监控系统架构设计](https://prometheus.io/)
- [前端监控最佳实践](https://web.dev/vitals/)

---

> 💡 **学习建议**: 监控系统需要综合考虑数据采集、实时处理、告警机制和可视化展示。建议从基础的性能监控开始，逐步构建完整的监控体系。关注用户体验指标，建立有效的告警策略。