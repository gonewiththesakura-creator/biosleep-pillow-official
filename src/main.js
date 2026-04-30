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
        <span>MAGNIFIED EDGE</span>
        <b>织纹 / 压线 / 回弹边缘</b>
      </div>

      <div id="story-material" class="story-panel material-panel" aria-hidden="true">
        <p class="eyebrow">MATERIAL QUIETLY WORKS</p>
        <h2>看起来克制，<br/>里面每一层都在工作。</h2>
        <div class="panel-grid">
          <article><span>A</span><b>生物基亲肤层</b><p>可再生纤维触面，减少塑料感与闷热感。</p></article>
          <article><span>B</span><b>低压承托芯</b><p>颈部、后脑与肩线受力被重新分配。</p></article>
          <article><span>C</span><b>恒湿微气候</b><p>细微气流路径，温柔带走热量与湿气。</p></article>
        </div>
      </div>

      <div class="story-panel spec-panel" aria-hidden="true">
        <p class="eyebrow">OBJECT, NOT ORNAMENT</p>
        <h2>它看起来很安静。<br/>只有躺下时，才开始表达。</h2>
        <div class="spec-rail">
          <div><b>38%</b><span>Bio-based surface yarn</span></div>
          <div><b>7°</b><span>Neck angle relief zone</span></div>
          <div><b>0.8s</b><span>Slow rebound recovery</span></div>
        </div>
      </div>

      <div id="story-order" class="story-panel order-panel" aria-hidden="true">
        <p class="eyebrow">REST, REFINED</p>
        <h2>最后，把夜晚重新合上。</h2>
        <p>窗帘归位，页面结束在安静里。下一版可接入真实产品摄影、购买链路和 glTF 高精模型。</p>
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
        <p class="eyebrow">BIO-BASED SLEEP SYSTEM</p>
        <h1><span>先拉开夜色，</span><span>再进入睡眠。</span></h1>
        <p>滚动开启整段体验。窗帘本身是一张实时布料网格：鼠标靠近会发生局部碰撞，按住拖拽会抓住布面节点并拉扯回弹。</p>
      </div>
      <div class="story-copy story-1" data-step="1">
        <p class="eyebrow">CURTAIN / PHYSICS</p>
        <h2>布料被拉开，<br/>但不是机械移动。</h2>
        <p>滚动只是开合意图；布面由固定顶点、弹簧约束、重力、碰撞半径和拖拽抓点共同计算。</p>
      </div>
      <div class="story-copy story-2" data-step="2">
        <p class="eyebrow">OBJECT IN MOTION</p>
        <h2>枕头旋转，<br/>展示真实的体积与边缘。</h2>
        <p>从正面、侧面到俯视，看到柔和冠面、边缘压线与慢回弹的雕塑感。</p>
      </div>
      <div class="story-copy story-3" data-step="3">
        <p class="eyebrow">CLOSE-UP</p>
        <h2>放大一角，<br/>把触感推到画面三分之一。</h2>
        <p>镜头不是切页，而是把枕头一角推到左侧 1/3，观看织纹、压线和边缘回弹。</p>
      </div>
      <div class="story-copy story-4" data-step="4">
        <p class="eyebrow">RETURN</p>
        <h2>再归位，<br/>产品回到卧室系统。</h2>
        <p>它不是孤立的物件，而是夜晚里光、床品、温度和身体放松的交汇点。</p>
      </div>
      <div class="story-copy story-5" data-step="5">
        <p class="eyebrow">LAYERS</p>
        <h2>材料出现，<br/>但仍然保持克制。</h2>
        <p>所有信息都在同一个滚动叙事里出现，不再跳到普通网页区块。</p>
      </div>
      <div class="story-copy story-6" data-step="6">
        <p class="eyebrow">SPECIFICATION</p>
        <h2>少量参数，<br/>只保留真正影响睡眠的部分。</h2>
        <p>触感、承托、温度。其余噪音，都被拿掉。</p>
      </div>
      <div class="story-copy story-7" data-step="7">
        <p class="eyebrow">CURTAIN CLOSES</p>
        <h2>最后一屏，<br/>窗帘重新拉上。</h2>
        <p>结束不是突然停止，而是像睡前一样，把房间慢慢安静下来。</p>
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
  weaveCtx.fillStyle = '#f3eee4';
  weaveCtx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 5) {
    weaveCtx.strokeStyle = i % 10 === 0 ? 'rgba(178,164,140,.20)' : 'rgba(255,255,255,.22)';
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
    color: 0xfffbf1,
    map: weaveTexture,
    bumpMap: weaveTexture,
    bumpScale: 0.035,
    roughness: 0.66,
    metalness: 0.02,
    clearcoat: 0.18,
    clearcoatRoughness: 0.82,
    sheen: 1.0,
    sheenColor: new THREE.Color(0xffffff)
  });
  const pillow = new THREE.Mesh(geometry, material);
  pillow.rotation.x = -0.08;
  group.add(pillow);

  const seamMat = new THREE.LineBasicMaterial({ color: 0xd8d1c4, transparent: true, opacity: 0.42 });
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
  const curtains = [...document.querySelectorAll('.curtain')].map((el) => ({
    el,
    canvas: el.querySelector('.curtain-canvas'),
    ctx: el.querySelector('.curtain-canvas').getContext('2d'),
    side: el.classList.contains('curtain-left') ? -1 : 1,
    w: 0,
    h: 0,
    cols: 30,
    rows: 38,
    points: [],
    grabbed: null,
    collisionEnergy: 0
  }));

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
    state.shock += Math.min(0.12, Math.abs(next - state.lastTarget) * 0.24);
    state.target = next;
    state.lastTarget = next;
  };

  function makePoint(x, y, pinned = false) {
    return { x, y, ox: x, oy: y, bx: x, by: y, pinned, shade: 0 };
  }

  function buildMesh(curtain) {
    curtain.points = [];
    const { cols, rows, w, h, side } = curtain;
    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const u = x / cols;
        const v = y / rows;
        const fold = Math.sin(u * Math.PI * 7.5) * (18 + 10 * (1 - v));
        const sag = Math.sin(u * Math.PI) * v * v * 22;
        curtain.points.push(makePoint(u * w + fold * side, v * h + sag, y === 0));
      }
    }
  }

  function point(curtain, x, y) {
    return curtain.points[y * (curtain.cols + 1) + x];
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    curtains.forEach((curtain) => {
      const rect = curtain.el.getBoundingClientRect();
      curtain.w = Math.max(1, Math.round(rect.width));
      curtain.h = Math.max(1, Math.round(rect.height));
      curtain.canvas.width = Math.round(curtain.w * dpr);
      curtain.canvas.height = Math.round(curtain.h * dpr);
      curtain.canvas.style.width = `${curtain.w}px`;
      curtain.canvas.style.height = `${curtain.h}px`;
      curtain.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
    state.shock += Math.min(0.08, Math.hypot(state.pointerVX, state.pointerVY) * 0.0015);
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
      const rect = curtain.canvas.getBoundingClientRect();
      const lx = event.clientX - rect.left;
      const ly = event.clientY - rect.top;
      curtain.grabbed = null;
      curtain.points.forEach((p) => {
        if (p.pinned) return;
        const d = Math.hypot(p.x - lx, p.y - ly);
        if (d < bestDistance) {
          bestDistance = d;
          best = { curtain, point: p, lx, ly };
        }
      });
    });
    if (best && bestDistance < 180) {
      best.curtain.grabbed = best.point;
      state.pull = 1;
      state.shock += 0.22;
    }
    try { stage.setPointerCapture?.(event.pointerId); } catch (_) {}
  });
  stage.addEventListener('pointerup', (event) => {
    state.dragging = false;
    state.shock += 0.18;
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

  function satisfy(a, b, rest, stiffness = 0.62) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || 0.0001;
    const diff = (d - rest) / d * stiffness;
    const ox = dx * diff * 0.5;
    const oy = dy * diff * 0.5;
    if (!a.pinned) { a.x += ox; a.y += oy; }
    if (!b.pinned) { b.x -= ox; b.y -= oy; }
  }

  function simulateCurtain(curtain, time) {
    const { cols, rows, w, h, side } = curtain;
    const rect = curtain.canvas.getBoundingClientRect();
    const px = state.pointerX - rect.left;
    const py = state.pointerY - rect.top;
    const pointerInside = state.pointerActive && px > -120 && px < w + 120 && py > -120 && py < h + 120;
    const speed = Math.hypot(state.pointerVX, state.pointerVY);
    const collisionRadius = state.dragging ? 150 : 105;
    const wind = Math.sin(time * 0.9 + side) * 0.16 + Math.sin(time * 1.7) * 0.07 + state.velocity * 8 + state.shock * 3.2;
    const xRest = w / cols;
    const yRest = h / rows;
    curtain.collisionEnergy *= 0.92;

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const p = point(curtain, x, y);
        const u = x / cols;
        const v = y / rows;
        const fold = Math.sin(u * Math.PI * (7.5 + state.open * 2.3) + time * 0.42 * side) * (18 + 12 * (1 - v));
        const gathered = side * state.open * w * (0.10 + 0.08 * Math.sin(u * Math.PI)) * (1 - v * 0.26);
        p.bx = u * w + fold * side + gathered;
        p.by = v * h + Math.sin(u * Math.PI) * v * v * (20 + state.shock * 40);

        if (p.pinned) {
          p.x += (p.bx - p.x) * 0.36;
          p.y += (p.by - p.y) * 0.36;
          p.ox = p.x;
          p.oy = p.y;
          continue;
        }

        const vx = (p.x - p.ox) * 0.968;
        const vy = (p.y - p.oy) * 0.968;
        p.ox = p.x;
        p.oy = p.y;
        p.x += vx + (p.bx - p.x) * (0.010 + v * 0.006) + side * wind * v * (0.8 + Math.sin(u * Math.PI) * 0.8);
        p.y += vy + 0.34 + Math.sin(time * 1.3 + u * 5) * 0.05;

        if (pointerInside) {
          const dx = p.x - px;
          const dy = p.y - py;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d < collisionRadius) {
            const hit = (collisionRadius - d) / collisionRadius;
            const nx = dx / d;
            const ny = dy / d;
            p.x += nx * hit * (34 + speed * 0.42);
            p.y += ny * hit * (28 + speed * 0.30);
            p.x += state.pointerVX * hit * 0.35;
            p.y += state.pointerVY * hit * 0.28;
            curtain.collisionEnergy = Math.max(curtain.collisionEnergy, hit);
          }
        }
      }
    }

    if (curtain.grabbed && state.dragging) {
      curtain.grabbed.x += (px - curtain.grabbed.x) * 0.72;
      curtain.grabbed.y += (py - curtain.grabbed.y) * 0.72;
      curtain.grabbed.ox = curtain.grabbed.x - state.pointerVX * 0.34;
      curtain.grabbed.oy = curtain.grabbed.y - state.pointerVY * 0.34;
      curtain.collisionEnergy = 1;
    }

    for (let iteration = 0; iteration < 4; iteration++) {
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          if (x < cols) satisfy(point(curtain, x, y), point(curtain, x + 1, y), xRest, 0.72);
          if (y < rows) satisfy(point(curtain, x, y), point(curtain, x, y + 1), yRest, 0.66);
          if (x < cols && y < rows) satisfy(point(curtain, x, y), point(curtain, x + 1, y + 1), Math.hypot(xRest, yRest), 0.12);
        }
      }
    }

    curtain.points.forEach((p) => {
      p.x = clamp(p.x, -w * 0.22, w * 1.22);
      p.y = clamp(p.y, -20, h + 70);
    });
  }

  function drawCurtain(curtain, time) {
    const { ctx, cols, rows, w, h, side } = curtain;
    ctx.clearRect(0, 0, w, h);
    const base = ctx.createLinearGradient(0, 0, w, h);
    base.addColorStop(0, '#74372c');
    base.addColorStop(0.44, '#381512');
    base.addColorStop(1, '#070202');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const p00 = point(curtain, x, y);
        const p10 = point(curtain, x + 1, y);
        const p11 = point(curtain, x + 1, y + 1);
        const p01 = point(curtain, x, y + 1);
        const u = (x + 0.5) / cols;
        const v = (y + 0.5) / rows;
        const wrinkle = Math.sin(u * Math.PI * 13 + (p00.x - p00.bx) * 0.045 + time * 0.35 * side);
        const verticalTension = Math.hypot(p01.x - p00.x, p01.y - p00.y) / (h / rows);
        const silk = 0.46 + wrinkle * 0.28 + Math.max(0, verticalTension - 1) * 0.30 + curtain.collisionEnergy * 0.18;
        const r = Math.round(44 + silk * 112);
        const g = Math.round(15 + silk * 58);
        const b = Math.round(14 + silk * 46);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.moveTo(p00.x, p00.y);
        ctx.lineTo(p10.x, p10.y);
        ctx.lineTo(p11.x, p11.y);
        ctx.lineTo(p01.x, p01.y);
        ctx.closePath();
        ctx.fill();

        if (x % 3 === 0) {
          ctx.globalAlpha = 0.11 + Math.max(0, wrinkle) * 0.10;
          ctx.strokeStyle = '#ffd1a0';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo((p00.x + p01.x) * 0.5, (p00.y + p01.y) * 0.5);
          ctx.lineTo((p10.x + p11.x) * 0.5, (p10.y + p11.y) * 0.5);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.13 + curtain.collisionEnergy * 0.16;
    ctx.strokeStyle = '#f3c398';
    ctx.lineWidth = 0.55;
    for (let x = 0; x <= cols; x += 2) {
      ctx.beginPath();
      for (let y = 0; y <= rows; y++) {
        const p = point(curtain, x, y);
        if (y === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 0.075;
    for (let y = 2; y <= rows; y += 2) {
      ctx.beginPath();
      for (let x = 0; x <= cols; x++) {
        const p = point(curtain, x, y);
        if (x === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();

    const bottom = ctx.createLinearGradient(0, h - 82, 0, h);
    bottom.addColorStop(0, 'rgba(255,218,178,.02)');
    bottom.addColorStop(0.45, 'rgba(20,7,5,.22)');
    bottom.addColorStop(1, 'rgba(0,0,0,.58)');
    ctx.fillStyle = bottom;
    ctx.beginPath();
    ctx.moveTo(0, h - 55);
    for (let x = 0; x <= cols; x++) {
      const p = point(curtain, x, rows);
      ctx.lineTo(p.x, p.y - 4);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    const vignette = ctx.createLinearGradient(side < 0 ? w : 0, 0, side < 0 ? 0 : w, 0);
    vignette.addColorStop(0, 'rgba(0,0,0,.42)');
    vignette.addColorStop(0.34, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,.52)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
  }

  function animate(ms) {
    const time = ms * 0.001;
    const stiffness = 0.055;
    const damping = 0.82;
    const force = (state.target - state.open) * stiffness;
    state.velocity = (state.velocity + force) * damping;
    state.open = clamp(state.open + state.velocity);
    state.shock *= 0.92;
    state.pointerVX *= 0.82;
    state.pointerVY *= 0.82;
    state.pull *= 0.92;

    const idleDrift = Math.sin(time * 0.72) * 0.012 + Math.sin(time * 1.41) * 0.005;
    const energy = Math.max(...curtains.map((curtain) => curtain.collisionEnergy), state.shock);
    const physicalOpen = clamp(state.open + idleDrift * (1 - state.open) + state.shock * 0.08);
    stage.style.setProperty('--curtain-open', physicalOpen.toFixed(4));
    stage.style.setProperty('--curtain-sway', (idleDrift * 18 + state.velocity * 120 + energy * 12).toFixed(3));
    stage.style.setProperty('--curtain-pull', Math.max(state.pull, energy).toFixed(4));

    curtains.forEach((curtain) => {
      simulateCurtain(curtain, time);
      drawCurtain(curtain, time);
    });
    window.__curtainPhysicsDebug = {
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
