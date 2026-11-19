import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  diving: boolean;
}

function createProceduralEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x28050b);

  // Warm palace chandelier light panels for realistic gold reflections
  const panelGeo = new THREE.PlaneGeometry(10, 10);
  const warmPanelMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xffe1a8),
    side: THREE.DoubleSide,
  });
  const saffronPanelMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xd88a32),
    side: THREE.DoubleSide,
  });
  const maroonGlowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x882032),
    side: THREE.DoubleSide,
  });

  const topPanel = new THREE.Mesh(panelGeo, warmPanelMat);
  topPanel.position.set(0, 8, 2);
  topPanel.rotation.x = Math.PI / 2;
  envScene.add(topPanel);

  const leftPanel = new THREE.Mesh(panelGeo, saffronPanelMat);
  leftPanel.position.set(-9, 3, -2);
  leftPanel.rotation.y = Math.PI / 2.2;
  envScene.add(leftPanel);

  const rightPanel = new THREE.Mesh(panelGeo, warmPanelMat);
  rightPanel.position.set(9, 2, 1);
  rightPanel.rotation.y = -Math.PI / 2.2;
  envScene.add(rightPanel);

  const backPanel = new THREE.Mesh(panelGeo, maroonGlowMat);
  backPanel.position.set(0, -4, -9);
  envScene.add(backPanel);

  const renderTarget = pmrem.fromScene(envScene, 0.04);
  pmrem.dispose();
  panelGeo.dispose();
  warmPanelMat.dispose();
  saffronPanelMat.dispose();
  maroonGlowMat.dispose();

  return renderTarget.texture;
}

function createJharokhaArchGeometry(outerW: number, outerH: number, thickness: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const hw = outerW / 2;
  const hh = outerH / 2;
  // Outer rectangle
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh);
  shape.lineTo(-hw, hh);
  shape.closePath();

  // Inner cusped Rajasthani arch hole
  const hole = new THREE.Path();
  const aw = outerW * 0.34;
  const baseBottom = -hh * 0.85;
  const springY = hh * 0.12;
  const apexY = hh * 0.72;

  hole.moveTo(-aw, baseBottom);
  hole.lineTo(aw, baseBottom);
  hole.lineTo(aw, springY);
  // Cusped curves up to apex
  hole.bezierCurveTo(aw * 0.98, springY + 0.45, aw * 0.62, springY + 0.55, aw * 0.52, springY + 0.82);
  hole.bezierCurveTo(aw * 0.42, apexY - 0.15, aw * 0.16, apexY - 0.06, 0, apexY);
  hole.bezierCurveTo(-aw * 0.16, apexY - 0.06, -aw * 0.42, apexY - 0.15, -aw * 0.52, springY + 0.82);
  hole.bezierCurveTo(-aw * 0.62, springY + 0.55, -aw * 0.98, springY + 0.45, -aw, springY);
  hole.closePath();

  shape.holes.push(hole);

  return new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
}

function createDiamondKajuGeometry(scale = 1): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0.34 * scale);
  s.lineTo(0.24 * scale, 0);
  s.lineTo(0, -0.34 * scale);
  s.lineTo(-0.24 * scale, 0);
  s.closePath();

  return new THREE.ExtrudeGeometry(s, {
    depth: 0.065 * scale,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.018 * scale,
    bevelThickness: 0.015 * scale,
  });
}

export const HeroCanvas = ({ diving }: HeroCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const divingRef = useRef(diving);

  useEffect(() => {
    divingRef.current = diving;
  }, [diving]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x28050c);
    scene.fog = new THREE.FogExp2(0x360811, 0.055);

    const aspect = width / height;
    const isPortrait = aspect < 0.85;
    const isTablet = aspect >= 0.85 && aspect < 1.2;
    const baseCameraZ = isPortrait ? 10.6 : isTablet ? 8.5 : 7.1;
    const baseCameraY = isPortrait ? 1.85 : 1.55;

    const camera = new THREE.PerspectiveCamera(isPortrait ? 44 : 38, aspect, 0.1, 60);
    camera.position.set(0, baseCameraY, baseCameraZ);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const envTexture = createProceduralEnvMap(renderer);
    scene.environment = envTexture;

    // Cinematic Royal Lighting
    const ambient = new THREE.AmbientLight(0x631a27, 1.25);
    scene.add(ambient);

    const keyLight = new THREE.SpotLight(0xffe2a8, 42, 24, Math.PI / 4, 0.55, 1.4);
    keyLight.position.set(3.8, 6.2, 4.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd88a32, 16, 16);
    rimLight.position.set(-4.2, 2.4, -2.5);
    scene.add(rimLight);

    const underGlow = new THREE.PointLight(0x9a2138, 12, 12);
    underGlow.position.set(0, -2.4, 1.8);
    scene.add(underGlow);

    const cursorSpot = new THREE.PointLight(0xf3d89b, 7.5, 9);
    cursorSpot.position.set(0, 2, 3);
    scene.add(cursorSpot);

    // Materials
    const antiqueGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      metalness: 0.92,
      roughness: 0.24,
      envMapIntensity: 1.45,
    });

    const champagneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe5cc91,
      metalness: 0.95,
      roughness: 0.16,
      envMapIntensity: 1.6,
    });

    const maroonStoneMat = new THREE.MeshStandardMaterial({
      color: 0x3b0913,
      metalness: 0.25,
      roughness: 0.72,
    });

    // =========================================================================
    // 1. MASSIVE FLOATING ROYAL GOLDEN THALI + ARRANGED MITHAI
    // =========================================================================
    const thaliGroup = new THREE.Group();
    thaliGroup.position.set(0, -0.32, 0.2);
    thaliGroup.rotation.x = 0.26;
    scene.add(thaliGroup);

    // Sculpted Lathe Thali Profile
    const thaliPoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(1.75, 0.0),
      new THREE.Vector2(1.92, 0.06),
      new THREE.Vector2(2.08, 0.22),
      new THREE.Vector2(2.26, 0.26),
      new THREE.Vector2(2.32, 0.22),
      new THREE.Vector2(2.22, 0.04),
      new THREE.Vector2(2.02, -0.08),
      new THREE.Vector2(0.0, -0.1),
    ];
    const thaliGeo = new THREE.LatheGeometry(thaliPoints, 96);
    const thaliMesh = new THREE.Mesh(thaliGeo, antiqueGoldMat);
    thaliMesh.castShadow = true;
    thaliMesh.receiveShadow = true;
    thaliGroup.add(thaliMesh);

    // Concentric engraved rings on the thali bed
    [0.62, 1.15, 1.68, 2.18].forEach((radius, idx) => {
      const ringGeo = new THREE.TorusGeometry(radius, idx === 3 ? 0.025 : 0.01, 14, 96);
      const ring = new THREE.Mesh(ringGeo, champagneGoldMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = idx === 3 ? 0.25 : 0.015;
      thaliGroup.add(ring);
    });

    // 24 Scalloped Royal Rim Medallions
    const jewelGeo = new THREE.OctahedronGeometry(0.048, 0);
    const rubyMat = new THREE.MeshStandardMaterial({
      color: 0x701d2a,
      metalness: 0.4,
      roughness: 0.15,
    });
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const bead = new THREE.Mesh(jewelGeo, i % 2 === 0 ? champagneGoldMat : rubyMat);
      bead.position.set(Math.cos(a) * 2.18, 0.265, Math.sin(a) * 2.18);
      bead.scale.set(1, 0.55, 1);
      thaliGroup.add(bead);
    }

    // Center Royal Katori Bowl holding Saffron Gulab Jamuns
    const katoriPoints = [
      new THREE.Vector2(0.0, 0.02),
      new THREE.Vector2(0.38, 0.02),
      new THREE.Vector2(0.52, 0.16),
      new THREE.Vector2(0.56, 0.34),
      new THREE.Vector2(0.59, 0.36),
      new THREE.Vector2(0.51, 0.34),
      new THREE.Vector2(0.45, 0.18),
      new THREE.Vector2(0.0, 0.07),
    ];
    const katoriGeo = new THREE.LatheGeometry(katoriPoints, 48);
    const katoriMesh = new THREE.Mesh(katoriGeo, champagneGoldMat);
    katoriMesh.castShadow = true;
    thaliGroup.add(katoriMesh);

    // Gulab Jamun spheres in center katori
    const jamunGeo = new THREE.SphereGeometry(0.14, 28, 28);
    const jamunMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b150e,
      roughness: 0.16,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
    });
    const jamunOffsets: [number, number, number][] = [
      [0, 0.23, 0],
      [0.2, 0.19, 0.12],
      [-0.2, 0.19, 0.11],
      [0.02, 0.19, -0.22],
      [0.1, 0.36, -0.04],
    ];
    jamunOffsets.forEach(([x, y, z]) => {
      const j = new THREE.Mesh(jamunGeo, jamunMat);
      j.position.set(x, y, z);
      j.castShadow = true;
      thaliGroup.add(j);
    });

    // Surrounding Mithai Jewel Clusters (Interactive response references)
    const sweetClusters: THREE.Group[] = [];

    // Materials for sweets
    const kajuMat = new THREE.MeshStandardMaterial({
      color: 0xf1e5d1,
      roughness: 0.36,
      metalness: 0.08,
    });
    const silverVarqMat = new THREE.MeshStandardMaterial({
      color: 0xf4f6f8,
      metalness: 0.96,
      roughness: 0.12,
      envMapIntensity: 1.8,
    });
    const ladooMat = new THREE.MeshStandardMaterial({
      color: 0xd88a32,
      roughness: 0.55,
      metalness: 0.05,
    });
    const pistaMat = new THREE.MeshStandardMaterial({
      color: 0x6f9452,
      roughness: 0.48,
      metalness: 0.05,
    });
    const pedaMat = new THREE.MeshStandardMaterial({
      color: 0xe2af5c,
      roughness: 0.44,
      metalness: 0.06,
    });

    const diamondGeo = createDiamondKajuGeometry(1.0);
    const saffronGeo = new THREE.TorusGeometry(0.04, 0.005, 6, 14, Math.PI * 1.1);
    const saffronMat = new THREE.MeshStandardMaterial({ color: 0xa91d22, roughness: 0.5 });

    // Arrange 6 outer jewel clusters around the central katori
    for (let c = 0; c < 6; c++) {
      const angle = (c / 6) * Math.PI * 2 + Math.PI / 6;
      const cluster = new THREE.Group();
      const dist = 1.28;
      cluster.position.set(Math.cos(angle) * dist, 0.04, Math.sin(angle) * dist);
      cluster.rotation.y = -angle;

      // Mini gold saucer plate
      const saucer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.34, 0.04, 32),
        antiqueGoldMat
      );
      saucer.receiveShadow = true;
      cluster.add(saucer);

      if (c % 3 === 0) {
        // Stacked Kaju Katli diamonds with Silver Varq
        for (let s = 0; s < 3; s++) {
          const piece = new THREE.Mesh(diamondGeo, kajuMat);
          piece.rotation.x = Math.PI / 2;
          piece.rotation.z = s * 0.35;
          piece.position.set((s - 1) * 0.08, 0.09 + s * 0.06, (s % 2) * 0.06);
          piece.castShadow = true;
          cluster.add(piece);

          const varq = new THREE.Mesh(diamondGeo, silverVarqMat);
          varq.scale.set(0.88, 0.88, 0.14);
          varq.rotation.x = Math.PI / 2;
          varq.rotation.z = s * 0.35;
          varq.position.set(piece.position.x, piece.position.y + 0.036, piece.position.z);
          cluster.add(varq);
        }
        const strand = new THREE.Mesh(saffronGeo, saffronMat);
        strand.position.set(0, 0.27, 0);
        strand.rotation.x = Math.PI / 2;
        cluster.add(strand);
      } else if (c % 3 === 1) {
        // Saffron Motichoor Ladoo Trio
        const lGeo = new THREE.SphereGeometry(0.14, 24, 24);
        [
          [-0.14, 0.14, 0.08],
          [0.14, 0.14, 0.08],
          [0, 0.14, -0.14],
          [0, 0.32, 0],
        ].forEach(([lx, ly, lz]) => {
          const l = new THREE.Mesh(lGeo, ladooMat);
          l.position.set(lx, ly, lz);
          l.castShadow = true;
          cluster.add(l);
        });
      } else {
        // Royal Pista Barfi & Kesar Peda Sculptural Stack
        const barfiGeo = new THREE.BoxGeometry(0.24, 0.09, 0.24);
        const b1 = new THREE.Mesh(barfiGeo, pistaMat);
        b1.position.set(-0.08, 0.08, 0.06);
        b1.rotation.y = 0.2;
        b1.castShadow = true;
        cluster.add(b1);

        const b2 = new THREE.Mesh(barfiGeo, pedaMat);
        b2.position.set(0.08, 0.16, -0.04);
        b2.rotation.y = -0.35;
        b2.castShadow = true;
        cluster.add(b2);

        const topGold = new THREE.Mesh(
          new THREE.PlaneGeometry(0.16, 0.16),
          champagneGoldMat
        );
        topGold.rotation.x = -Math.PI / 2;
        topGold.position.set(0.08, 0.207, -0.04);
        cluster.add(topGold);
      }

      thaliGroup.add(cluster);
      sweetClusters.push(cluster);
    }

    // =========================================================================
    // 2. CARVED RAJASTHANI ARCHITECTURAL LAYERS (MULTI-DEPTH PARALLAX)
    // =========================================================================
    const archLayers: { mesh: THREE.Mesh; baseZ: number; depthFactor: number }[] = [];
    const archConfigs = [
      { w: 7.4, h: 6.2, z: -3.2, depth: 0.18, factor: 0.32 },
      { w: 9.8, h: 7.6, z: -6.2, depth: 0.22, factor: 0.56 },
      { w: 12.6, h: 9.4, z: -9.5, depth: 0.26, factor: 0.85 },
    ];

    archConfigs.forEach((cfg, idx) => {
      const geo = createJharokhaArchGeometry(cfg.w, cfg.h, cfg.depth);
      const mat = idx === 0 ? maroonStoneMat : new THREE.MeshStandardMaterial({
        color: idx === 1 ? 0x2f060e : 0x22040a,
        metalness: 0.2,
        roughness: 0.78,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, 0.25, cfg.z);
      scene.add(mesh);

      // Add thin antique gold trim line framing the inner arch
      const trimMat = new THREE.MeshStandardMaterial({
        color: 0xc6a15b,
        metalness: 0.88,
        roughness: 0.28,
        transparent: true,
        opacity: 0.55 - idx * 0.14,
      });
      const frame = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.w * 0.34, 0.016, 8, 64, Math.PI),
        trimMat
      );
      frame.position.set(0, 0.45, cfg.depth + 0.02);
      mesh.add(frame);

      archLayers.push({ mesh, baseZ: cfg.z, depthFactor: cfg.factor });
    });

    // =========================================================================
    // 3. INCENSE-LIKE ATMOSPHERIC VOLUMETRIC MIST SHADER
    // =========================================================================
    const incenseUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };
    const incenseMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: incenseUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.05;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 drift = vec2(uMouse.x * 0.12, -uTime * 0.085);
          float n1 = fbm(uv * 3.2 + drift);
          float n2 = fbm(uv * 5.1 - vec2(uTime * 0.04, uTime * 0.12) + n1 * 0.8);
          float wisp = smoothstep(0.36, 0.84, n2);

          float radialMask = 1.0 - smoothstep(0.15, 0.65, length(uv - vec2(0.5, 0.45)));
          float verticalFade = smoothstep(0.0, 0.25, uv.y) * (1.0 - smoothstep(0.55, 1.0, uv.y));
          float alpha = wisp * radialMask * verticalFade * 0.24;

          vec3 col = mix(vec3(0.44, 0.11, 0.16), vec3(0.85, 0.54, 0.20), n1);
          col = mix(col, vec3(0.90, 0.80, 0.57), wisp * 0.45);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const incensePlane = new THREE.Mesh(new THREE.PlaneGeometry(11, 7), incenseMat);
    incensePlane.position.set(0, 0.4, -1.7);
    scene.add(incensePlane);

    // =========================================================================
    // 4. CURSOR-REACTIVE FLOATING GOLD DUST PARTICLES
    // =========================================================================
    const particleCount = 1100;
    const pPositions = new Float32Array(particleCount * 3);
    const pBase = new Float32Array(particleCount * 3);
    const pSpeed = new Float32Array(particleCount);
    const pColors = new Float32Array(particleCount * 3);

    const goldC1 = new THREE.Color(0xe5cc91);
    const goldC2 = new THREE.Color(0xd88a32);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 13;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.35) * 8;

      pPositions[i3] = x;
      pPositions[i3 + 1] = y;
      pPositions[i3 + 2] = z;

      pBase[i3] = x;
      pBase[i3 + 1] = y;
      pBase[i3 + 2] = z;

      pSpeed[i] = 0.2 + Math.random() * 0.65;

      const mixCol = goldC1.clone().lerp(goldC2, Math.random() * 0.45);
      pColors[i3] = mixCol.r;
      pColors[i3 + 1] = mixCol.g;
      pColors[i3 + 2] = mixCol.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    // Create soft glowing circle particle texture
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,244,214,1)');
      grad.addColorStop(0.32, 'rgba(229,204,145,0.85)');
      grad.addColorStop(1, 'rgba(229,204,145,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTex = new THREE.CanvasTexture(spriteCanvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.085,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const goldDust = new THREE.Points(pGeo, pMat);
    scene.add(goldDust);

    // =========================================================================
    // POINTER, TOUCH & ANIMATION LOOP
    // =========================================================================
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const updatePointerFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      pointer.targetX = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.targetY = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointerFromClient(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerFromClient(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      pointer.targetX *= 0.35;
      pointer.targetY *= 0.35;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    let dynamicBaseZ = baseCameraZ;
    let dynamicBaseY = baseCameraY;
    let dynamicThaliY = isPortrait ? 0.32 : -0.32;

    const applyResponsiveFraming = (w: number, h: number) => {
      const asp = w / h;
      const portrait = asp < 0.85;
      const tablet = asp >= 0.85 && asp < 1.2;
      camera.fov = portrait ? 44 : 38;
      camera.aspect = asp;
      camera.updateProjectionMatrix();
      dynamicBaseZ = portrait ? 10.6 : tablet ? 8.5 : 7.1;
      dynamicBaseY = portrait ? 1.85 : 1.55;
      dynamicThaliY = portrait ? 0.32 : -0.32;
      const thaliScale = portrait ? 0.86 : tablet ? 0.94 : 1.0;
      thaliGroup.scale.setScalar(thaliScale);
    };
    applyResponsiveFraming(width, height);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      applyResponsiveFraming(w, h);
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let diveProgress = 0;
    let rafId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      if (divingRef.current) {
        diveProgress = Math.min(1, diveProgress + 0.032);
      } else {
        diveProgress = Math.max(0, diveProgress - 0.05);
      }

      // Camera smooth parallax + dive transition
      const diveEased = diveProgress * diveProgress * (3 - 2 * diveProgress);
      camera.position.x = pointer.x * 0.65;
      camera.position.y = dynamicBaseY + pointer.y * 0.35 - diveEased * 0.85;
      camera.position.z = dynamicBaseZ - diveEased * (dynamicBaseZ - 2.2);
      camera.lookAt(pointer.x * 0.18, dynamicThaliY * 0.35 + pointer.y * 0.12, 0);

      // Cursor light tracks mouse/touch in 3D space
      cursorSpot.position.x = pointer.x * 3.8;
      cursorSpot.position.y = 1.4 + pointer.y * 2.1;

      // Thali floats & responds subtly to pointer
      thaliGroup.position.y = dynamicThaliY + Math.sin(elapsed * 0.9) * 0.07;
      thaliGroup.rotation.y = elapsed * 0.11 + pointer.x * 0.22;
      thaliGroup.rotation.x = 0.26 - pointer.y * 0.12;
      thaliGroup.rotation.z = -pointer.x * 0.06;

      // Individual sweet clusters gently breathe
      sweetClusters.forEach((cluster, idx) => {
        cluster.position.y =
          0.04 + Math.sin(elapsed * 1.4 + idx * 1.05) * 0.015 + Math.abs(pointer.x) * 0.025;
      });

      // Architectural parallax layers move at different speeds
      archLayers.forEach((layer) => {
        layer.mesh.position.x = -pointer.x * layer.depthFactor * 0.8;
        layer.mesh.position.y = 0.25 - pointer.y * layer.depthFactor * 0.45;
      });

      // Incense shader uniforms
      incenseUniforms.uTime.value = elapsed;
      incenseUniforms.uMouse.value.set(pointer.x, pointer.y);

      // Cursor-reactive Gold Dust particles
      const posAttr = pGeo.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const mouseWorldX = pointer.x * 4.5;
      const mouseWorldY = pointer.y * 2.8;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const speed = pSpeed[i];

        // Gentle upward thermal drift wrapping vertically
        let y = pBase[i3 + 1] + ((elapsed * speed * 0.38) % 8);
        if (y > 4) y -= 8;

        let x = pBase[i3] + Math.sin(elapsed * 0.6 * speed + i) * 0.25;
        const z = pBase[i3 + 2] + Math.cos(elapsed * 0.45 * speed + i) * 0.2;

        // Cursor proximity swirl repulsion
        const dx = x - mouseWorldX;
        const dy = y - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 2.6 && distSq > 0.001) {
          const force = (1 - distSq / 2.6) * 0.45;
          const dist = Math.sqrt(distSq);
          x += (dx / dist) * force - (dy / dist) * force * 0.35;
          y += (dy / dist) * force + (dx / dist) * force * 0.35;
        }

        arr[i3] = x;
        arr[i3 + 1] = y;
        arr[i3 + 2] = z;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else if (mat) {
          mat.dispose();
        }
      });
      envTexture.dispose();
      particleTex.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full touch-pan-y" />;
};
