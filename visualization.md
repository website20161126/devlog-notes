# 数据可视化

> 数据可视化是将数据转换为图形或图像形式的过程，帮助人们更好地理解和分析数据。

## 📚 学习路径

### 图表库
- [ECharts 企业级图表](/visualization/echarts)
- [D3.js 数据驱动文档](#d3js)
- [Chart.js 轻量图表](#chartjs)
- [AntV 蚂蚁数据可视化](#antv)

### 基础技术
- [SVG 矢量图形](/visualization/svg)
- [Canvas 位图绘制](/visualization/canvas)
- [WebGL 3D 图形](#webgl)
- [动画与交互](#动画与交互)

## 🎨 图表库对比

### 主流图表库特性对比

| 图表库 | 学习曲线 | 性能 | 定制性 | 生态 | 适用场景 |
|--------|----------|------|--------|------|----------|
| ECharts | 🟢 简单 | ⚡ 高 | 🟡 中等 | 🟢 丰富 | 企业级应用 |
| D3.js | 🔴 陡峭 | ⚡ 高 | 🟢 极强 | 🟢 丰富 | 复杂定制 |
| Chart.js | 🟢 简单 | 🟡 中等 | 🟡 中等 | 🟡 一般 | 简单图表 |
| AntV | 🟡 中等 | ⚡ 高 | 🟢 强大 | 🟢 丰富 | 数据分析 |

### ECharts 基础示例

```javascript
// 安装: npm install echarts
import * as echarts from 'echarts'

// 初始化图表
const chartDom = document.getElementById('main')
const myChart = echarts.init(chartDom)

// 配置选项
const option = {
  title: {
    text: '销售数据统计',
    subtext: '2024年第一季度'
  },
  
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  
  legend: {
    data: ['产品A', '产品B', '产品C']
  },
  
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['一月', '二月', '三月']
  },
  
  yAxis: {
    type: 'value'
  },
  
  series: [
    {
      name: '产品A',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: [120, 132, 101]
    },
    {
      name: '产品B',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: [220, 182, 191]
    },
    {
      name: '产品C',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: [150, 232, 201]
    }
  ]
}

// 设置配置项
myChart.setOption(option)

// 响应式处理
window.addEventListener('resize', () => {
  myChart.resize()
})
```

### 动态数据更新

```javascript
// 模拟实时数据
function updateData() {
  const newData = generateRandomData()
  myChart.setOption({
    series: [{
      data: newData
    }]
  })
}

// 定时更新
setInterval(updateData, 3000)

// 数据加载动画
myChart.showLoading()
fetch('/api/chart-data')
  .then(response => response.json())
  .then(data => {
    myChart.hideLoading()
    myChart.setOption({
      series: [{
        data: data
      }]
    })
  })
```

## 🎭 D3.js 数据驱动

### 基础概念

```javascript
// 选择元素
d3.select('#chart')
  .selectAll('div')
  .data([4, 8, 15, 16, 23, 42])
  .enter()
  .append('div')
  .style('width', d => `${d * 10}px`)
  .text(d => d)

// 比例尺
const scale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 500])

// 坐标轴
const xAxis = d3.axisBottom(scale)
d3.select('#x-axis')
  .call(xAxis)
```

### 力导向图

```javascript
// 力导向图数据
const graphData = {
  nodes: [
    { id: 1, name: 'Node 1', group: 1 },
    { id: 2, name: 'Node 2', group: 1 },
    { id: 3, name: 'Node 3', group: 2 }
  ],
  links: [
    { source: 1, target: 2, value: 1 },
    { source: 2, target: 3, value: 2 }
  ]
}

// 创建力导向图
const width = 800
const height = 600

const svg = d3.select('#force-graph')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const simulation = d3.forceSimulation(graphData.nodes)
  .force('link', d3.forceLink(graphData.links))
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(width / 2, height / 2))

// 绘制连线
const link = svg.append('g')
  .selectAll('line')
  .data(graphData.links)
  .enter()
  .append('line')
  .attr('stroke', '#999')
  .attr('stroke-opacity', 0.6)
  .attr('stroke-width', d => Math.sqrt(d.value))

// 绘制节点
const node = svg.append('g')
  .selectAll('circle')
  .data(graphData.nodes)
  .enter()
  .append('circle')
  .attr('r', 5)
  .attr('fill', d => d3.schemeCategory10[d.group])

// 添加拖拽功能
node.call(d3.drag()
  .on('start', dragstarted)
  .on('drag', dragged)
  .on('end', dragended))

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
}

function dragged(event, d) {
  d.fx = event.x
  d.fy = event.y
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0)
  d.fx = null
  d.fy = null
}

simulation.on('tick', () => {
  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
  
  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
})
```

## 🎯 Chart.js 轻量图表

### 基础配置

```javascript
// 安装: npm install chart.js
import { Chart } from 'chart.js/auto'

// 创建图表
const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
  type: 'bar', // 图表类型
  
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
})
```

### 混合图表

```javascript
const mixedChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: [0, 10, 5, 2, 20, 30],
        fill: false
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgb(54, 162, 235)',
        data: [0, 15, 10, 8, 25, 35],
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  }
})
```

## 🎪 AntV 数据可视化

### G2 图表语法

```javascript
// 安装: npm install @antv/g2
import { Chart } from '@antv/g2'

// 创建图表
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500
})

// 数据准备
const data = [
  { genre: 'Sports', sold: 275, type: 'A' },
  { genre: 'Strategy', sold: 115, type: 'B' },
  { genre: 'Action', sold: 120, type: 'C' },
  { genre: 'Shooter', sold: 350, type: 'D' },
  { genre: 'Other', sold: 150, type: 'E' }
]

// 数据加载
chart.data(data)

// 映射图形
chart.interval()
  .position('genre*sold')
  .color('genre')
  .label('sold')

// 渲染图表
chart.render()
```

### G6 关系图

```javascript
// 安装: npm install @antv/g6
import { Graph } from '@antv/g6'

// 数据
const data = {
  nodes: [
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' }
  ],
  edges: [
    { source: 'node1', target: 'node2', label: '连接' },
    { source: 'node2', target: 'node3', label: '连接' }
  ]
}

// 创建图
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node']
  },
  layout: {
    type: 'force',
    preventOverlap: true,
    nodeSize: 30
  }
})

// 读取数据
graph.data(data)

// 渲染图
graph.render()
```

## 🎨 动画与交互

### 过渡动画

```javascript
// ECharts 动画配置
const option = {
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut',
  animationDelay: function (idx) {
    return idx * 100
  }
}

// D3.js 过渡动画
d3.select('circle')
  .transition()
  .duration(1000)
  .ease(d3.easeBounce)
  .attr('r', 50)
  .attr('fill', 'red')
```

### 交互事件

```javascript
// ECharts 事件
myChart.on('click', function (params) {
  console.log(params.name, params.value)
})

// D3.js 事件
d3.selectAll('circle')
  .on('mouseover', function(event, d) {
    d3.select(this)
      .attr('r', d.r * 1.2)
      .attr('fill', 'orange')
  })
  .on('mouseout', function(event, d) {
    d3.select(this)
      .attr('r', d.r)
      .attr('fill', 'blue')
  })
```

## 📊 数据处理

### 数据聚合

```javascript
// 使用 d3-array 进行数据聚合
import { rollup, sum, mean } from 'd3-array'

const data = [
  { category: 'A', value: 10 },
  { category: 'A', value: 20 },
  { category: 'B', value: 15 },
  { category: 'B', value: 25 }
]

// 按类别聚合
const aggregated = Array.from(
  rollup(data, 
    v => sum(v, d => d.value),
    d => d.category
  ),
  ([key, value]) => ({ category: key, total: value })
)
```

### 数据格式化

```javascript
// 格式化工具
const formatNumber = d3.format(',.0f')
const formatPercent = d3.format('.1%')
const formatDate = d3.timeFormat('%Y-%m-%d')

console.log(formatNumber(1234567)) // "1,234,567"
console.log(formatPercent(0.1234)) // "12.3%"
console.log(formatDate(new Date())) // "2024-01-01"
```

## 🔗 相关链接

- [ECharts 详解](/visualization/echarts)
- [SVG 教程](/visualization/svg)
- [Canvas 教程](/visualization/canvas)
- [数据可视化最佳实践](https://github.com/d3/d3/wiki/Gallery)

---

> 💡 **学习建议**: 数据可视化需要结合设计思维和技术实现，建议从基础图表开始，逐步掌握高级定制和交互设计。多练习真实数据场景，培养数据洞察力。