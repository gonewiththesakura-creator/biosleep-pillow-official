import * as THREE from 'three';
import './styles.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <canvas id="grain" aria-hidden="true"></canvas>
  <header class="nav">
    <a class="brand" href="#top" aria-label="BioSleep Atelier 首页">
      <span class="brand-mark"></span>
      <span>BioSleep Atelier</span>
    </a>
    <nav>
      <a href="#top">序幕</a>
      <a href="#story-material">材料</a>
      <a href="#story-order">预约</a>
    </nav>
  </header>

  <section id="top" class="scrolly" aria-label="生物基安睡枕完整滚动叙事">
    <div class="scrolly-stage">
      <div class="night-sky" aria-hidden="true"></div>
      <div class="room-light" aria-hidden="true"></div>
      <div class="bedroom" aria-hidden="true">
        <div class="window-frame"></div>
        <div class="wall-line"></div>
        <div class="side-table left"><span></span></div>
        <div class="side-table right"><span></span></div>
        <div class="bed-scene">
          <div class="headboard"></div>
          <div class="mattress"></div>
          <div class="duvet"></div>
          <div class="bed-shadow"></div>
        </div>
      </div>

      <div class="pillow-stage">
        <canvas id="pillow-canvas" aria-label="滚动驱动旋转、放大与归位的 3D 生物基安睡枕"></canvas>
        <div class="pillow-halo" aria-hidden="true"></div>
      </div>

      <div class="detail-loupe" aria-hidden="true">
        <span>SOFT EDGE DETAIL</span>
        <b>一圈安静的支撑边界</b>
      </div>

      <div id="story-material" class="story-panel material-panel" aria-hidden="true">
        <p class="eyebrow">MATERIAL, QUIETLY ENGINEERED</p>
        <h2>没有多余装饰。<br/>只有更好的夜晚。</h2>
        <div class="panel-grid">
          <article><span>01</span><b>生物基触面</b><p>柔和、干净，贴近皮肤但不黏腻。</p></article>
          <article><span>02</span><b>低压承托芯</b><p>让颈部和后脑自然落位。</p></article>
          <article><span>03</span><b>恒湿微气候</b><p>把热量和潮气慢慢带走。</p></article>
        </div>
      </div>

      <div class="story-panel spec-panel" aria-hidden="true">
        <p class="eyebrow">DESIGNED TO DISAPPEAR</p>
        <h2>看起来安静。<br/>睡下去，才感觉到它。</h2>
        <div class="spec-rail">
          <div><b>38%</b><span>bio-based surface yarn</span></div>
          <div><b>7°</b><span>neck relief geometry</span></div>
          <div><b>0.8s</b><span>slow rebound recovery</span></div>
        </div>
      </div>

      <div id="story-order" class="story-panel order-panel" aria-hidden="true">
        <p class="eyebrow">REST, REFINED</p>
        <h2>把夜晚留给睡眠。</h2>
        <p>一只枕头，一个更干净的卧室系统。克制、柔软、可持续。</p>
        <a class="button primary light" href="mailto:hello@example.com">预约首批体验</a>
      </div>

      <div class="curtain curtain-left" aria-hidden="true">
        <canvas class="curtain-canvas"></canvas>
        <div class="curtain-edge"></div>
      </div>
      <div class="curtain curtain-right" aria-hidden="true">
        <canvas class="curtain-canvas"></canvas>
        <div class="curtain-edge"></div>
      </div>
      <div class="curtain-rail" aria-hidden="true"></div>

      <div class="story-copy story-0 active" data-step="0">
        <p class="eyebrow">BIOSLEEP PILLOW</p>
        <h1><span>睡眠，</span><span>可以更安静。</span></h1>
        <p>一只生物基安睡枕。用柔和支撑、亲肤触面和克制设计，把卧室重新变成休息本身。</p>
      </div>
      <div class="story-copy story-1" data-step="1">
        <p class="eyebrow">A QUIET REVEAL</p>
        <h2>缓慢打开。<br/>像一盏灯被调暗。</h2>
        <p>窗帘只保留轻微回应。它不表演，只把注意力留给产品。</p>
      </div>
      <div class="story-copy story-2" data-step="2">
        <p class="eyebrow">SCULPTED FOR REST</p>
        <h2>柔和的体积。<br/>清楚的支撑。</h2>
        <p>弧面、边缘和慢回弹被放在同一束光里，像一件安静的日用品雕塑。</p>
      </div>
      <div class="story-copy story-3" data-step="3">
        <p class="eyebrow">DETAIL</p>
        <h2>靠近一点。<br/>触感变得可见。</h2>
        <p>细密织纹、轻微压线和柔和边缘，让支撑看起来也足够安静。</p>
      </div>
      <div class="story-copy story-4" data-step="4">
        <p class="eyebrow">ROOM SYSTEM</p>
        <h2>回到房间。<br/>也回到身体。</h2>
        <p>它不是一个孤立的物件，而是光线、温度、床品和身体之间的平衡点。</p>
      </div>
      <div class="story-copy story-5" data-step="5">
        <p class="eyebrow">LAYERS</p>
        <h2>少一点视觉噪音。<br/>多一点真实材料。</h2>
        <p>材料信息不打断体验，只在需要的时候出现。</p>
      </div>
      <div class="story-copy story-6" data-step="6">
        <p class="eyebrow">SPECIFICATION</p>
        <h2>只留下关键参数。</h2>
        <p>触感、承托、温度。其余噪音，都被拿掉。</p>
      </div>
      <div class="story-copy story-7" data-step="7">
        <p class="eyebrow">NIGHT MODE</p>
        <h2>最后，<br/>把夜晚合上。</h2>
        <p>页面结束在安静里，就像睡前把最后一束光关掉。</p>
      </div>

      <div class="progress-label">
        <span id="progress-index">01</span>
        <i></i>
        <span id="progress-text">SCROLL TO OPEN</span>
      </div>
    </div>
  </section>
`;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function initPillow() {
  const canvas = document.querySelector('#pillow-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.55, 6.2);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.BoxGeometry(4.1, 0.78, 2.22, 72, 22, 42);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const edge = Math.max(Math.abs(x) / 2.05, Math.abs(z) / 1.11);
    const crown = Math.exp(-(x * x * 0.22 + z * z * 0.62));
    const woven = Math.sin((x + 2.1) * 14.0) * 0.01 + Math.sin((z + 1.3) * 18.0) * 0.007;
    pos.setY(i, y * (0.76 + crown * 0.42) - Math.pow(edge, 3.2) * 0.16 + woven);
    pos.setX(i, x * (1 - Math.pow(Math.abs(z) / 1.5, 4) * 0.04));
  }
  geometry.computeVertexNormals();

  const weaveCanvas = document.createElement('canvas');
  weaveCanvas.width = 256;
  weaveCanvas.height = 256;
  const weaveCtx = weaveCanvas.getContext('2d');
  weaveCtx.fillStyle = '#f7f7f9';
  weaveCtx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 5) {
    weaveCtx.strokeStyle = i % 10 === 0 ? 'rgba(174,174,184,.18)' : 'rgba(255,255,255,.26)';
    weaveCtx.beginPath();
    weaveCtx.moveTo(i, 0);
    weaveCtx.lineTo(i + Math.sin(i) * 2, 256);
    weaveCtx.stroke();
    weaveCtx.beginPath();
    weaveCtx.moveTo(0, i);
    weaveCtx.lineTo(256, i + Math.cos(i) * 2);
    weaveCtx.stroke();
  }
  const weaveTexture = new THREE.CanvasTexture(weaveCanvas);
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(4, 2);

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf8f8fb,
    map: weaveTexture,
    bumpMap: weaveTexture,
    bumpScale: 0.035,
    roughness: 0.72,
    metalness: 0.02,
    clearcoat: 0.18,
    clearcoatRoughness: 0.82,
    sheen: 1.0,
    sheenColor: new THREE.Color(0xffffff)
  });
  const pillow = new THREE.Mesh(geometry, material);
  pillow.rotation.x = -0.08;
  group.add(pillow);

  const seamMat = new THREE.LineBasicMaterial({ color: 0xd6d6de, transparent: true, opacity: 0.34 });
  for (const z of [-1.13, 1.13]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.95, 0.17, z),
      new THREE.Vector3(-0.6, 0.27, z),
      new THREE.Vector3(0.7, 0.27, z),
      new THREE.Vector3(1.95, 0.15, z)
    ]);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(90)), seamMat);
    group.add(line);
  }

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(2.5, 96),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.16 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.72;
  shadow.scale.z = 0.36;
  group.add(shadow);

  scene.add(new THREE.AmbientLight(0xffffff, 1.65));
  const key = new THREE.DirectionalLight(0xffffff, 2.35);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd8e5ff, 1.25);
  rim.position.set(4, 1.8, -4);
  scene.add(rim);

  const pointer = { x: 0, y: 0 };
  const scrollState = { p: 0, pillow: 0, corner: 0, returnPhase: 0, final: 0 };
  window.__setPillowScroll = (state) => {
    if (typeof state === 'number') scrollState.pillow = state;
    else Object.assign(scrollState, state);
  };

  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  function animate(t) {
    const time = t * 0.001;
    const p = scrollState.pillow;
    const master = scrollState.p || 0;
    const corner = scrollState.corner || 0;
    const returnPhase = scrollState.returnPhase || 0;
    const final = scrollState.final || 0;
    const scrollRot = p * Math.PI * 2.6 + corner * Math.PI * 0.85 - returnPhase * Math.PI * 0.5 - 0.28;
    group.rotation.y += (scrollRot + pointer.x * 0.08 - group.rotation.y) * 0.045;
    group.rotation.x += ((-0.10 + Math.sin(master * Math.PI) * 0.38 + corner * 0.58 - returnPhase * 0.36 - pointer.y * 0.035) - group.rotation.x) * 0.045;
    group.rotation.z += (((p - 0.5) * 0.08 - corner * 0.22 + returnPhase * 0.18) - group.rotation.z) * 0.04;
    pillow.position.y = Math.sin(time * 0.9) * 0.028 + corner * 0.10 - final * 0.05;
    pillow.position.x += ((corner * -0.32 + returnPhase * 0.16) - pillow.position.x) * 0.035;
    pillow.scale.setScalar(1 + corner * 0.18 - returnPhase * 0.08);
    material.roughness = 0.64 + Math.sin(time * 0.7 + master * 2) * 0.035 + corner * 0.05;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function initGrain() {
  const canvas = document.querySelector('#grain');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, particles = [];
  function resize() {
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = window.innerHeight * devicePixelRatio;
    particles = Array.from({ length: Math.min(170, Math.floor(window.innerWidth / 7)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      a: Math.random() * Math.PI * 2,
      s: 0.35 + Math.random() * 1.2,
      l: 40 + Math.random() * 140
    }));
  }
  window.addEventListener('resize', resize);
  resize();
  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = '#d8d0c2';
    ctx.lineWidth = devicePixelRatio * 0.65;
    particles.forEach(p => {
      p.a += 0.004 * p.s;
      p.x += Math.cos(p.a) * 0.16 * devicePixelRatio;
      p.y += Math.sin(p.a * 0.7) * 0.10 * devicePixelRatio;
      if (p.x < -p.l) p.x = w + p.l;
      if (p.x > w + p.l) p.x = -p.l;
      const wave = Math.sin(t * 0.0005 + p.x * 0.002) * 12 * devicePixelRatio;
      ctx.beginPath();
      ctx.moveTo(p.x - p.l / 2, p.y + wave);
      ctx.bezierCurveTo(p.x - p.l / 5, p.y - 8 * devicePixelRatio, p.x + p.l / 5, p.y + 8 * devicePixelRatio, p.x + p.l / 2, p.y - wave);
      ctx.stroke();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

function initCurtainPhysics() {
  const stage = document.querySelector('.scrolly-stage');
  const curtains = [...document.querySelectorAll('.curtain')].map((el) => {
    const canvas = el.querySelector('.curtain-canvas');
    const side = el.classList.contains('curtain-left') ? -1 : 1;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 20);
    camera.position.z = 6;

    const cols = 54;
    const rows = 68;
    const geometry = new THREE.PlaneGeometry(2, 2, cols, rows);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#171113'),
      roughness: 0.55,
      metalness: 0.0,
      reflectivity: 0.38,
      sheen: 0.72,
      sheenColor: new THREE.Color('#d2d2d7'),
      sheenRoughness: 0.48,
      clearcoat: 0.10,
      clearcoatRoughness: 0.58,
      side: THREE.DoubleSide,
      vertexColors: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambient = new THREE.AmbientLight(0x171719, 1.45);
    const key = new THREE.DirectionalLight(0xffffff, 2.25);
    key.position.set(side * -1.8, 1.2, 4.8);
    const rim = new THREE.DirectionalLight(0x9fb7d8, 0.82);
    rim.position.set(side * 2.5, -0.2, 3.5);
    scene.add(ambient, key, rim);

    return {
      el, canvas, renderer, scene, camera, geometry, material, mesh, side,
      cols, rows, w: 0, h: 0, clothW: 2, clothH: 2,
      points: [], grabbed: null, collisionEnergy: 0,
      color: new THREE.Color(), temp: new THREE.Vector3()
    };
  });

  const state = {
    target: 0,
    open: 0,
    velocity: 0,
    shock: 0,
    lastTarget: 0,
    pointerX: window.innerWidth * 0.5,
    pointerY: window.innerHeight * 0.5,
    prevPointerX: window.innerWidth * 0.5,
    prevPointerY: window.innerHeight * 0.5,
    pointerVX: 0,
    pointerVY: 0,
    pointerActive: false,
    dragging: false,
    pull: 0
  };

  window.__setCurtainOpen = (open) => {
    const next = clamp(open);
    state.shock += Math.min(0.025, Math.abs(next - state.lastTarget) * 0.045);
    state.target = next;
    state.lastTarget = next;
  };

  function makePoint(x, y, z, pinned = false) {
    return { x, y, z, ox: x, oy: y, oz: z, bx: x, by: y, bz: z, pinned };
  }

  function point(curtain, x, y) {
    return curtain.points[y * (curtain.cols + 1) + x];
  }

  function buildMesh(curtain) {
    curtain.points = [];
    const { cols, rows, clothW, clothH, side } = curtain;
    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const u = x / cols;
        const v = y / rows;
        const fold = Math.sin(u * Math.PI * 8.2) * 0.055 * (1 - v * 0.30);
        const sag = Math.sin(u * Math.PI) * v * v * 0.055;
        const px = (u - 0.5) * clothW + fold * side;
        const py = (0.5 - v) * clothH - sag;
        const pz = Math.cos(u * Math.PI * 8.2) * 0.055 * (1 - v * 0.24);
        curtain.points.push(makePoint(px, py, pz, y === 0));
      }
    }
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    curtains.forEach((curtain) => {
      const rect = curtain.el.getBoundingClientRect();
      curtain.w = Math.max(1, Math.round(rect.width));
      curtain.h = Math.max(1, Math.round(rect.height));
      curtain.clothW = 2.35;
      curtain.clothH = 2.35 * (curtain.h / curtain.w);
      curtain.renderer.setPixelRatio(dpr);
      curtain.renderer.setSize(curtain.w, curtain.h, false);
      curtain.camera.left = -curtain.clothW / 2;
      curtain.camera.right = curtain.clothW / 2;
      curtain.camera.top = curtain.clothH / 2;
      curtain.camera.bottom = -curtain.clothH / 2;
      curtain.camera.updateProjectionMatrix();
      curtain.mesh.scale.set(curtain.clothW / 2, curtain.clothH / 2, 1);
      buildMesh(curtain);
    });
  }

  function updatePointer(event) {
    state.prevPointerX = state.pointerX;
    state.prevPointerY = state.pointerY;
    state.pointerX = event.clientX;
    state.pointerY = event.clientY;
    state.pointerVX = state.pointerX - state.prevPointerX;
    state.pointerVY = state.pointerY - state.prevPointerY;
    state.pointerActive = true;
    state.shock += Math.min(0.008, Math.hypot(state.pointerVX, state.pointerVY) * 0.00012);
  }

  function pointerToCloth(curtain) {
    const rect = curtain.canvas.getBoundingClientRect();
    const u = (state.pointerX - rect.left) / rect.width;
    const v = (state.pointerY - rect.top) / rect.height;
    return {
      inside: state.pointerActive && u > -0.08 && u < 1.08 && v > -0.08 && v < 1.08,
      x: (u - 0.5) * curtain.clothW,
      y: (0.5 - v) * curtain.clothH,
      u, v
    };
  }

  window.addEventListener('pointermove', updatePointer, { passive: true });
  stage.addEventListener('pointerleave', () => {
    if (!state.dragging) state.pointerActive = false;
  });
  stage.addEventListener('pointerdown', (event) => {
    updatePointer(event);
    state.dragging = true;
    stage.classList.add('is-pulling');
    let best = null;
    let bestDistance = Infinity;
    curtains.forEach((curtain) => {
      const local = pointerToCloth(curtain);
      curtain.grabbed = null;
      curtain.points.forEach((p) => {
        if (p.pinned) return;
        const d = Math.hypot(p.x - local.x, p.y - local.y) + Math.abs(p.z) * 0.24;
        if (d < bestDistance) {
          bestDistance = d;
          best = { curtain, point: p, local };
        }
      });
    });
    if (best && bestDistance < 0.16) {
      best.curtain.grabbed = best.point;
      state.pull = 0.22;
      state.shock += 0.018;
    }
    try { stage.setPointerCapture?.(event.pointerId); } catch (_) {}
  });
  stage.addEventListener('pointerup', (event) => {
    state.dragging = false;
    state.shock += 0.012;
    state.pull = 0;
    curtains.forEach((curtain) => { curtain.grabbed = null; });
    stage.classList.remove('is-pulling');
    try { stage.releasePointerCapture?.(event.pointerId); } catch (_) {}
  });
  stage.addEventListener('pointercancel', () => {
    state.dragging = false;
    state.pull = 0;
    curtains.forEach((curtain) => { curtain.grabbed = null; });
    stage.classList.remove('is-pulling');
  });

  function satisfy(a, b, rest, stiffness = 0.48) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const d = Math.hypot(dx, dy, dz) || 0.0001;
    const diff = (d - rest) / d * stiffness;
    const ox = dx * diff * 0.5;
    const oy = dy * diff * 0.5;
    const oz = dz * diff * 0.5;
    if (!a.pinned) { a.x += ox; a.y += oy; a.z += oz; }
    if (!b.pinned) { b.x -= ox; b.y -= oy; b.z -= oz; }
  }

  function simulateCurtain(curtain, time) {
    const { cols, rows, clothW, clothH, side } = curtain;
    const local = pointerToCloth(curtain);
    const speed = Math.min(26, Math.hypot(state.pointerVX, state.pointerVY));
    const collisionRadius = state.dragging ? 0.10 : 0.040;
    const xRest = clothW / cols;
    const yRest = clothH / rows;
    const wind = Math.sin(time * 0.42 + side) * 0.0018 + Math.sin(time * 0.86) * 0.0010 + state.velocity * 0.045 + state.shock * 0.010;
    curtain.collisionEnergy *= 0.82;

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const p = point(curtain, x, y);
        const u = x / cols;
        const v = y / rows;
        const foldPhase = u * Math.PI * (8.2 + state.open * 0.55) + time * 0.055 * side;
        const foldAmp = 0.060 * (1 - v * 0.25);
        const gathered = side * state.open * clothW * (0.055 + 0.04 * Math.sin(u * Math.PI)) * (1 - v * 0.18);
        p.bx = (u - 0.5) * clothW + Math.sin(foldPhase) * foldAmp * side + gathered;
        p.by = (0.5 - v) * clothH - Math.sin(u * Math.PI) * v * v * (0.070 + state.shock * 0.010);
        p.bz = Math.cos(foldPhase) * (0.075 + state.open * 0.010) * (1 - v * 0.15);

        if (p.pinned) {
          p.x += (p.bx - p.x) * 0.30;
          p.y += (p.by - p.y) * 0.30;
          p.z += (p.bz - p.z) * 0.30;
          p.ox = p.x; p.oy = p.y; p.oz = p.z;
          continue;
        }

        const vx = (p.x - p.ox) * 0.825;
        const vy = (p.y - p.oy) * 0.815;
        const vz = (p.z - p.oz) * 0.800;
        p.ox = p.x; p.oy = p.y; p.oz = p.z;
        p.x += vx + (p.bx - p.x) * (0.010 + v * 0.002) + side * wind * v;
        p.y += vy + (p.by - p.y) * (0.008 + v * 0.002) - 0.0018;
        p.z += vz + (p.bz - p.z) * 0.014 + wind * (0.55 + v * 0.22);

        if (local.inside) {
          const dx = p.x - local.x;
          const dy = p.y - local.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d < collisionRadius) {
            const hit = (collisionRadius - d) / collisionRadius;
            const nx = dx / d;
            const ny = dy / d;
            p.x += nx * hit * (0.0018 + speed * 0.000025);
            p.y += ny * hit * (0.0014 + speed * 0.000020);
            p.z += hit * (0.0045 + speed * 0.000055);
            curtain.collisionEnergy = Math.max(curtain.collisionEnergy, hit * 0.15);
          }
        }
      }
    }

    if (curtain.grabbed && state.dragging) {
      const p = curtain.grabbed;
      p.x += (local.x - p.x) * 0.070;
      p.y += (local.y - p.y) * 0.060;
      p.z += (0.045 - p.z) * 0.055;
      p.ox = p.x - (state.pointerVX / Math.max(1, curtain.w)) * curtain.clothW * 0.018;
      p.oy = p.y + (state.pointerVY / Math.max(1, curtain.h)) * curtain.clothH * 0.014;
      curtain.collisionEnergy = Math.max(curtain.collisionEnergy, 0.12);
    }

    for (let iteration = 0; iteration < 7; iteration++) {
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          if (x < cols) satisfy(point(curtain, x, y), point(curtain, x + 1, y), xRest, 0.66);
          if (y < rows) satisfy(point(curtain, x, y), point(curtain, x, y + 1), yRest, 0.64);
          if (x < cols && y < rows) satisfy(point(curtain, x, y), point(curtain, x + 1, y + 1), Math.hypot(xRest, yRest), 0.08);
        }
      }
    }
  }

  function renderCurtain(curtain, time) {
    const { geometry, cols, rows, clothW, clothH, side } = curtain;
    const position = geometry.attributes.position;
    const color = geometry.attributes.color || new THREE.BufferAttribute(new Float32Array(position.count * 3), 3);
    if (!geometry.attributes.color) geometry.setAttribute('color', color);

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const i = y * (cols + 1) + x;
        const p = point(curtain, x, y);
        const u = x / cols;
        const v = y / rows;
        position.setXYZ(i, p.x / (clothW / 2), p.y / (clothH / 2), p.z);

        const fold = Math.sin(u * Math.PI * 10.5 + p.z * 10 + time * 0.22 * side);
        const satinBand = Math.pow(Math.max(0, Math.sin(u * Math.PI * 3.4 + p.z * 8 + 0.6)), 2.4);
        const verticalGlow = Math.pow(Math.max(0, Math.cos((u - 0.45 * side) * Math.PI * 2.2 + time * 0.10)), 5.0);
        const tension = Math.min(1, Math.abs(p.z - p.bz) * 4.5 + curtain.collisionEnergy * 0.12);
        const shade = 0.24 + fold * 0.035 + satinBand * 0.11 + verticalGlow * 0.08 + tension * 0.04 - v * 0.075;
        curtain.color.setRGB(0.035 + shade * 0.19, 0.032 + shade * 0.17, 0.036 + shade * 0.18);
        color.setXYZ(i, curtain.color.r, curtain.color.g, curtain.color.b);
      }
    }
    position.needsUpdate = true;
    color.needsUpdate = true;
    geometry.computeVertexNormals();
    curtain.material.roughness = 0.54 + Math.sin(time * 0.35) * 0.010 - curtain.collisionEnergy * 0.015;
    curtain.material.sheenRoughness = 0.48 + curtain.collisionEnergy * 0.03;
    curtain.renderer.render(curtain.scene, curtain.camera);
  }

  function animate(ms) {
    const time = ms * 0.001;
    const force = (state.target - state.open) * 0.055;
    state.velocity = (state.velocity + force) * 0.82;
    state.open = clamp(state.open + state.velocity);
    state.shock *= 0.92;
    state.pointerVX *= 0.82;
    state.pointerVY *= 0.82;
    state.pull *= 0.90;

    const energy = Math.max(...curtains.map((curtain) => curtain.collisionEnergy), state.shock);
    const idleDrift = Math.sin(time * 0.72) * 0.006 + Math.sin(time * 1.41) * 0.003;
    const physicalOpen = clamp(state.open + idleDrift * (1 - state.open) + state.shock * 0.035);
    stage.style.setProperty('--curtain-open', physicalOpen.toFixed(4));
    stage.style.setProperty('--curtain-sway', (idleDrift * 8 + state.velocity * 55 + energy * 3.5).toFixed(3));
    stage.style.setProperty('--curtain-pull', Math.max(state.pull, energy).toFixed(4));

    curtains.forEach((curtain) => {
      simulateCurtain(curtain, time);
      renderCurtain(curtain, time);
    });
    window.__curtainPhysicsDebug = {
      mode: 'three-cloth',
      open: physicalOpen,
      energy,
      leftEnergy: curtains[0]?.collisionEnergy || 0,
      rightEnergy: curtains[1]?.collisionEnergy || 0,
      grabbed: curtains.some((curtain) => !!curtain.grabbed),
      points: curtains.reduce((sum, curtain) => sum + curtain.points.length, 0)
    };
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(animate);
}

function initScrollytelling() {
  const scrolly = document.querySelector('.scrolly');
  const stage = document.querySelector('.scrolly-stage');
  const copies = [...document.querySelectorAll('.story-copy')];
  const index = document.querySelector('#progress-index');
  const progressText = document.querySelector('#progress-text');
  const labels = ['SCROLL TO OPEN', 'CURTAIN PHYSICS', 'PILLOW ROTATES', 'EDGE CLOSE-UP', 'RETURN TO ROOM', 'MATERIAL LAYERS', 'QUIET SPECS', 'CURTAIN CLOSED'];

  function update() {
    const rect = scrolly.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    const p = clamp(-rect.top / travel);
    const openIn = smooth((p - 0.03) / 0.16);
    const closeOut = smooth((p - 0.86) / 0.13);
    const open = clamp(openIn * (1 - closeOut));
    const room = clamp(smooth((p - 0.12) / 0.18) * (1 - closeOut * 0.45));
    const pillow = clamp(smooth((p - 0.18) / 0.18) * (1 - closeOut * 0.15));
    const corner = smooth((p - 0.38) / 0.12) * (1 - smooth((p - 0.54) / 0.10));
    const returnPhase = smooth((p - 0.54) / 0.12) * (1 - smooth((p - 0.70) / 0.10));
    const materialPhase = smooth((p - 0.61) / 0.08) * (1 - smooth((p - 0.74) / 0.08));
    const specPhase = smooth((p - 0.72) / 0.08) * (1 - smooth((p - 0.84) / 0.07));
    const orderPhase = smooth((p - 0.84) / 0.08);
    const glow = clamp(smooth((p - 0.15) / 0.28) * (1 - closeOut * 0.55));

    stage.style.setProperty('--open', open.toFixed(4));
    stage.style.setProperty('--room', room.toFixed(4));
    stage.style.setProperty('--pillow', pillow.toFixed(4));
    stage.style.setProperty('--corner', corner.toFixed(4));
    stage.style.setProperty('--return', returnPhase.toFixed(4));
    stage.style.setProperty('--material-phase', materialPhase.toFixed(4));
    stage.style.setProperty('--spec-phase', specPhase.toFixed(4));
    stage.style.setProperty('--order-phase', orderPhase.toFixed(4));
    stage.style.setProperty('--final', closeOut.toFixed(4));
    stage.style.setProperty('--glow', glow.toFixed(4));
    window.__setPillowScroll?.({ p, pillow, corner, returnPhase, final: closeOut });
    window.__setCurtainOpen?.(open);

    const step = Math.min(7, Math.floor(clamp(p * 8.15, 0, 7.999)));
    copies.forEach((el, i) => el.classList.toggle('active', i === step));
    index.textContent = `${String(step + 1).padStart(2, '0')}`;
    progressText.textContent = labels[step];
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.16 });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

initPillow();
initGrain();
initCurtainPhysics();
initScrollytelling();
initReveal();
