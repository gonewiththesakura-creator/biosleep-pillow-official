import * as THREE from 'three';
import './styles.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="nav" data-reveal>
    <a class="brand" href="#top" aria-label="BioSleep Atelier 首页">
      <span class="brand-mark"></span>
      <span>BioSleep Atelier</span>
    </a>
    <nav>
      <a href="#material">材料</a>
      <a href="#pillow">3D 查看</a>
      <a href="#room">卧室场景</a>
      <a href="#order">预约</a>
    </nav>
  </header>

  <section id="top" class="hero section-dark">
    <div class="hero-copy" data-reveal>
      <p class="eyebrow">BIO-BASED SLEEP SYSTEM</p>
      <h1><span>把一整晚的安静，</span><span>做成一只枕头。</span></h1>
      <p class="lede">生物基亲肤纤维、分区慢回弹承托与恒湿微气候结构，藏在克制的外观之下。不是更软，而是更懂得让身体放下。</p>
      <div class="hero-actions">
        <a class="button primary" href="#pillow">查看枕头</a>
        <a class="button ghost" href="#room">进入卧室</a>
      </div>
    </div>
    <div class="hero-stage" data-reveal>
      <div class="cloth-orbit"></div>
      <canvas id="pillow-canvas" aria-label="可交互 3D 安睡枕模型"></canvas>
      <div class="stage-caption">
        <span>01</span>
        <p>拖动鼠标，枕面会像真实织物一样回应光线。</p>
      </div>
    </div>
    <div class="scroll-cue">SCROLL</div>
  </section>

  <section id="material" class="section light material">
    <div class="section-heading" data-reveal>
      <p class="eyebrow dark">MATERIAL QUIETLY WORKS</p>
      <h2>不是堆参数，<br/>是把触感、支撑和呼吸感调到刚好。</h2>
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

  <section id="pillow" class="section product section-dark">
    <div class="product-copy" data-reveal>
      <p class="eyebrow">OBJECT, NOT ORNAMENT</p>
      <h2>它看起来很安静。<br/>只有躺下时，才开始表达。</h2>
      <p>大厂式产品页的克制，不靠嘈杂卖点堆满屏幕。我们只保留真正影响睡眠的三件事：触感、承托、温度。</p>
    </div>
    <div class="spec-rail" data-reveal>
      <div><b>38%</b><span>Bio-based surface yarn</span></div>
      <div><b>7°</b><span>Neck angle relief zone</span></div>
      <div><b>0.8s</b><span>Slow rebound recovery</span></div>
    </div>
  </section>

  <section id="room" class="section room light">
    <div class="section-heading slim" data-reveal>
      <p class="eyebrow dark">INTERACTIVE BEDROOM</p>
      <h2>把夜晚当作一个系统来设计。</h2>
      <p>点击场景中的标记，查看枕头如何参与卧室里的温度、支撑与情绪。</p>
    </div>
    <div class="room-scene" data-reveal>
      <div class="sunbeam"></div>
      <div class="wall-art"></div>
      <div class="bed">
        <div class="headboard"></div>
        <div class="mattress"></div>
        <div class="duvet"></div>
        <div class="scene-pillow"></div>
      </div>
      <button class="hotspot active" style="--x: 62%; --y: 41%" data-title="分区承托" data-text="中心柔和下沉，颈部区域有更稳定的回弹，降低睡姿切换时的压迫感。">1</button>
      <button class="hotspot" style="--x: 45%; --y: 57%" data-title="微气候通道" data-text="枕芯与床品之间保留细微空气层，帮助夜间热量缓慢散出。">2</button>
      <button class="hotspot" style="--x: 72%; --y: 28%" data-title="低刺激触面" data-text="表层亲肤纤维追求干净、细腻、低摩擦，而不是廉价的滑。">3</button>
      <aside class="room-panel">
        <span>SCENE NOTE</span>
        <h3 id="panel-title">分区承托</h3>
        <p id="panel-text">中心柔和下沉，颈部区域有更稳定的回弹，降低睡姿切换时的压迫感。</p>
      </aside>
    </div>
  </section>

  <section id="order" class="section order section-dark">
    <div data-reveal>
      <p class="eyebrow">REST, REFINED</p>
      <h2>给高端睡眠品牌的第一版官网，已经有了。</h2>
      <p>后续可以接入真实产品图、购买按钮、检测报告、品牌故事、短视频动效与 3D 模型 glTF。</p>
      <a class="button primary light" href="mailto:hello@example.com">预约首批体验</a>
    </div>
  </section>
`;

function initPillow() {
  const canvas = document.querySelector('#pillow-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.55, 6.2);

  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.BoxGeometry(4.1, 0.78, 2.22, 56, 18, 34);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const edge = Math.max(Math.abs(x) / 2.05, Math.abs(z) / 1.11);
    const crown = Math.exp(-(x * x * 0.22 + z * z * 0.62));
    const seam = Math.sin((x + 2.1) * 9.0) * 0.012 + Math.sin((z + 1.3) * 14.0) * 0.008;
    pos.setY(i, y * (0.76 + crown * 0.42) - Math.pow(edge, 3.2) * 0.16 + seam);
    pos.setX(i, x * (1 - Math.pow(Math.abs(z) / 1.5, 4) * 0.04));
  }
  geometry.computeVertexNormals();

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf4f1ea,
    roughness: 0.72,
    metalness: 0.02,
    clearcoat: 0.28,
    clearcoatRoughness: 0.8,
    sheen: 0.9,
    sheenColor: new THREE.Color(0xffffff)
  });
  const pillow = new THREE.Mesh(geometry, material);
  pillow.rotation.x = -0.08;
  group.add(pillow);

  const seamMat = new THREE.LineBasicMaterial({ color: 0xd8d1c4, transparent: true, opacity: 0.38 });
  for (const z of [-1.13, 1.13]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.95, 0.17, z),
      new THREE.Vector3(-0.6, 0.27, z),
      new THREE.Vector3(0.7, 0.27, z),
      new THREE.Vector3(1.95, 0.15, z)
    ]);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)), seamMat);
    group.add(line);
  }

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(2.35, 96),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.13 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.7;
  shadow.scale.z = 0.34;
  group.add(shadow);

  scene.add(new THREE.AmbientLight(0xffffff, 1.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd8e5ff, 1.1);
  rim.position.set(4, 1.8, -4);
  scene.add(rim);

  const pointer = { x: 0, y: 0 };
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
    group.rotation.y += ((pointer.x * 0.24) - group.rotation.y) * 0.035;
    group.rotation.x += ((-pointer.y * 0.06) - group.rotation.x) * 0.035;
    pillow.position.y = Math.sin(time * 0.9) * 0.035;
    material.roughness = 0.68 + Math.sin(time * 0.7) * 0.035;
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
    particles = Array.from({ length: Math.min(150, Math.floor(window.innerWidth / 8)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      a: Math.random() * Math.PI * 2,
      s: 0.35 + Math.random() * 1.2,
      l: 40 + Math.random() * 120
    }));
  }
  window.addEventListener('resize', resize);
  resize();
  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.13;
    ctx.strokeStyle = '#d8d0c2';
    ctx.lineWidth = devicePixelRatio * 0.7;
    particles.forEach(p => {
      p.a += 0.004 * p.s;
      p.x += Math.cos(p.a) * 0.18 * devicePixelRatio;
      p.y += Math.sin(p.a * 0.7) * 0.12 * devicePixelRatio;
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

function initHotspots() {
  const title = document.querySelector('#panel-title');
  const text = document.querySelector('#panel-text');
  document.querySelectorAll('.hotspot').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hotspot').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      title.textContent = btn.dataset.title;
      text.textContent = btn.dataset.text;
    });
  });
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
initHotspots();
initReveal();
