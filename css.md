# CSS 学习笔记

> CSS (Cascading Style Sheets) 是用于描述HTML文档样式的样式表语言，控制网页的布局和视觉效果。

## 📚 学习路径

### 基础知识
- [CSS基础语法](#css基础语法)
- [选择器](#选择器)
- [盒模型](#盒模型)
- [定位与布局](#定位与布局)

### 进阶内容
- [Flexbox布局](#flexbox布局)
- [Grid布局](#grid布局)
- [响应式设计](#响应式设计)
- [动画与过渡](#动画与过渡)

### 高级特性
- [CSS变量](#css变量)
- [伪类与伪元素](#伪类与伪元素)
- [混合模式](#混合模式)
- [现代CSS特性](#现代css特性)

## 🎨 CSS基础语法

### 基本结构
```css
/* CSS注释 */
selector {
    property: value;
    property: value;
}

/* 多重选择器 */
h1, h2, h3 {
    color: #333;
    font-weight: bold;
}

/* 嵌套规则（CSS预处理器） */
.container {
    width: 100%;
    .header {
        height: 60px;
    }
}
```

### 引入CSS
```html
<!-- 外部样式表 -->
<link rel="stylesheet" href="styles.css">

<!-- 内部样式表 -->
<style>
    body {
        font-family: Arial, sans-serif;
    }
</style>

<!-- 内联样式 -->
<div style="color: red; font-size: 16px;">内联样式</div>

<!-- @import导入 -->
<style>
    @import url("reset.css");
    @import url("typography.css");
</style>
```

## 🎯 选择器

### 基础选择器
```css
/* 元素选择器 */
p { color: blue; }

/* 类选择器 */
.highlight { background-color: yellow; }

/* ID选择器 */
#header { font-size: 24px; }

/* 通用选择器 */
* { margin: 0; padding: 0; }
```

### 组合选择器
```css
/* 后代选择器 */
.container p { margin: 10px; }

/* 子选择器 */
ul > li { list-style: none; }

/* 相邻兄弟选择器 */
h1 + p { font-weight: bold; }

/* 通用兄弟选择器 */
h1 ~ p { color: gray; }
```

### 属性选择器
```css
/* 存在属性 */
[disabled] { opacity: 0.6; }

/* 精确匹配 */
[type="text"] { border: 1px solid #ccc; }

/* 包含匹配 */
[class~="active"] { color: red; }

/* 开头匹配 */
[href^="https"] { color: green; }

/* 结尾匹配 */
[src$=".jpg"] { border: 1px solid blue; }

/* 包含字符串 */
[title*="example"] { font-weight: bold; }

/* 语言匹配 */
[lang|="en"] { font-style: italic; }
```

### 伪类选择器
```css
/* 动态伪类 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* UI状态伪类 */
input:focus { outline: 2px solid blue; }
input:enabled { background: white; }
input:disabled { background: #f0f0f0; }
input:checked { transform: scale(1.2); }

/* 结构性伪类 */
:first-child { font-weight: bold; }
:last-child { margin-bottom: 0; }
:nth-child(odd) { background: #f0f0f0; }
:nth-child(even) { background: #fff; }
:nth-child(3n) { border-left: 3px solid blue; }

/* 表单伪类 */
:required { border: 2px solid red; }
:optional { border: 1px solid #ccc; }
:valid { border-color: green; }
:invalid { border-color: red; }
```

### 伪元素选择器
```css
/* ::before 和 ::after */
.quote::before { content: """; }
.quote::after { content: """; }

/* ::first-line 和 ::first-letter */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; float: left; }

/* ::selection */
::selection { background: yellow; color: black; }

/* ::placeholder */
input::placeholder { color: #999; }
```

## 📦 盒模型

### 标准盒模型
```css
.box {
    /* 内容区域 */
    width: 200px;
    height: 100px;
    
    /* 内边距 */
    padding: 10px;
    
    /* 边框 */
    border: 2px solid #333;
    
    /* 外边距 */
    margin: 20px;
    
    /* 盒模型类型 */
    box-sizing: content-box; /* 默认值 */
}
```

### IE盒模型
```css
.box {
    width: 200px; /* 包含padding和border */
    height: 100px;
    padding: 10px;
    border: 2px solid #333;
    margin: 20px;
    box-sizing: border-box;
}
```

### 边框样式
```css
.border-demo {
    /* 边框宽度 */
    border-width: 1px 2px 3px 4px; /* 上右下左 */
    border-width: 1px 2px; /* 上下 左右 */
    border-width: 1px; /* 所有方向 */
    
    /* 边框样式 */
    border-style: solid dashed dotted double;
    
    /* 边框颜色 */
    border-color: #ff0000 #00ff00 #0000ff #ffffff;
    
    /* 简写 */
    border: 2px solid #333;
    
    /* 圆角 */
    border-radius: 5px;
    border-radius: 50%; /* 圆形 */
    border-radius: 10px 20px 30px 40px;
    
    /* 轮廓 */
    outline: 2px dashed blue;
    outline-offset: 5px;
}
```

## 📍 定位与布局

### 定位类型
```css
/* 静态定位（默认） */
.static { position: static; }

/* 相对定位 */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* 绝对定位 */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
}

/* 固定定位 */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

/* 粘性定位 */
.sticky {
    position: sticky;
    top: 0;
    background: white;
}
```

### 浮动布局
```css
.float-container {
    overflow: hidden; /* 清除浮动 */
}

.float-left {
    float: left;
    width: 200px;
    margin-right: 20px;
}

.float-right {
    float: right;
    width: 200px;
    margin-left: 20px;
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

### 显示属性
```css
/* 块级元素 */
.block { display: block; }

/* 行内元素 */
.inline { display: inline; }

/* 行内块元素 */
.inline-block { 
    display: inline-block; 
    width: 100px;
    height: 50px;
}

/* 隐藏元素 */
.hidden { display: none; }
.invisible { visibility: hidden; }

/* 弹性容器 */
.flex { display: flex; }

/* 网格容器 */
.grid { display: grid; }
```

## 🔄 Flexbox布局

### 容器属性
```css
.flex-container {
    display: flex;
    
    /* 方向 */
    flex-direction: row; /* row | row-reverse | column | column-reverse */
    
    /* 换行 */
    flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */
    
    /* 简写 */
    flex-flow: row wrap;
    
    /* 主轴对齐 */
    justify-content: flex-start; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
    
    /* 交叉轴对齐 */
    align-items: stretch; /* stretch | flex-start | flex-end | center | baseline */
    
    /* 多行对齐 */
    align-content: stretch; /* stretch | flex-start | flex-end | center | space-between | space-around */
    
    /* 间距 */
    gap: 10px;
    row-gap: 10px;
    column-gap: 20px;
}
```

### 项目属性
```css
.flex-item {
    /* 增长 */
    flex-grow: 0; /* 默认值 */
    
    /* 收缩 */
    flex-shrink: 1; /* 默认值 */
    
    /* 基础大小 */
    flex-basis: auto; /* auto | <length> */
    
    /* 简写 */
    flex: 0 1 auto; /* flex-grow flex-shrink flex-basis */
    
    /* 单独对齐 */
    align-self: auto; /* auto | flex-start | flex-end | center | baseline | stretch */
    
    /* 排序 */
    order: 0; /* 整数值 */
}
```

### 常用布局模式
```css
/* 水平居中 */
.center-horizontal {
    display: flex;
    justify-content: center;
}

/* 垂直居中 */
.center-vertical {
    display: flex;
    align-items: center;
}

/* 完全居中 */
.center-both {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 两端对齐 */
.space-between {
    display: flex;
    justify-content: space-between;
}

/* 等分布局 */
.equal-columns {
    display: flex;
}
.equal-columns > * {
    flex: 1;
}

/* 响应式网格 */
.responsive-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.responsive-grid > * {
    flex: 1 1 300px; /* 基础宽度300px，可伸缩 */
}
```

## 🏗️ Grid布局

### 容器属性
```css
.grid-container {
    display: grid;
    
    /* 定义网格 */
    grid-template-columns: 1fr 2fr 1fr; /* 三列 */
    grid-template-rows: 100px auto 50px; /* 三行 */
    
    /* 简写 */
    grid-template: 
        "header header header" 100px
        "sidebar main aside" auto
        "footer footer footer" 50px
        / 1fr 2fr 1fr;
    
    /* 间距 */
    gap: 20px;
    grid-gap: 20px;
    
    /* 区域对齐 */
    justify-items: stretch; /* stretch | start | end | center */
    align-items: stretch; /* stretch | start | end | center */
    
    /* 网格对齐 */
    justify-content: start; /* start | end | center | stretch | space-around | space-between | space-evenly */
    align-content: start;
}
```

### 项目属性
```css
.grid-item {
    /* 列位置 */
    grid-column: 1 / 3; /* 从第1列到第3列 */
    grid-column: span 2; /* 跨越2列 */
    grid-column: 1; /* 在第1列 */
    
    /* 行位置 */
    grid-row: 2 / 4;
    grid-row: span 2;
    grid-row: 2;
    
    /* 简写 */
    grid-area: 2 / 1 / 4 / 3; /* row-start / column-start / row-end / column-end */
    
    /* 命名区域 */
    grid-area: header; /* 对应grid-template-areas中的名称 */
    
    /* 单独对齐 */
    justify-self: start; /* start | end | center | stretch */
    align-self: start;
}
```

### 常用布局模式
```css
/* 经典布局 */
.classic-layout {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: 60px 1fr 40px;
    min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* 响应式网格 */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

/* 卡片布局 */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}
```

## 📱 响应式设计

### 媒体查询
```css
/* 移动设备优先 */
.container {
    width: 100%;
    padding: 10px;
}

/* 平板设备 */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
        padding: 20px;
    }
}

/* 桌面设备 */
@media (min-width: 1024px) {
    .container {
        width: 970px;
    }
}

/* 大屏设备 */
@media (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}

/* 高分辨率屏幕 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .logo {
        background-image: url('logo@2x.png');
    }
}

/* 打印样式 */
@media print {
    .no-print {
        display: none;
    }
    body {
        font-size: 12pt;
    }
}
```

### 弹性单位
```css
/* 相对单位 */
.responsive-text {
    font-size: 16px; /* 基准 */
    font-size: 1rem; /* 相对于根元素字体大小 */
    font-size: 1em; /* 相对于父元素字体大小 */
    
    width: 50vw; /* 视口宽度的50% */
    height: 100vh; /* 视口高度的100% */
    margin: 2vmin; /* 视口最小尺寸的2% */
    padding: 1vmax; /* 视口最大尺寸的1% */
}

/* 计算属性 */
.calculated-size {
    width: calc(100% - 40px);
    height: calc(50vh - 20px);
    font-size: calc(14px + (26 - 14) * ((100vw - 320px) / (1600 - 320)));
}
```

### 响应式图片
```css
.responsive-image {
    max-width: 100%;
    height: auto;
}

/* 响应式背景图 */
.hero-image {
    background-image: url('small.jpg');
    background-size: cover;
    background-position: center;
    height: 300px;
}

@media (min-width: 768px) {
    .hero-image {
        background-image: url('medium.jpg');
        height: 400px;
    }
}

@media (min-width: 1024px) {
    .hero-image {
        background-image: url('large.jpg');
        height: 500px;
    }
}
```

## 🎬 动画与过渡

### 过渡效果
```css
.transition-demo {
    background: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    
    /* 过渡属性 */
    transition-property: background, color, transform;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
    
    /* 简写 */
    transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.transition-demo:hover {
    background: #2980b9;
    color: white;
    transform: translateY(-2px);
}
```

### 关键帧动画
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.animation-demo {
    animation-name: slideIn;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    /* 简写 */
    animation: slideIn 0.5s ease-out forwards;
}

.pulse-animation {
    animation: pulse 2s infinite;
}
```

### 变换效果
```css
.transform-demo {
    /* 2D变换 */
    transform: translateX(50px); /* 水平移动 */
    transform: translateY(30px); /* 垂直移动 */
    transform: translate(50px, 30px); /* 同时移动 */
    
    transform: rotate(45deg); /* 旋转 */
    transform: scale(1.5); /* 缩放 */
    transform: scale(1.5, 0.8); /* 水平垂直缩放 */
    
    transform: skewX(20deg); /* 水平倾斜 */
    transform: skewY(10deg); /* 垂直倾斜 */
    transform: skew(20deg, 10deg); /* 同时倾斜 */
    
    /* 3D变换 */
    transform: translateZ(100px);
    transform: rotateX(45deg);
    transform: rotateY(45deg);
    transform: rotateZ(45deg);
    
    /* 组合变换 */
    transform: translate(50px, 30px) rotate(45deg) scale(1.2);
    
    /* 变换原点 */
    transform-origin: center center; /* 默认值 */
    transform-origin: top left;
    transform-origin: 50% 50%;
}
```

## 🎨 CSS变量

### 自定义属性
```css
:root {
    /* 定义变量 */
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --text-color: #333;
    --background-color: #fff;
    --border-radius: 4px;
    --font-size-base: 16px;
    --spacing-unit: 8px;
}

/* 使用变量 */
.button {
    background-color: var(--primary-color);
    color: var(--text-color);
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
    padding: calc(var(--spacing-unit) * 2);
}

/* 变量默认值 */
.fallback {
    color: var(--undefined-color, #666);
}
```

### 动态变量
```css
/* 主题切换 */
.theme-light {
    --bg-color: #ffffff;
    --text-color: #333333;
    --border-color: #dddddd;
}

.theme-dark {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --border-color: #444444;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    transition: background-color 0.3s, color 0.3s;
}

/* 响应式变量 */
@media (min-width: 768px) {
    :root {
        --font-size-base: 18px;
        --spacing-unit: 12px;
    }
}
```

## 🎭 伪类与伪元素

### 常用伪类
```css
/* 表单状态 */
input:focus {
    outline: 2px solid blue;
    outline-offset: 2px;
}

input:invalid {
    border-color: red;
}

input:valid {
    border-color: green;
}

input:required {
    border-left: 3px solid red;
}

input:optional {
    border-left: 3px solid gray;
}

/* 结构性伪类 */
li:first-child {
    font-weight: bold;
}

li:last-child {
    margin-bottom: 0;
}

li:nth-child(odd) {
    background: #f0f0f0;
}

li:nth-child(even) {
    background: #ffffff;
}

li:nth-child(3n) {
    border-left: 3px solid blue;
}

/* 否定伪类 */
:not(.disabled) {
    cursor: pointer;
}

/* 空元素 */
.empty:empty {
    display: none;
}

/* 唯一子元素 */
:only-child {
    font-weight: bold;
}
```

### 常用伪元素
```css
/* 内容生成 */
.quote::before {
    content: """;
    font-size: 2em;
    color: #ccc;
}

.quote::after {
    content: """;
    font-size: 2em;
    color: #ccc;
}

/* 装饰效果 */
.link::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: blue;
    transition: width 0.3s;
}

.link:hover::after {
    width: 100%;
}

/* 清除浮动 */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* 计数器 */
.counter-list {
    counter-reset: section;
}

.counter-list li::before {
    counter-increment: section;
    content: counter(section) ". ";
    font-weight: bold;
}
```

## 🌈 混合模式

### 背景混合
```css
.blend-mode {
    background: 
        linear-gradient(45deg, #ff0000, #00ff00),
        linear-gradient(-45deg, #0000ff, #ffff00);
    background-blend-mode: multiply; /* multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity */
}

/* 多背景混合 */
.multi-blend {
    background: 
        url('image1.jpg'),
        url('image2.jpg'),
        linear-gradient(45deg, #ff0000, #00ff00);
    background-blend-mode: screen, multiply;
}
```

### 元素混合
```css
.blend-element {
    mix-blend-mode: multiply; /* 与背景混合 */
    background: rgba(255, 0, 0, 0.5);
}

.isolation-mode {
    isolation: isolate; /* 创建新的层叠上下文 */
}

/* 文字混合 */
.text-blend {
    background: linear-gradient(45deg, #ff0000, #00ff00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    mix-blend-mode: difference;
}
```

## 🚀 现代CSS特性

### 容器查询
```css
.card-container {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}

@container (min-width: 600px) {
    .card {
        flex-direction: column;
    }
}
```

### 逻辑属性
```css
.logical-properties {
    /* 逻辑边距 */
    margin-block: 10px 20px; /* 块方向开始和结束 */
    margin-inline: 15px; /* 内联方向 */
    
    /* 逻辑内边距 */
    padding-block-start: 10px;
    padding-inline-end: 20px;
    
    /* 逻辑边框 */
    border-block: 1px solid #ccc;
    border-inline-start: 2px solid blue;
    
    /* 逻辑尺寸 */
    block-size: 100px; /* 相当于height */
    inline-size: 200px; /* 相当于width */
    
    /* 文本对齐 */
    text-align: start; /* start | end */
    text-align: end;
}
```

### 滚动驱动动画
```css
.scroll-timeline {
    scroll-timeline-name: --scroll;
}

@keyframes progress {
    to {
        transform: translateX(calc(-100% + 100vw));
    }
}

.scrolling-element {
    animation: progress linear;
    animation-timeline: --scroll;
}
```

### 级联层
```css
/* 定义级联层 */
@layer base, components, utilities;

@layer base {
    body {
        font-family: system-ui;
        line-height: 1.5;
    }
}

@layer components {
    .button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
    }
}

@layer utilities {
    .text-center {
        text-align: center;
    }
}

/* 无层级的样式优先级更高 */
.unlayered {
    color: red; /* 优先级高于所有层 */
}
```

## 🔧 实用技巧

### 居中技巧
```css
/* Flexbox居中 */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Grid居中 */
.grid-center {
    display: grid;
    place-items: center;
}

/* 绝对定位居中 */
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 表格居中 */
.table-center {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
```

### 三角形制作
```css
.triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}

.triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 100px solid blue;
}
```

### 文本省略
```css
/* 单行省略 */
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 多行省略 */
.text-ellipsis-multiline {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

### 滚动条样式
```css
.custom-scrollbar {
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #888 #f1f1f1; /* Firefox */
}

.custom-scrollbar::-webkit-scrollbar {
    width: 8px; /* Chrome, Safari */
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```

## 🔗 相关资源

- [MDN CSS文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)
- [CSS规范](https://www.w3.org/Style/CSS/)

---

> 💡 **学习建议**: CSS是前端开发的核心技能，重点掌握布局系统和现代CSS特性。多练习实际项目，理解每个属性的适用场景和最佳实践。关注CSS的新特性，保持技术更新。