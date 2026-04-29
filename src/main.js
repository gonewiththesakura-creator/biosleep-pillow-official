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
        <div class="curtain-weave"></div>
      </div>
      <div class="curtain curtain-right" aria-hidden="true">
        <div class="curtain-weave"></div>
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
initScrollytelling();
initReveal();
