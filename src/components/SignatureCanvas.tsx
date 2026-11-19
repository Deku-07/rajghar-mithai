import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SIGNATURE_HOTSPOTS } from '../data/craft';

export interface ProjectedHotspot {
  id: string;
  x: number;
  y: number;
  visible: boolean;
}

interface SignatureCanvasProps {
  scrollProgress: number;
  activeHotspotId: string | null;
  onHotspotsProject: (points: ProjectedHotspot[]) => void;
}

function createSilverVarqTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#e8ecf0';
    ctx.fillRect(0, 0, 512, 512);
    // Subtle hammered foil creases and artisanal varq sheen
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = 18 + Math.random() * 68;
      const h = 4 + Math.random() * 20;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.28)' : 'rgba(180,188,198,0.22)';
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createCashewCrumbTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#efe2cd';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2400; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(218, 198, 165, 0.35)' : 'rgba(255, 249, 238, 0.45)';
      ctx.fillRect(x, y, 2, 2);
    }
  }
  return new THREE.CanvasTexture(canvas);
}

export const SignatureCanvas = ({
  scrollProgress,
  activeHotspotId,
  onHotspotsProject,
}: SignatureCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(scrollProgress);
  const activeHotspotRef = useRef(activeHotspotId);
  const projectCallbackRef = useRef(onHotspotsProject);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    activeHotspotRef.current = activeHotspotId;
  }, [activeHotspotId]);

  useEffect(() => {
    projectCallbackRef.current = onHotspotsProject;
  }, [onHotspotsProject]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x210409);
    scene.fog = new THREE.FogExp2(0x210409, 0.08);

    const aspect = width / height;
    const isPortrait = aspect < 0.85;
    const camera = new THREE.PerspectiveCamera(isPortrait ? 46 : 40, aspect, 0.1, 40);
    camera.position.set(0, 0.45, isPortrait ? 6.8 : 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Procedural Studio Environment Map for authentic metallic silver varq sheen
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x3a0913);
    const softBoxMat = new THREE.MeshBasicMaterial({ color: 0xffebc2, side: THREE.DoubleSide });
    const warmBoxMat = new THREE.MeshBasicMaterial({ color: 0xd88a32, side: THREE.DoubleSide });
    const sb1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), softBoxMat);
    sb1.position.set(4, 5, 4);
    sb1.lookAt(0, 0, 0);
    envScene.add(sb1);
    const sb2 = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), warmBoxMat);
    sb2.position.set(-5, -2, 3);
    sb2.lookAt(0, 0, 0);
    envScene.add(sb2);
    const envTex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();
    softBoxMat.dispose();
    warmBoxMat.dispose();

    // Lighting
    scene.add(new THREE.AmbientLight(0x6b1a28, 1.3));
    const keyLight = new THREE.SpotLight(0xfff0d1, 48, 20, Math.PI / 4, 0.6, 1.2);
    keyLight.position.set(3.5, 4.2, 4.5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd88a32, 18, 14);
    rimLight.position.set(-3.5, 1.8, -2.2);
    scene.add(rimLight);

    const lowerRim = new THREE.PointLight(0x9a2035, 14, 12);
    lowerRim.position.set(0, -3.0, 2.0);
    scene.add(lowerRim);

    // =========================================================================
    // ENORMOUS HERO HANDCRAFTED KAJU KATLI DIAMOND
    // =========================================================================
    const katliGroup = new THREE.Group();
    scene.add(katliGroup);

    const cashewTex = createCashewCrumbTexture();
    const varqTex = createSilverVarqTexture();

    // Sculpted thick beveled diamond body
    const diamondShape = new THREE.Shape();
    diamondShape.moveTo(0, 1.48);
    diamondShape.lineTo(1.06, 0);
    diamondShape.lineTo(0, -1.48);
    diamondShape.lineTo(-1.06, 0);
    diamondShape.closePath();

    const katliGeo = new THREE.ExtrudeGeometry(diamondShape, {
      depth: 0.26,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.055,
      bevelThickness: 0.045,
    });
    katliGeo.center();

    const katliMat = new THREE.MeshStandardMaterial({
      color: 0xf4e8d4,
      map: cashewTex,
      roughness: 0.42,
      metalness: 0.05,
    });

    const katliMesh = new THREE.Mesh(katliGeo, katliMat);
    katliGroup.add(katliMesh);

    // Shimmering Chandi Varq top foil sheet (slightly inset beveled diamond)
    const varqShape = new THREE.Shape();
    varqShape.moveTo(0, 1.32);
    varqShape.lineTo(0.93, 0);
    varqShape.lineTo(0, -1.32);
    varqShape.lineTo(-0.93, 0);
    varqShape.closePath();

    const varqGeo = new THREE.ExtrudeGeometry(varqShape, {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.01,
      bevelThickness: 0.008,
    });
    varqGeo.center();

    const varqMat = new THREE.MeshStandardMaterial({
      color: 0xf6f7f9,
      map: varqTex,
      roughnessMap: varqTex,
      metalness: 0.96,
      roughness: 0.16,
      envMapIntensity: 1.9,
    });

    const varqFront = new THREE.Mesh(varqGeo, varqMat);
    varqFront.position.z = 0.178;
    katliGroup.add(varqFront);

    const varqBack = new THREE.Mesh(varqGeo, varqMat);
    varqBack.position.z = -0.178;
    katliGroup.add(varqBack);

    // Subtle crowning saffron filament on top face
    const crownCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, 0.24, 0.195),
      new THREE.Vector3(0.02, 0.31, 0.205),
      new THREE.Vector3(0.22, 0.16, 0.196),
    ]);
    const crownSaffron = new THREE.Mesh(
      new THREE.TubeGeometry(crownCurve, 20, 0.014, 8, false),
      new THREE.MeshStandardMaterial({ color: 0xa91d22, roughness: 0.45 })
    );
    katliGroup.add(crownSaffron);

    // =========================================================================
    // ORBITING BOTANICAL INGREDIENTS (Saffron, Pistachios, Almonds, Silver Flakes)
    // =========================================================================
    const ingredientsGroup = new THREE.Group();
    scene.add(ingredientsGroup);

    interface OrbitItem {
      mesh: THREE.Object3D;
      basePos: THREE.Vector3;
      orbitSpeed: number;
      floatOffset: number;
    }
    const orbitItems: OrbitItem[] = [];

    // 1. Emerald Pistachio Kernels
    const pistaGeo = new THREE.SphereGeometry(0.11, 18, 18);
    pistaGeo.scale(0.68, 1.35, 0.55);
    const pistaMat = new THREE.MeshStandardMaterial({
      color: 0x6f964e,
      roughness: 0.44,
      metalness: 0.04,
    });

    const pistaCoords: [number, number, number][] = [
      [-1.55, -0.58, 0.48],
      [-1.78, 0.65, -0.35],
      [1.48, -0.78, 0.3],
      [-1.12, -1.05, -0.4],
    ];
    pistaCoords.forEach((p, idx) => {
      const m = new THREE.Mesh(pistaGeo, pistaMat);
      m.position.set(...p);
      m.rotation.set(idx * 0.8, idx * 1.1, 0.4);
      ingredientsGroup.add(m);
      orbitItems.push({
        mesh: m,
        basePos: new THREE.Vector3(...p),
        orbitSpeed: 0.45 + idx * 0.1,
        floatOffset: idx * 1.4,
      });
    });

    // 2. Roasted Mamra Almonds
    const almondGeo = new THREE.SphereGeometry(0.13, 18, 18);
    almondGeo.scale(0.65, 1.55, 0.45);
    const almondMat = new THREE.MeshStandardMaterial({
      color: 0x7a4728,
      roughness: 0.52,
      metalness: 0.06,
    });
    const almondCoords: [number, number, number][] = [
      [1.62, 0.42, -0.45],
      [-1.38, 0.92, 0.42],
      [1.24, -1.12, -0.25],
    ];
    almondCoords.forEach((p, idx) => {
      const m = new THREE.Mesh(almondGeo, almondMat);
      m.position.set(...p);
      m.rotation.set(0.5, idx * 0.9, -0.4);
      ingredientsGroup.add(m);
      orbitItems.push({
        mesh: m,
        basePos: new THREE.Vector3(...p),
        orbitSpeed: 0.38 + idx * 0.12,
        floatOffset: idx * 2.1,
      });
    });

    // 3. Crimson Pampore Saffron Strands
    const saffronStrandMat = new THREE.MeshStandardMaterial({
      color: 0xb51c22,
      emissive: 0x3b0406,
      roughness: 0.4,
    });
    const strandCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, 0, 0),
      new THREE.Vector3(-0.04, 0.08, 0.04),
      new THREE.Vector3(0.08, -0.05, -0.02),
      new THREE.Vector3(0.22, 0.06, 0.03),
    ]);
    const strandGeo = new THREE.TubeGeometry(strandCurve, 18, 0.012, 6, false);
    const strandCoords: [number, number, number][] = [
      [1.35, 0.95, 0.25],
      [1.65, 0.15, 0.55],
      [-1.45, 0.22, 0.6],
      [0.85, 1.25, -0.2],
      [-0.75, 1.15, -0.35],
    ];
    strandCoords.forEach((p, idx) => {
      const m = new THREE.Mesh(strandGeo, saffronStrandMat);
      m.position.set(...p);
      m.rotation.set(idx * 0.7, idx * 1.3, idx * 0.5);
      ingredientsGroup.add(m);
      orbitItems.push({
        mesh: m,
        basePos: new THREE.Vector3(...p),
        orbitSpeed: 0.6 + idx * 0.08,
        floatOffset: idx * 0.9,
      });
    });

    // 4. Floating Edible Silver Varq & Gold Flakes
    const flakeGeo = new THREE.PlaneGeometry(0.16, 0.11);
    const silverFlakeMat = new THREE.MeshStandardMaterial({
      color: 0xf4f6f9,
      metalness: 0.96,
      roughness: 0.14,
      side: THREE.DoubleSide,
    });
    const goldFlakeMat = new THREE.MeshStandardMaterial({
      color: 0xe5cc91,
      metalness: 0.95,
      roughness: 0.18,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 1.5 + (i % 3) * 0.35;
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        ((i % 5) - 2) * 0.52,
        Math.sin(angle) * radius * 0.55
      );
      const flake = new THREE.Mesh(flakeGeo, i % 3 === 0 ? goldFlakeMat : silverFlakeMat);
      flake.position.copy(pos);
      flake.rotation.set(i, i * 0.7, i * 0.4);
      ingredientsGroup.add(flake);
      orbitItems.push({
        mesh: flake,
        basePos: pos,
        orbitSpeed: 0.5 + (i % 4) * 0.12,
        floatOffset: i * 0.6,
      });
    }

    // Subtle ambient gold dust
    const dustCount = 240;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 9;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xe5cc91,
      size: 0.032,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Pointer & touch hover nuance
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const updateFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      pointer.tx = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onPointer = (e: PointerEvent) => {
      updateFromClient(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateFromClient(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      pointer.tx *= 0.3;
      pointer.ty *= 0.3;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    let baseZ = 5.15;
    let centerYOffset = 0;

    const applyResponsiveCamera = (w: number, h: number) => {
      const asp = w / h;
      const portrait = asp < 0.85;
      const tablet = asp >= 0.85 && asp < 1.15;
      camera.fov = portrait ? 46 : 40;
      camera.aspect = asp;
      camera.updateProjectionMatrix();
      baseZ = portrait ? 6.95 : tablet ? 5.95 : 5.15;
      centerYOffset = portrait ? 0.18 : 0;
      const groupScale = portrait ? 0.82 : tablet ? 0.92 : 1.0;
      katliGroup.scale.setScalar(groupScale);
      ingredientsGroup.scale.setScalar(groupScale);
    };
    applyResponsiveCamera(width, height);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      applyResponsiveCamera(w, h);
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    let rafId = 0;

    const animate = () => {
      const t = clock.getElapsedTime();
      const prog = progressRef.current;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      // Scroll-synchronized camera approach & slight orbital arc
      const zoomZ = baseZ - prog * (baseZ * 0.42);
      const orbitAngle = prog * 0.45 + pointer.x * 0.25;
      camera.position.x = Math.sin(orbitAngle) * zoomZ * 0.35;
      camera.position.y = 0.42 - prog * 0.25 + pointer.y * 0.22;
      camera.position.z = zoomZ;
      camera.lookAt(0, centerYOffset, 0);

      // Slowly rotating hero Kaju Katli synchronized with scroll
      katliGroup.rotation.y = t * 0.26 + prog * Math.PI * 1.15 + pointer.x * 0.25;
      katliGroup.rotation.x = -0.24 + Math.sin(t * 0.7) * 0.06 + prog * 0.38 - pointer.y * 0.14;
      katliGroup.position.y = centerYOffset + Math.sin(t * 1.1) * 0.06;

      // Orbiting ingredients bloom outward and become prominent as user scrolls
      const spread = 0.55 + Math.min(1, prog * 1.4) * 0.65;
      orbitItems.forEach((item) => {
        const angle = t * item.orbitSpeed * 0.25;
        const bx = item.basePos.x * spread;
        const bz = item.basePos.z * spread;
        item.mesh.position.x = bx * Math.cos(angle) - bz * Math.sin(angle);
        item.mesh.position.z = bx * Math.sin(angle) + bz * Math.cos(angle);
        item.mesh.position.y =
          centerYOffset + item.basePos.y * spread + Math.sin(t * 1.3 + item.floatOffset) * 0.09;
        item.mesh.rotation.x += 0.005;
        item.mesh.rotation.y += 0.008;
      });

      dust.rotation.y = t * 0.03;

      renderer.render(scene, camera);

      // Project interactive 3D hotspot anchors into 2D screen coordinates
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const pad = 28;
      const projected: ProjectedHotspot[] = SIGNATURE_HOTSPOTS.map((hs, idx) => {
        tempVec.set(hs.anchor3D[0], hs.anchor3D[1], hs.anchor3D[2]);
        // First two anchors ride on the rotating Kaju Katli; last two orbit with ingredients
        if (idx < 2) {
          tempVec.applyMatrix4(katliGroup.matrixWorld);
        } else {
          tempVec.multiplyScalar(spread * katliGroup.scale.x);
          tempVec.y += centerYOffset;
        }
        tempVec.project(camera);

        const rawX = (tempVec.x * 0.5 + 0.5) * w;
        const rawY = (-tempVec.y * 0.5 + 0.5) * h;

        return {
          id: hs.id,
          x: Math.max(pad, Math.min(w - pad, rawX)),
          y: Math.max(pad + 60, Math.min(h - pad - 120, rawY)),
          visible: tempVec.z < 1 && tempVec.z > -1,
        };
      });
      projectCallbackRef.current(projected);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointer);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      cashewTex.dispose();
      varqTex.dispose();
      envTex.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full touch-pan-y" />;
};
