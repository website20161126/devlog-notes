---
title: Three.js 粒子系统交互
description: 基于 Three.js 和 MediaPipe 的手势控制粒子系统交互演示
layout: page
---

# Three.js 粒子系统交互

<ClientOnly>
<div class="threejs-interactive-app">
  <iframe 
    src="/devlog-notes/threejs-particles-demo.html" 
    width="100%" 
    height="calc(100vh - 200px)" 
    frameborder="0"
    style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); min-height: 600px;">
  </iframe>
  
  <div class="app-instructions">
    <h2>🎮 使用说明</h2>
    <div class="instruction-grid">
      <div class="instruction-item">
        <div class="instruction-icon">👋</div>
        <div class="instruction-text">
          <strong>手势控制</strong>
          <p>张开手掌扩散粒子，握拳收缩粒子</p>
        </div>
      </div>
      <div class="instruction-item">
        <div class="instruction-icon">🎨</div>
        <div class="instruction-text">
          <strong>颜色调节</strong>
          <p>使用右侧控制面板自定义粒子颜色</p>
        </div>
      </div>
      <div class="instruction-item">
        <div class="instruction-icon">✨</div>
        <div class="instruction-text">
          <strong>形状切换</strong>
          <p>选择爱心、花朵、土星、佛像或球体</p>
        </div>
      </div>
      <div class="instruction-item">
        <div class="instruction-icon">⛶</div>
        <div class="instruction-text">
          <strong>全屏体验</strong>
          <p>点击全屏按钮获得沉浸式体验</p>
        </div>
      </div>
    </div>
    
    <div class="system-requirements">
      <h3>📋 系统要求</h3>
      <ul>
        <li>✅ 支持 WebGL 的现代浏览器</li>
        <li>✅ 摄像头权限（用于手势控制）</li>
        <li>✅ 稳定的网络连接（加载模型）</li>
      </ul>
    </div>
  </div>
</div>
</ClientOnly>

<style>
.threejs-interactive-app {
  margin: 0;
  padding: 0;
  max-width: none;
}

.app-instructions {
  margin-top: 2rem;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}

.instruction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  transition: transform 0.2s ease;
}

.instruction-item:hover {
  transform: translateY(-2px);
}

.instruction-icon {
  font-size: 2rem;
  line-height: 1;
}

.instruction-text strong {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand-1);
}

.instruction-text p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.system-requirements {
  margin-top: 2rem;
}

.system-requirements h3 {
  margin-bottom: 1rem;
  color: var(--vp-c-heading-1);
}

.system-requirements ul {
  list-style: none;
  padding: 0;
}

.system-requirements li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-border);
}

.system-requirements li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .instruction-grid {
    grid-template-columns: 1fr;
  }
  
  .app-instructions {
    padding: 1rem;
  }
}
</style>