# HTML 学习笔记

> HTML (HyperText Markup Language) 是构建网页的基础标记语言，定义了网页的结构和内容。

## 📚 学习路径

### 基础知识
- [HTML基础结构](#html基础结构)
- [常用标签](#常用标签)
- [表单元素](#表单元素)
- [语义化标签](#语义化标签)

### 进阶内容
- [多媒体元素](#多媒体元素)
- [表单验证](#表单验证)
- [可访问性](#可访问性)
- [HTML5新特性](#html5新特性)

## 🏗️ HTML基础结构

### 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="页面描述">
    <meta name="keywords" content="关键词">
    <title>页面标题</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico">
</head>
<body>
    <!-- 页面内容 -->
    <header>
        <nav>导航</nav>
    </header>
    <main>
        <article>文章内容</article>
        <aside>侧边栏</aside>
    </main>
    <footer>页脚</footer>
    
    <script src="script.js"></script>
</body>
</html>
```

### DOCTYPE声明
```html
<!DOCTYPE html>              <!-- HTML5 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN">
```

## 🏷️ 常用标签

### 文本标签
```html
<!-- 标题标签 -->
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>

<!-- 文本格式化 -->
<p>段落文本</p>
<strong>重要文本</strong>
<em>强调文本</em>
<mark>标记文本</mark>
<small>小号文本</small>
<del>删除文本</del>
<ins>插入文本</ins>

<!-- 引用 -->
<blockquote>长引用</blockquote>
<q>短引用</q>
<cite>作品标题</cite>
<code>代码片段</code>
<pre>预格式化文本</pre>

<!-- 换行和分割 -->
<br>                     <!-- 换行 -->
<hr>                     <!-- 水平分割线 -->
```

### 列表标签
```html
<!-- 无序列表 -->
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>

<!-- 自定义列表 -->
<dl>
    <dt>术语1</dt>
    <dd>术语1的描述</dd>
    <dt>术语2</dt>
    <dd>术语2的描述</dd>
</dl>

<!-- 嵌套列表 -->
<ul>
    <li>水果
        <ul>
            <li>苹果</li>
            <li>香蕉</li>
        </ul>
    </li>
    <li>蔬菜</li>
</ul>
```

### 链接和锚点
```html
<!-- 外部链接 -->
<a href="https://www.example.com" target="_blank">外部链接</a>

<!-- 内部链接 -->
<a href="/about.html">关于我们</a>
<a href="#section1">跳转到章节1</a>

<!-- 邮件链接 -->
<a href="mailto:email@example.com">发送邮件</a>

<!-- 电话链接 -->
<a href="tel:+1234567890">拨打电话</a>

<!-- 下载链接 -->
<a href="document.pdf" download>下载PDF</a>

<!-- 锚点目标 -->
<section id="section1">
    <h2>章节1</h2>
    <p>内容...</p>
</section>
```

### 图片和媒体
```html
<!-- 图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">
<img src="image.jpg" alt="响应式图片" style="max-width: 100%; height: auto;">

<!-- 响应式图片 -->
<picture>
    <source media="(min-width: 768px)" srcset="large.jpg">
    <source media="(min-width: 480px)" srcset="medium.jpg">
    <img src="small.jpg" alt="响应式图片">
</picture>

<!-- 音频 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频元素。
</audio>

<!-- 视频 -->
<video width="640" height="480" controls poster="poster.jpg">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持视频标签。
</video>

<!-- 嵌入内容 -->
<iframe src="https://www.example.com" width="600" height="400"></iframe>
<embed src="content.pdf" type="application/pdf" width="600" height="400">
```

## 📝 表单元素

### 基本表单结构
```html
<form action="/submit" method="POST" enctype="multipart/form-data">
    <!-- 文本输入 -->
    <label for="username">用户名:</label>
    <input type="text" id="username" name="username" required>
    
    <!-- 密码输入 -->
    <label for="password">密码:</label>
    <input type="password" id="password" name="password" minlength="8" required>
    
    <!-- 邮箱输入 -->
    <label for="email">邮箱:</label>
    <input type="email" id="email" name="email" required>
    
    <!-- 数字输入 -->
    <label for="age">年龄:</label>
    <input type="number" id="age" name="age" min="1" max="120">
    
    <!-- 日期输入 -->
    <label for="birthday">生日:</label>
    <input type="date" id="birthday" name="birthday">
    
    <!-- 单选按钮 -->
    <fieldset>
        <legend>性别:</legend>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">男</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">女</label>
    </fieldset>
    
    <!-- 复选框 -->
    <fieldset>
        <legend>兴趣爱好:</legend>
        <input type="checkbox" id="reading" name="hobbies" value="reading">
        <label for="reading">阅读</label>
        <input type="checkbox" id="music" name="hobbies" value="music">
        <label for="music">音乐</label>
    </fieldset>
    
    <!-- 下拉选择 -->
    <label for="city">城市:</label>
    <select id="city" name="city">
        <option value="">请选择</option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </select>
    
    <!-- 文本域 -->
    <label for="message">留言:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
    
    <!-- 文件上传 -->
    <label for="avatar">头像:</label>
    <input type="file" id="avatar" name="avatar" accept="image/*">
    
    <!-- 提交按钮 -->
    <button type="submit">提交</button>
    <button type="reset">重置</button>
    <button type="button">普通按钮</button>
</form>
```

### 高级表单元素
```html
<!-- 范围滑块 -->
<label for="volume">音量:</label>
<input type="range" id="volume" name="volume" min="0" max="100" value="50">

<!-- 颜色选择器 -->
<label for="color">颜色:</label>
<input type="color" id="color" name="color" value="#ff0000">

<!-- 搜索框 -->
<label for="search">搜索:</label>
<input type="search" id="search" name="search" placeholder="输入搜索关键词">

<!-- URL输入 -->
<label for="website">网站:</label>
<input type="url" id="website" name="website" placeholder="https://example.com">

<!-- 电话输入 -->
<label for="phone">电话:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}">

<!-- 月份选择 -->
<label for="month">月份:</label>
<input type="month" id="month" name="month">

<!-- 周选择 -->
<label for="week">周:</label>
<input type="week" id="week" name="week">

<!-- 时间选择 -->
<label for="time">时间:</label>
<input type="time" id="time" name="time">

<!-- 日期时间选择 -->
<label for="datetime">日期时间:</label>
<input type="datetime-local" id="datetime" name="datetime">
```

## 🎨 语义化标签

### HTML5语义化元素
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>语义化页面示例</title>
</head>
<body>
    <!-- 页眉 -->
    <header>
        <h1>网站标题</h1>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/about">关于</a></li>
                <li><a href="/contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <!-- 主要内容区 -->
    <main>
        <!-- 文章 -->
        <article>
            <header>
                <h2>文章标题</h2>
                <time datetime="2024-01-01">2024年1月1日</time>
            </header>
            <section>
                <h3>章节1</h3>
                <p>文章内容...</p>
            </section>
            <section>
                <h3>章节2</h3>
                <p>更多内容...</p>
            </section>
            <footer>
                <p>作者: 张三</p>
            </footer>
        </article>

        <!-- 侧边栏 -->
        <aside>
            <h3>相关链接</h3>
            <ul>
                <li><a href="#">链接1</a></li>
                <li><a href="#">链接2</a></li>
            </ul>
        </aside>
    </main>

    <!-- 页脚 -->
    <footer>
        <p>&copy; 2024 版权所有</p>
        <address>
            联系方式: <a href="mailto:contact@example.com">contact@example.com</a>
        </address>
    </footer>
</body>
</html>
```

### 其他语义化标签
```html
<!-- 详情/摘要 -->
<details>
    <summary>点击查看详情</summary>
    <p>这里是详细内容...</p>
</details>

<!-- 对话框 -->
<dialog open>
    <p>这是一个对话框</p>
    <button>关闭</button>
</dialog>

<!-- 进度条 -->
<progress value="70" max="100">70%</progress>

<!-- 计量器 -->
<meter value="0.6" min="0" max="1">60%</meter>

<!-- 时间 -->
<time datetime="2024-01-01T12:00:00">2024年1月1日 中午12点</time>

<!-- 缩写 -->
<abbr title="World Wide Web">WWW</abbr>

<!-- 数据 -->
<data value="12345">产品编号</data>

<!-- 高亮 -->
<mark>重要内容</mark>

<!-- 变量 -->
<var>x</var> = <var>y</var> + <var>z</var>

<!-- 样例输出 -->
<samp>程序输出结果</samp>

<!-- 键盘输入 -->
<kbd>Ctrl</kbd> + <kbd>C</kbd>

<!-- 上标和下标 -->
H<sub>2</sub>O, X<sup>2</sup>

<!-- 从右到左文本 -->
<bdo dir="rtl">这是从右到左的文本</bdo>

<!-- 双向隔离 -->
<p>这是<span>English</span>和中文混合的文本。</p>

<!-- 双向覆盖 -->
<bdo dir="rtl">Hello <bdo dir="ltr">World</bdo></bdo>
```

## 🎭 多媒体元素

### Canvas绘图
```html
<canvas id="myCanvas" width="400" height="300">
    您的浏览器不支持Canvas。
</canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = '#FF0000';
ctx.fillRect(10, 10, 50, 50);

// 绘制圆形
ctx.beginPath();
ctx.arc(100, 75, 20, 0, 2 * Math.PI);
ctx.fillStyle = '#00FF00';
ctx.fill();

// 绘制文本
ctx.font = '20px Arial';
ctx.fillText('Hello Canvas', 150, 100);
</script>
```

### SVG图形
```html
<!-- 内联SVG -->
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="50" fill="blue" />
    <rect x="50" y="50" width="100" height="100" fill="red" opacity="0.5" />
    <text x="100" y="105" text-anchor="middle" fill="white">SVG</text>
</svg>

<!-- 嵌入SVG文件 -->
<img src="graphic.svg" alt="SVG图形" width="200" height="200">

<!-- 作为对象嵌入 -->
<object data="graphic.svg" type="image/svg+xml" width="200" height="200">
    您的浏览器不支持SVG。
</object>
```

### 响应式图片
```html
<!-- srcset属性 -->
<img src="small.jpg" 
     srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1024w"
     sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1024px"
     alt="响应式图片">

<!-- picture元素 -->
<picture>
    <source media="(min-width: 1024px)" srcset="large.jpg">
    <source media="(min-width: 768px)" srcset="medium.jpg">
    <source media="(min-width: 480px)" srcset="small.jpg">
    <img src="default.jpg" alt="默认图片">
</picture>
```

## ✅ 表单验证

### 内置验证属性
```html
<form>
    <!-- 必填字段 -->
    <input type="text" required>
    
    <!-- 最小/最大长度 -->
    <input type="text" minlength="3" maxlength="10">
    
    <!-- 数字范围 -->
    <input type="number" min="1" max="100" step="1">
    
    <!-- 正则表达式验证 -->
    <input type="text" pattern="[A-Za-z]{3,}" title="至少3个字母">
    
    <!-- 邮箱格式 -->
    <input type="email" required>
    
    <!-- URL格式 -->
    <input type="url" required>
    
    <!-- 自定义验证消息 -->
    <input type="text" id="custom" required>
    <script>
        document.getElementById('custom').setCustomValidity('请输入有效内容');
    </script>
</form>
```

### 验证API
```html
<form id="myForm">
    <input type="email" id="email" required>
    <button type="submit">提交</button>
</form>

<script>
const form = document.getElementById('myForm');
const email = document.getElementById('email');

form.addEventListener('submit', function(e) {
    if (!email.validity.valid) {
        if (email.validity.valueMissing) {
            email.setCustomValidity('请输入邮箱地址');
        } else if (email.validity.typeMismatch) {
            email.setCustomValidity('请输入有效的邮箱地址');
        }
        e.preventDefault();
    }
});

email.addEventListener('input', function() {
    email.setCustomValidity('');
});
</script>
```

## ♿ 可访问性

### ARIA属性
```html
<!-- 角色定义 -->
<header role="banner">页眉</header>
<nav role="navigation">导航</nav>
<main role="main">主要内容</main>
<aside role="complementary">补充内容</aside>
<footer role="contentinfo">页脚</footer>

<!-- 标签关联 -->
<label for="search">搜索:</label>
<input type="search" id="search" aria-label="搜索框">

<!-- 描述关联 -->
<input type="password" id="pwd" aria-describedby="pwd-help">
<div id="pwd-help">密码必须包含至少8个字符</div>

<!-- 状态指示 -->
<button aria-pressed="false">切换按钮</button>
<div aria-live="polite">动态内容区域</div>

<!-- 跳转链接 -->
<a href="#main-content" class="skip-link">跳转到主要内容</a>

<!-- 表格可访问性 -->
<table>
    <caption>月度销售数据</caption>
    <thead>
        <tr>
            <th scope="col">月份</th>
            <th scope="col">销售额</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">一月</th>
            <td>￥10,000</td>
        </tr>
    </tbody>
</table>
```

### 键盘导航
```html
<!-- 可聚焦元素 -->
<button tabindex="0">可聚焦按钮</button>
<div tabindex="0" role="button">模拟按钮</div>

<!-- Tab顺序控制 -->
<input type="text" tabindex="1">
<input type="text" tabindex="2">
<input type="text" tabindex="3">

<!-- 焦点管理 -->
<div id="modal" role="dialog" aria-hidden="true">
    <button id="close">关闭</button>
</div>

<script>
// 打开模态框时管理焦点
function openModal() {
    const modal = document.getElementById('modal');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

// 关闭模态框时恢复焦点
function closeModal() {
    const modal = document.getElementById('modal');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('close').focus();
}
</script>
```

## 🚀 HTML5新特性

### Web Storage
```html
<script>
// Local Storage
localStorage.setItem('username', 'John');
const username = localStorage.getItem('username');
localStorage.removeItem('username');
localStorage.clear();

// Session Storage
sessionStorage.setItem('tempData', 'temporary');
const tempData = sessionStorage.getItem('tempData');
</script>
```

### Geolocation
```html
<script>
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            console.log('纬度:', position.coords.latitude);
            console.log('经度:', position.coords.longitude);
        },
        function(error) {
            console.error('获取位置失败:', error.message);
        }
    );
}
</script>
```

### Web Workers
```html
<script>
// 主线程
const worker = new Worker('worker.js');
worker.postMessage('Hello Worker');

worker.onmessage = function(e) {
    console.log('收到消息:', e.data);
};

// worker.js
self.onmessage = function(e) {
    console.log('收到消息:', e.data);
    self.postMessage('Hello Main');
};
</script>
```

### 拖放API
```html
<div id="dragSource" draggable="true">可拖动元素</div>
<div id="dropTarget">放置目标</div>

<script>
const source = document.getElementById('dragSource');
const target = document.getElementById('dropTarget');

source.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', '拖动的数据');
});

target.addEventListener('dragover', function(e) {
    e.preventDefault();
});

target.addEventListener('drop', function(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    target.textContent = data;
});
</script>
```

## 🔧 最佳实践

### 代码规范
```html
<!-- 使用语义化标签 -->
<article class="post">
    <header>
        <h1>文章标题</h1>
        <time datetime="2024-01-01">2024年1月1日</time>
    </header>
    <main>
        <p>文章内容...</p>
    </main>
</article>

<!-- 合理使用div和span -->
<div class="container">
    <span class="highlight">重要文本</span>
</div>

<!-- 避免过度嵌套 -->
<div class="card">
    <h3>标题</h3>
    <p>内容</p>
</div>

<!-- 使用有意义的类名 -->
<nav class="main-navigation">
    <ul class="nav-list">
        <li class="nav-item"><a href="#" class="nav-link">首页</a></li>
    </ul>
</nav>
```

### 性能优化
```html
<!-- 延迟加载脚本 -->
<script src="script.js" defer></script>
<script src="script.js" async></script>

<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="prefetch" href="next-page.html">

<!-- 图片懒加载 -->
<img src="placeholder.jpg" data-src="real-image.jpg" 
     loading="lazy" alt="图片描述">

<!-- 内联关键CSS -->
<style>
    /* 关键CSS */
    .critical { color: red; }
</style>

<!-- 压缩资源 -->
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js"></script>
```

## 🔗 相关资源

- [MDN HTML文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [HTML5规范](https://html.spec.whatwg.org/)
- [Can I Use](https://caniuse.com/)
- [HTML验证器](https://validator.w3.org/)

---

> 💡 **学习建议**: HTML是前端开发的基础，重点掌握语义化标签和可访问性。多练习实际项目，理解每个标签的适用场景和最佳实践。