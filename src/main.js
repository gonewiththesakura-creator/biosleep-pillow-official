import * as THREE from 'three';
import './styles.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="nav">
    <a class="brand" href="#top" aria-label="BioSleep Atelier 首页">
      <span class="brand-mark"></span>
      <span>BioSleep Atelier</span>
    </a>
    <nav>
      <a href="#top">序幕</a>
      <a href="#room">卧室</a>
      <a href="#material">材料</a>
      <a href="#order">预约</a>
    </nav>
  </header>

  <section id="top" class="scrolly" aria-label="拉开窗帘进入卧室的滚动叙事">
    <div class="scrolly-stage">
      <div class="night-sky" aria-hidden="true"></div>
      <div class="room-light" aria-hidden="true"></div>
      <div class="bedroom" id="room" aria-hidden="true">
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

      <div class="curtain curtain-left" aria-hidden="true">
        <canvas class="curtain-canvas"></canvas>
        <div class="curtain-edge"></div>
      </div>
      <div class="curtain curtain-right" aria-hidden="true">
        <canvas class="curtain-canvas"></canvas>
        <div class="curtain-edge"></div>
      </div>
      <div class="curtain-rail" aria-hidden="true"></div>

      <div class="pillow-stage">
        <canvas id="pillow-canvas" aria-label="滚动驱动旋转的 3D 生物基安睡枕"></canvas>
        <div class="pillow-halo" aria-hidden="true"></div>
      </div>

      <div class="story-copy story-0 active" data-step="0">
        <p class="eyebrow">BIO-BASED SLEEP SYSTEM</p>
        <h1><span>先拉开夜色，</span><span>再进入睡眠。</span></h1>
        <p>向下滚动。窗帘会被慢慢拉开，卧室光线进入，枕头在场景中央完成一次静默的展示。</p>
      </div>
      <div class="story-copy story-1" data-step="1">
        <p class="eyebrow">CURTAIN / TEXTURE</p>
        <h2>布料不是背景，<br/>是入睡前的第一层仪式。</h2>
        <p>厚重窗帘以织物纹理、纵向褶皱和微光纱线展开，让页面像一段短片，而不是普通电商落地页。</p>
      </div>
      <div class="story-copy story-2" data-step="2">
        <p class="eyebrow">OBJECT IN MOTION</p>
        <h2>枕头旋转，<br/>展示真实的体积与边缘。</h2>
        <p>滚动驱动 3D 模型转场：从正面、侧面到俯视，看到柔和冠面、边缘压线与慢回弹的雕塑感。</p>
      </div>
      <div class="story-copy story-3" data-step="3">
        <p class="eyebrow">ENTER THE ROOM</p>
        <h2>最后，卧室出现。<br/>产品回到该在的位置。</h2>
        <p>不是把枕头悬在虚空里，而是放回夜晚的系统：光、床品、温度、呼吸和身体的放松。</p>
      </div>

      <div class="progress-label">
        <span id="progress-index">01</span>
        <i></i>
        <span>SCROLL TO OPEN</span>
      </div>
    </div>
  </section>

  <section id="material" class="section light material">
    <div class="section-heading" data-reveal>
      <p class="eyebrow dark">MATERIAL QUIETLY WORKS</p>
      <h2>看起来克制，<br/>里面每一层都在工作。</h2>
      <p>进入卧室之后，页面从电影感回到产品事实：触面、承托、微气候，三件事决定一整晚。</p>
    </div>
    <div class="material-grid">
      <article class="material-card wide" data-reveal>
        <div class="fiber-field" aria-hidden="true"></div>
        <span class="num">A</span>
        <h3>生物基亲肤层</h3>
        <p>来自可再生来源的纤维触面，减少塑料感与闷热感，让第一秒接触更像干净的云。</p>
      </article>
      <article class="material-card" data-reveal>
        <span class="num">B</span>
        <h3>低压承托芯</h3>
        <p>颈部、后脑与肩线受力被重新分配，睡姿变化时不需要反复寻找角度。</p>
      </article>
      <article class="material-card dark-card" data-reveal>
        <span class="num">C</span>
        <h3>恒湿微气候</h3>
        <p>枕芯内部形成细微气流路径，夜间热量与湿气被温柔带走。</p>
      </article>
    </div>
  </section>

  <section class="section product section-dark">
    <div class="product-copy" data-reveal>
      <p class="eyebrow">OBJECT, NOT ORNAMENT</p>
      <h2>它看起来很安静。<br/>只有躺下时，才开始表达。</h2>
      <p>我们保留真正影响睡眠的三件事：触感、承托、温度。其余噪音，都被拿掉。</p>
    </div>
    <div class="spec-rail" data-reveal>
      <div><b>38%</b><span>Bio-based surface yarn</span></div>
      <div><b>7°</b><span>Neck angle relief zone</span></div>
      <div><b>0.8s</b><span>Slow rebound recovery</span></div>
    </div>
  </section>

  <section id="order" class="section order section-dark">
    <div data-reveal>
      <p class="eyebrow">REST, REFINED</p>
      <h2>让官网像产品一样，安静但难忘。</h2>
      <p>下一步可以接入真实产品摄影、材质检测报告、购买链路和 glTF 高精模型。</p>
      <a class="button primary light" href="mailto:hello@example.com">预约首批体验</a>
    </div>
  </section>
`;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
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
  const scrollState = { p: 0 };
  window.__setPillowScroll = (p) => { scrollState.p = p; };

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
    const p = scrollState.p;
    const scrollRot = p * Math.PI * 2.15 - 0.28;
    group.rotation.y += (scrollRot + pointer.x * 0.08 - group.rotation.y) * 0.045;
    group.rotation.x += ((-0.10 + Math.sin(p * Math.PI) * 0.42 - pointer.y * 0.035) - group.rotation.x) * 0.045;
    group.rotation.z += ((p - 0.5) * 0.08 - group.rotation.z) * 0.04;
    pillow.position.y = Math.sin(time * 0.9) * 0.028;
    material.roughness = 0.68 + Math.sin(time * 0.7 + p * 2) * 0.035;
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
    side: el.classList.contains('curtain-left') ? -1 : 1,
    w: 0,
    h: 0
  }));

  const state = {
    target: 0,
    open: 0,
    velocity: 0,
    shock: 0,
    lastTarget: 0,
    pointerX: 0,
    pointerY: 0
  };

  window.__setCurtainOpen = (open) => {
    const next = clamp(open);
    state.shock += Math.min(0.06, Math.abs(next - state.lastTarget) * 0.16);
    state.target = next;
    state.lastTarget = next;
  };

  window.addEventListener('pointermove', (event) => {
    state.pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    state.pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

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
      const ctx = curtain.canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  }

  function drawCurtain(curtain, time) {
    const { canvas, side, w, h } = curtain;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    const open = state.open;
    const idle = Math.sin(time * 0.82 + side * 1.1) * 0.52 + Math.sin(time * 1.47) * 0.18;
    const wind = (idle + state.pointerX * 0.18 + state.shock * 10) * (1 - open * 0.42);
    const foldCount = 6.4;
    const topPinch = 0.26 + open * 0.34;
    const bottomSwing = wind * 24;
    const hemWave = 14 + state.shock * 110;

    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#6d3429');
    bg.addColorStop(0.42, '#351512');
    bg.addColorStop(0.78, '#130706');
    bg.addColorStop(1, '#080303');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const strips = 76;
    for (let i = 0; i < strips; i++) {
      const n0 = i / strips;
      const n1 = (i + 1) / strips;
      const x0 = n0 * w;
      const x1 = n1 * w;
      const mid = (n0 + n1) * 0.5;
      const fold = Math.sin(mid * Math.PI * foldCount + time * 0.38 * side + wind * 0.06);
      const fold2 = Math.sin(mid * Math.PI * (foldCount * 2.15) - time * 0.22);
      const depth = 0.5 + fold * 0.5;
      const shade = 0.05 + depth * 0.50 + Math.max(0, fold2) * 0.10;
      const topOffset = side * Math.sin(mid * Math.PI * foldCount) * topPinch * 22;
      const bottomOffset = side * (fold * 24 + bottomSwing * (0.25 + mid * 0.8));
      const yBottom0 = h - hemWave * Math.sin(mid * Math.PI * 2.2 + time * 1.1 + side);
      const yBottom1 = h - hemWave * Math.sin(n1 * Math.PI * 2.2 + time * 1.1 + side);

      const grad = ctx.createLinearGradient(x0, 0, x1, 0);
      grad.addColorStop(0, `rgba(${22 + shade * 112}, ${8 + shade * 56}, ${8 + shade * 44}, 1)`);
      grad.addColorStop(0.46, `rgba(${82 + shade * 150}, ${36 + shade * 82}, ${29 + shade * 62}, 1)`);
      grad.addColorStop(1, `rgba(${16 + shade * 72}, ${6 + shade * 36}, ${6 + shade * 32}, 1)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(x0 + topOffset * 0.4, 0);
      ctx.bezierCurveTo(x0 + topOffset, h * 0.28, x0 + bottomOffset * 0.25, h * 0.72, x0 + bottomOffset, yBottom0);
      ctx.lineTo(x1 + bottomOffset * 0.92, yBottom1);
      ctx.bezierCurveTo(x1 + topOffset * 0.3, h * 0.72, x1 + topOffset * 0.82, h * 0.28, x1 + topOffset * 0.35, 0);
      ctx.closePath();
      ctx.fill();

      if (depth > 0.7) {
        ctx.globalAlpha = (depth - 0.66) * 0.42;
        ctx.strokeStyle = '#f1c99c';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo((x0 + x1) / 2 + topOffset * 0.5, 0);
        ctx.bezierCurveTo((x0 + x1) / 2 + topOffset, h * 0.28, (x0 + x1) / 2 + bottomOffset * 0.28, h * 0.72, (x0 + x1) / 2 + bottomOffset, yBottom0);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = '#e7b98e';
    ctx.lineWidth = 0.55;
    for (let x = 0; x < w; x += 9) {
      const sway = Math.sin(x * 0.018 + time * 0.65) * (4 + state.shock * 80);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + sway, h * 0.3, x - sway * 0.45, h * 0.68, x + sway * 0.25, h);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.08;
    for (let y = 12; y < h; y += 13) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.sin(time + y * 0.04) * 1.5);
      ctx.lineTo(w, y + Math.cos(time + y * 0.035) * 1.5);
      ctx.stroke();
    }
    ctx.restore();

    const hem = ctx.createLinearGradient(0, h - 58, 0, h);
    hem.addColorStop(0, 'rgba(255,215,170,.05)');
    hem.addColorStop(0.45, 'rgba(15,5,4,.18)');
    hem.addColorStop(1, 'rgba(0,0,0,.46)');
    ctx.fillStyle = hem;
    ctx.fillRect(0, h - 62, w, 62);

    ctx.globalAlpha = 0.34;
    ctx.strokeStyle = 'rgba(255,217,178,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 18) {
      const y = h - 50 + Math.sin(x * 0.025 + time * 1.2) * 4;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    const vignette = ctx.createLinearGradient(side < 0 ? w : 0, 0, side < 0 ? 0 : w, 0);
    vignette.addColorStop(0, 'rgba(0,0,0,.38)');
    vignette.addColorStop(0.34, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,.48)');
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

    const idleDrift = Math.sin(time * 0.72) * 0.012 + Math.sin(time * 1.41) * 0.005;
    const physicalOpen = clamp(state.open + idleDrift * (1 - state.open) + state.shock * 0.08);
    stage.style.setProperty('--curtain-open', physicalOpen.toFixed(4));
    stage.style.setProperty('--curtain-sway', (idleDrift * 18 + state.velocity * 120).toFixed(3));

    curtains.forEach((curtain) => drawCurtain(curtain, time));
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

  function update() {
    const rect = scrolly.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    const p = clamp(-rect.top / travel);
    const open = clamp((p - 0.06) / 0.36);
    const room = clamp((p - 0.34) / 0.34);
    const pillow = clamp((p - 0.18) / 0.62);
    const glow = clamp((p - 0.18) / 0.45);

    stage.style.setProperty('--open', open.toFixed(4));
    stage.style.setProperty('--room', room.toFixed(4));
    stage.style.setProperty('--pillow', pillow.toFixed(4));
    stage.style.setProperty('--glow', glow.toFixed(4));
    window.__setPillowScroll?.(pillow);
    window.__setCurtainOpen?.(open);

    const step = Math.min(3, Math.floor(clamp(p * 4.12, 0, 3.999)));
    copies.forEach((el, i) => el.classList.toggle('active', i === step));
    index.textContent = `0${step + 1}`;
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
