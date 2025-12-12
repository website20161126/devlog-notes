---
title: 手势捏碎模型
description: 基于 Three.js + MediaPipe 的手势驱动粒子化效果
layout: page
---

# 手势捏碎模型

<ClientOnly>
<div class="gesture-crush-app">
  <div class="demo-header">
    <h2>💥 张开重构，握拳捏碎</h2>
    <p>允许摄像头后，张开手掌模型会重新聚合，缓慢握拳即可让模型粒子化并向外扩散。</p>
    <ul>
      <li>👋 仅识别一只手，保持手掌在画面中央</li>
      <li>🖥️ 建议使用 HTTPS 环境，以便顺利启用摄像头</li>
      <li>⚙️ 如权限被拒，可刷新页面重新授权</li>
    </ul>
  </div>

  <div id="gesture-crush-container" class="gesture-crush-canvas"></div>
  <div id="status-bar" class="loading">正在加载资源...</div>
  <video id="input_video" playsinline></video>

  <div id="permission-modal">
    <div class="modal-content">
      <h3>手势模型交互 Demo</h3>
      <p>本应用需要使用您的摄像头进行手势识别。</p>
      <p>请保持张开手来重构模型，慢慢握拳来捏碎模型！</p>
      <button id="permission-allow">允许访问并开始</button>
    </div>
  </div>
</div>

<script>
(() => {
  if (typeof window === 'undefined' || !window.THREE || !window.Hands || !window.Camera) return;

  // --- 配置 ---
  const DISPERSE_RANGE = 40;
  const LERP_SPEED = 0.1;

  let cameraEnabled = false;
  let handFactor = 1.0; // 1.0 (全开) → 0.0 (握拳)

  let scene, camera, renderer, particles;
  let targetPositions;
  let randomPositions;

  const container = document.getElementById('gesture-crush-container');
  const statusBar = document.getElementById('status-bar');
  const modal = document.getElementById('permission-modal');
  const allowBtn = document.getElementById('permission-allow');

  allowBtn.addEventListener('click', () => handlePermission(true));

  // --- 初始化 Three.js ---
  function initThree() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 1, 100);

    const { clientWidth, clientHeight } = container;
    camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 25;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    createParticleModel();
    window.addEventListener('resize', onWindowResize, false);
  }

  // --- 创建粒子模型 ---
  function createParticleModel() {
    const modelGeometry = new THREE.TorusKnotGeometry(4, 1.5, 200, 32);
    const positionAttribute = modelGeometry.getAttribute('position');
    const particleCount = positionAttribute.count;

    const particleGeometry = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(particleCount * 3);

    targetPositions = new Float32Array(particleCount * 3);
    randomPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      targetPositions[i3] = positionAttribute.getX(i) * 1.5;
      targetPositions[i3 + 1] = positionAttribute.getY(i) * 1.5;
      targetPositions[i3 + 2] = positionAttribute.getZ(i) * 1.5;

      randomPositions[i3] = (Math.random() - 0.5) * DISPERSE_RANGE;
      randomPositions[i3 + 1] = (Math.random() - 0.5) * DISPERSE_RANGE;
      randomPositions[i3 + 2] = (Math.random() - 0.5) * DISPERSE_RANGE;

      currentPositions[i3] = targetPositions[i3];
      currentPositions[i3 + 1] = targetPositions[i3 + 1];
      currentPositions[i3 + 2] = targetPositions[i3 + 2];
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.15,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    particles = new THREE.Points(particleGeometry, material);
    scene.add(particles);
  }

  // --- 动画循环 ---
  function animate() {
    requestAnimationFrame(animate);
    const positions = particles.geometry.attributes.position.array;
    const particleCount = targetPositions.length / 3;
    const dissolveFactor = 1.0 - handFactor;
    const lerpAmount = LERP_SPEED * 0.5;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const targetX = targetPositions[i3];
      const targetY = targetPositions[i3 + 1];
      const targetZ = targetPositions[i3 + 2];
      const randomX = randomPositions[i3];
      const randomY = randomPositions[i3 + 1];
      const randomZ = randomPositions[i3 + 2];

      const desiredX = targetX + (randomX - targetX) * dissolveFactor;
      const desiredY = targetY + (randomY - targetY) * dissolveFactor;
      const desiredZ = targetZ + (randomZ - targetZ) * dissolveFactor;

      positions[i3] += (desiredX - positions[i3]) * lerpAmount;
      positions[i3 + 1] += (desiredY - positions[i3 + 1]) * lerpAmount;
      positions[i3 + 2] += (desiredZ - positions[i3 + 2]) * lerpAmount;
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += 0.005;
    particles.rotation.x = Math.sin(particles.rotation.y) * 0.1;
    renderer.render(scene, camera);
  }

  // --- 手势结果处理 ---
  function onResults(results) {
    if (!cameraEnabled) return;

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      const wrist = landmarks[0];
      const tips = [4, 8, 12, 16, 20];
      let avgDist = 0;

      tips.forEach((idx) => {
        const tip = landmarks[idx];
        const d = Math.sqrt((tip.x - wrist.x) ** 2 + (tip.y - wrist.y) ** 2);
        avgDist += d;
      });
      avgDist /= tips.length;

      const MIN_DIST = 0.15;
      const MAX_DIST = 0.45;
      handFactor = (avgDist - MIN_DIST) / (MAX_DIST - MIN_DIST);
      handFactor = Math.min(Math.max(handFactor, 0.0), 1.0);

      if (handFactor < 0.2) {
        statusBar.innerHTML = `手势因子: ${handFactor.toFixed(2)} | 用力捏碎中... 💥`;
        statusBar.className = 'hand-closed';
        particles.material.color.set(0xff0000);
      } else if (handFactor > 0.8) {
        statusBar.innerHTML = `手势因子: ${handFactor.toFixed(2)} | 重构模型... ✨`;
        statusBar.className = 'hand-open';
        particles.material.color.set(0x00ffff);
      } else {
        statusBar.innerHTML = `手势因子: ${handFactor.toFixed(2)} | 缓慢变化中...`;
        statusBar.className = '';
        particles.material.color.set(0xffffff);
      }
    } else {
      statusBar.innerHTML = '等待手势...';
      statusBar.className = 'loading';
      handFactor *= 0.95;
    }
  }

  // --- 权限与模型启动 ---
  function handlePermission(allow) {
    modal.style.display = 'none';
    if (allow) {
      cameraEnabled = true;
      startCameraAndHands();
    } else {
      alert('您需要允许摄像头权限才能使用手势交互。');
    }
  }

  function startCameraAndHands() {
    const videoElement = document.getElementById('input_video');
    statusBar.innerHTML = '正在初始化 AI 模型...';

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    const cameraUtils = new Camera(videoElement, {
      onFrame: async () => {
        if (cameraEnabled) {
          await hands.send({ image: videoElement });
        }
      },
      width: 640,
      height: 480,
    });

    cameraUtils
      .start()
      .then(() => {
        statusBar.innerHTML = 'AI 启动成功，请靠近摄像头并张开手掌...';
      })
      .catch((err) => {
        cameraEnabled = false;
        statusBar.innerHTML = `摄像头启动失败: ${err} (请检查 HTTPS/权限)`;
        statusBar.className = 'hand-closed';
      });
  }

  function onWindowResize() {
    const { clientWidth, clientHeight } = container;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }

  function bootstrap() {
    initThree();
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
</script>

<style>
.gesture-crush-app {
  position: relative;
  margin: 0;
  padding: 0;
  max-width: none;
  background: #050505;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.gesture-crush-canvas {
  width: 100%;
  height: min(70vh, 720px);
  min-height: 460px;
}

#input_video {
  display: none;
}

.demo-header {
  padding: 1.5rem;
  color: #e6f7ff;
  background: linear-gradient(135deg, rgba(0, 198, 255, 0.35), rgba(0, 114, 255, 0.35));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.demo-header h2 {
  margin: 0 0 0.5rem 0;
}

.demo-header p {
  margin: 0 0 0.75rem 0;
  color: #c8e7ff;
}

.demo-header ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #c8e7ff;
}

#status-bar {
  position: absolute;
  top: 16px;
  left: 16px;
  color: #fff;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.65);
  padding: 10px 14px;
  border-radius: 8px;
  z-index: 10;
  backdrop-filter: blur(8px);
}

.hand-open {
  color: #00ff88;
}

.hand-closed {
  color: #ff3300;
}

.loading {
  color: #ffaa00;
}

#permission-modal {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.82);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal-content {
  background: #2a2a38;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #fff;
}

.modal-content button {
  padding: 12px 22px;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  color: white;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
}

@media (max-width: 768px) {
  .gesture-crush-canvas {
    height: 60vh;
    min-height: 320px;
  }

  #status-bar {
    font-size: 12px;
    padding: 8px 10px;
  }
}
</style>
</ClientOnly>
