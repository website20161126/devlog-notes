# Three.js 粒子系统技术文档

> Three.js 是一个强大的 3D JavaScript 库，结合 MediaPipe 可以实现基于手势识别的粒子系统交互效果。

## 🎯 概述

这是一个集成了 Three.js 粒子系统和 MediaPipe 手势识别的交互式 3D 可视化项目。通过摄像头捕捉手势动作，实时控制粒子的扩散和收缩效果。

## 🛠️ 技术栈

### 核心依赖
- **Three.js (r128)** - 3D 图形渲染库
- **MediaPipe Hands** - Google 开源的手势识别模型
- **Camera Utils** - 摄像头工具库

### 特性功能
- ✨ 5种预设粒子形状（爱心、花朵、土星、佛像、球体）
- 👋 实时手势识别控制
- 🎨 自定义粒子颜色
- 📱 移动端响应式设计
- ⛶ 全屏模式支持
- 🔄 流畅的动画过渡效果

## 🚀 快速开始

### 1. 环境准备

创建基础的 HTML 文件结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js 粒子系统交互</title>
  <!-- 引入必要的依赖库 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"></script>
</head>
<body>
  <video id="input_video" style="display: none;"></video>
  <div id="status">正在加载...</div>
  <!-- UI 控制面板 -->
  <div id="ui-panel">
    <h2>粒子控制台</h2>
    <!-- 控制组件 -->
  </div>
  <!-- 权限弹窗 -->
  <div id="permission-modal">
    <div class="modal-content">
      <h3>启用实时手势追踪</h3>
      <p>本应用需要使用您的摄像头进行实时的手势识别</p>
      <button onclick="handlePermission(true)">允许访问</button>
      <button onclick="handlePermission(false)">仅预览</button>
    </div>
  </div>
</body>
</html>
```

### 2. Three.js 场景初始化

```javascript
function initThree() {
  // 创建场景
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.02);
  
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.z = 30;
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  
  // 创建粒子系统
  createParticles();
}
```

### 3. 粒子系统实现

```javascript
function createParticles() {
  const PARTICLE_COUNT = 15000;
  
  // 创建几何体
  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  
  // 初始化粒子位置和颜色
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    
    colors[i * 3] = 0;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 1;
  }
  
  // 设置几何体属性
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  // 创建材质
  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.8
  });
  
  // 创建粒子系统
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}
```

## 🎨 形状生成算法

### 爱心形状
```javascript
function generateHeart() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const t = Math.PI - 2 * Math.PI * u;
    const p = Math.acos(2 * v - 1);
    
    const x = 16 * Math.pow(Math.sin(p), 3) * Math.cos(t) * 0.5;
    const y = (13 * Math.cos(p) - 5 * Math.cos(2 * p) - 
               2 * Math.cos(3 * p) - Math.cos(4 * p)) * 0.5;
    const z = 8 * Math.pow(Math.sin(p), 3) * Math.sin(t) * 0.5;
    
    targetPositions[i * 3] = x;
    targetPositions[i * 3 + 1] = y;
    targetPositions[i * 3 + 2] = z;
  }
}
```

### 球体形状
```javascript
function generateSphere() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = 10;
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    targetPositions[i * 3] = x;
    targetPositions[i * 3 + 1] = y;
    targetPositions[i * 3 + 2] = z;
  }
}
```

### 花朵形状
```javascript
function generateFlower() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    
    // 使用花瓣形状公式
    const k = 5;
    const r = 10 * Math.cos(k * theta) * Math.sin(phi) + 5;
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi) * 0.6;
    const z = r * Math.sin(phi) * Math.sin(theta);
    
    targetPositions[i * 3] = x;
    targetPositions[i * 3 + 1] = y;
    targetPositions[i * 3 + 2] = z;
  }
}
```

## 👋 手势识别集成

### MediaPipe 配置
```javascript
function startCameraAndHands() {
  const videoElement = document.getElementById('input_video');
  
  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
  });
  
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  
  hands.onResults(onResults);
  
  const cameraUtils = new Camera(videoElement, {
    onFrame: async () => {
      if (cameraEnabled) {
        await hands.send({ image: videoElement });
      }
    },
    width: 640,
    height: 480
  });
  
  cameraUtils.start();
}
```

### 手势分析算法
```javascript
function onResults(results) {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];
    
    // 计算手掌张开程度
    const tips = [4, 8, 12, 16, 20]; // 拇指、食指、中指、无名指、小指指尖
    const wrist = landmarks[0];
    let avgDist = 0;
    
    tips.forEach(idx => {
      const tip = landmarks[idx];
      const d = Math.sqrt(
        Math.pow(tip.x - wrist.x, 2) +
        Math.pow(tip.y - wrist.y, 2)
      );
      avgDist += d;
    });
    avgDist /= 5;
    
    // 根据距离计算手势因子
    if (avgDist < 0.25) {
      // 握拳 - 粒子收缩
      handFactor = -1 * (1 - (avgDist / 0.25));
    } else if (avgDist > 0.35) {
      // 张开手掌 - 粒子扩散
      handFactor = (avgDist - 0.35) / 0.25;
    } else {
      // 中间状态
      handFactor = 0;
    }
    
    // 限制手势因子范围
    handFactor = Math.max(-0.8, Math.min(1.5, handFactor));
  }
}
```

## 🎬 动画循环

### 核心渲染逻辑
```javascript
function animate() {
  requestAnimationFrame(animate);
  
  const positions = particles.geometry.attributes.position.array;
  const speed = 0.08;
  
  // 计算目标缩放和扩散
  let targetScale = 1.0;
  let targetSpread = 0.0;
  
  if (cameraEnabled && handFactor > 0.2) {
    targetScale = 1.0 + (handFactor * 1.5);
    targetSpread = handFactor * 5.0;
  } else if (cameraEnabled && handFactor < -0.2) {
    targetScale = 1.0 + (handFactor * 0.8);
    targetSpread = 0;
  }
  
  // 平滑过渡
  handScale += (targetScale - handScale) * 0.1;
  handDiffusion += (targetSpread - handDiffusion) * 0.1;
  
  // 更新粒子位置
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    let tx = targetPositions[idx];
    let ty = targetPositions[idx + 1];
    let tz = targetPositions[idx + 2];
    
    // 应用手势缩放
    tx *= handScale;
    ty *= handScale;
    tz *= handScale;
    
    // 应用扩散效果
    if (handDiffusion > 0.1) {
      tx += (Math.random() - 0.5) * handDiffusion;
      ty += (Math.random() - 0.5) * handDiffusion;
      tz += (Math.random() - 0.5) * handDiffusion;
    }
    
    // 添加旋转动画
    const time = Date.now() * 0.0005;
    const cosT = Math.cos(time);
    const sinT = Math.sin(time);
    const rx = tx * cosT - tz * sinT;
    const rz = tx * sinT + tz * cosT;
    
    // 平滑移动到目标位置
    positions[idx] += (rx - positions[idx]) * speed;
    positions[idx + 1] += (ty - positions[idx + 1]) * speed;
    positions[idx + 2] += (rz - positions[idx + 2]) * speed;
  }
  
  // 更新几何体
  particles.geometry.attributes.position.needsUpdate = true;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
```

## 🎨 UI 组件设计

### 权限弹窗
```css
#permission-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #2a2a38;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #fff;
}
```

### 控制面板
```css
#ui-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 260px;
  background: rgba(20, 20, 35, 0.85);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s ease-out;
  z-index: 100;
}
```

## 📱 移动端适配

### 响应式设计
```css
@media (max-width: 600px) {
  #ui-panel {
    top: 60px;
    right: 10px;
    width: 240px;
    padding: 15px;
  }
  
  .control-group-shape {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .control-group-shape button {
    flex: 1 1 45%;
    margin-bottom: 0;
  }
}
```

## 🔧 常见问题与解决方案

### 1. 摄像头权限问题
```javascript
// 错误处理
cameraUtils.start()
  .then(() => {
    console.log("摄像头启动成功");
  })
  .catch(err => {
    cameraEnabled = false;
    statusDiv.innerText = "摄像头启动失败: " + err;
    statusDiv.style.color = "red";
  });
```

### 2. 性能优化
- 使用 `BufferGeometry` 减少内存占用
- 合理设置粒子数量（建议 10000-20000）
- 使用 `requestAnimationFrame` 优化动画循环
- 启用 GPU 加速渲染

### 3. 兼容性处理
```javascript
// 检查 WebGL 支持
if (!window.WebGLRenderingContext) {
  console.error('WebGL 不被支持');
  // 降级到 Canvas 2D
} else {
  // 初始化 Three.js
  initThree();
}
```

## 📊 性能指标

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 粒子数量 | 15000 | 平衡性能与视觉效果 |
| 渲染精度 | devicePixelRatio | 自动适配设备像素比 |
| 动画帧率 | 60fps | 流畅的视觉体验 |
| 手势响应时间 | <100ms | 实时交互反馈 |

## 🚀 部署建议

### 静态资源托管
- 建议使用 CDN 加速 Three.js 和 MediaPipe 库加载
- 启用 Gzip 压缩减少传输大小
- 配置适当的缓存策略

### HTTPS 要求
- MediaPipe 摄像头访问需要 HTTPS 环境
- 本地开发可使用 `localhost` 或自签名证书
- 生产环境建议配置有效的 SSL 证书

## 📚 参考资源

- [Three.js 官方文档](https://threejs.org/docs/)
- [MediaPipe Hands 文档](https://google.github.io/mediapipe/solutions/hands.html)
- [WebGL 最佳实践](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [性能优化指南](https://web.dev/performance/)

---

> 💡 **学习建议**: 建议先掌握 Three.js 基础知识，再学习 MediaPipe 手势识别，最后将两者结合实现完整的交互效果。重点关注性能优化和用户体验设计。