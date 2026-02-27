import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const initLatentSpace = () => {
  const container = document.getElementById('canvas-container');
  const loadingOverlay = document.getElementById('loading-overlay');
  const fallbackUI = document.getElementById('fallback-ui');

  // Ensure gsap is loaded globally via CDN
  const gsap = window.gsap;

  let renderer;
  try {
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
  } catch (e) {
    console.error('WebGL Initialization Error:', e);
    if (loadingOverlay) loadingOverlay.style.display = 'none';
    if (fallbackUI) fallbackUI.style.display = 'flex';
    if (container) container.style.display = 'none';
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.025);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 25);

  // Post-Processing (Bloom)
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // strength
    0.4, // radius
    0.1  // threshold
  );

  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
  controls.maxDistance = 50;
  controls.minDistance = 5;
  controls.enablePan = false;

  // Data Definition
  const nodesData = [
    {
      id: 'm1',
      type: 'anchor',
      title: 'The Strategic Convergence',
      bluf: 'The "End of History" illusion and the Clintonian Wager: How early internet optimism assumed the non-rival nature of digital ideas would inevitably dissolve borders.',
      url: 'primer/module-01.html',
      position: new THREE.Vector3(-12, 4, 0),
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm2',
      type: 'anchor',
      title: 'Architecture of Sovereignty',
      bluf: 'China\'s foundational rebuttal to the liberal digital order: the construction of a "Porous but Policed" internet that imports capital while filtering dissent.',
      url: 'primer/module-02.html',
      position: new THREE.Vector3(-8, -2, -4),
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm3',
      type: 'anchor',
      title: 'The Rupture',
      bluf: 'The 2013 Snowden revelations and the resulting collapse of global trust, triggering a race for defensive sovereignty over critical infrastructure.',
      url: 'primer/module-03.html',
      position: new THREE.Vector3(-4, 3, 5),
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm4',
      type: 'anchor',
      title: 'The Splinternet Accelerates',
      bluf: 'The balkanization of the web into competing, deeply sovereign technological stacks and the end of globalization as the default state.',
      url: 'primer/module-04.html',
      position: new THREE.Vector3(0, -4, 0),
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm5',
      type: 'anchor',
      title: 'Industrial Sovereignty',
      bluf: 'The return of the production function: how frontier AI relies on rival, physical inputs—compute, energy, data, and human talent.',
      url: 'primer/module-05.html',
      position: new THREE.Vector3(4, 5, -3),
      color: 0x15803d,
      size: 1.5
    },
    {
      id: 'm6',
      type: 'anchor',
      title: 'National Revival Through Tech',
      bluf: 'The resurgence of techno-nationalism and industrial policy, as states race to secure domestic capability while denying adversaries access to critical chokepoints.',
      url: 'primer/module-06.html',
      position: new THREE.Vector3(8, 0, 4),
      color: 0x15803d,
      size: 1.5
    },
    {
      id: 'm7',
      type: 'anchor',
      title: 'New Ideological Map of AI',
      bluf: 'Tracing the competing intellectual frames—from state realism to techno-accelerationism—that are actively defining what constitutes "rational" policy.',
      url: 'primer/module-07.html',
      position: new THREE.Vector3(12, -4, 0),
      color: 0x15803d,
      size: 1.5
    },
    {
      id: 'm8',
      type: 'anchor',
      title: 'The Collision of Frames',
      bluf: 'The core tradeoffs that will dictate the future global order: diffusion vs. enclosure, growth vs. legitimacy, and state control vs. corporate power.',
      url: 'primer/module-08.html',
      position: new THREE.Vector3(16, 2, -4),
      color: 0x15803d,
      size: 1.5
    },
    {
      id: 'p1',
      type: 'satellite',
      title: 'Group 1: Thermal Sovereignty',
      bluf: 'Analyzing the geopolitical leverage of data center cooling infrastructure.',
      previewUrl: 'preview.html?project=group-1',
      directUrl: 'projects/group-1/index.html',
      position: new THREE.Vector3(5, 8, -6),
      color: 0x38bdf8,
      size: 0.8
    },
    {
      id: 'p2',
      type: 'satellite',
      title: 'Group 2: DeepSeek Asymmetry',
      bluf: 'The strategic impact of algorithmic efficiency in resource-constrained environments.',
      previewUrl: 'preview.html?project=group-2',
      directUrl: 'projects/group-2/index.html',
      position: new THREE.Vector3(9, -2, 7),
      color: 0x38bdf8,
      size: 0.8
    },
    {
      id: 'p3',
      type: 'satellite',
      title: 'Group 3: Subsea Realism',
      bluf: 'The physical chokepoints of global data transmission.',
      previewUrl: 'preview.html?project=group-3',
      directUrl: 'projects/group-3/index.html',
      position: new THREE.Vector3(-9, -5, -6),
      color: 0x38bdf8,
      size: 0.8
    },
    {
      id: 'p4',
      type: 'satellite',
      title: 'Group 4: The GPU Gap',
      bluf: 'Capital concentration and compute hoarding as national security imperatives.',
      previewUrl: 'preview.html?project=group-4',
      directUrl: 'projects/group-4/index.html',
      position: new THREE.Vector3(-3, 6, 7),
      color: 0x38bdf8,
      size: 0.8
    },
    {
      id: 'p5',
      type: 'satellite',
      title: 'Group 5: Compute Diplomacy',
      bluf: 'How access to raw compute is reshaping traditional diplomatic alliances.',
      previewUrl: 'preview.html?project=group-5',
      directUrl: 'projects/group-5/index.html',
      position: new THREE.Vector3(13, -7, 2),
      color: 0x38bdf8,
      size: 0.8
    }
  ];

  const constellation = new THREE.Group();
  scene.add(constellation);

  const meshes = [];

  // Materials
  const anchorMat = new THREE.MeshBasicMaterial({ color: 0xea580c });
  const satelliteMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  // Create Nodes
  nodesData.forEach(data => {
    // Inner core
    const geometry = new THREE.IcosahedronGeometry(data.size, 2);
    const material = data.type === 'anchor' ? anchorMat.clone() : satelliteMat.clone();
    material.color.setHex(data.color);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(data.position);
    mesh.userData = { ...data };
    
    constellation.add(mesh);
    meshes.push(mesh);

    // Outer Glow / Wireframe
    const wireGeo = new THREE.IcosahedronGeometry(data.size * 1.15, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: data.color,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mesh.add(wireMesh);
    mesh.userData.wireMesh = wireMesh;
  });

  // Data Dust (Particles)
  const particlesGeo = new THREE.BufferGeometry();
  const particlesCount = 2000;
  const posArray = new Float32Array(particlesCount * 3);
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 60;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
  });
  const particleMesh = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleMesh);

  // Add Edges
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.05
  });

  nodesData.filter(n => n.type === 'satellite').forEach(sat => {
    let closestAnchor = null;
    let minDistance = Infinity;
    nodesData.filter(n => n.type === 'anchor').forEach(anchor => {
      const dist = sat.position.distanceTo(anchor.position);
      if (dist < minDistance) {
        minDistance = dist;
        closestAnchor = anchor;
      }
    });

    if (closestAnchor) {
      const points = [sat.position, closestAnchor.position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      constellation.add(line);
    }
  });

  const anchors = nodesData.filter(n => n.type === 'anchor');
  if (anchors.length > 1) {
    const points = anchors.map(a => a.position);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);
    constellation.add(line);
  }

  // Raycaster for interactions
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredNode = null;
  
  // UI Elements
  const briefingCard = document.getElementById('briefing-card');
  const cardType = document.getElementById('card-type');
  const cardTitle = document.getElementById('card-title');
  const cardBluf = document.getElementById('card-bluf');
  const cardActions = document.getElementById('card-actions');

  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener('mousemove', onMouseMove);

  // Animation Loop
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Subtle Particle drift
    particleMesh.rotation.y = elapsedTime * 0.02;

    if (!hoveredNode) {
      constellation.rotation.y += 0.001;
      constellation.rotation.x += 0.0005;
    }

    meshes.forEach(mesh => {
      // Rotation
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;
      mesh.userData.wireMesh.rotation.y -= 0.015;

      // Pulse anchors
      if (mesh.userData.type === 'anchor') {
        const scale = 1 + Math.sin(elapsedTime * 3 + mesh.position.x) * 0.08;
        mesh.scale.set(scale, scale, scale);
      }
    });

    // Raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let object = intersects[0].object;
      if (!object.userData || !object.userData.type) {
        object = object.parent;
      }
      
      if (hoveredNode !== object) {
        // Reset previous hovered
        if (hoveredNode) {
          gsap.to(hoveredNode.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
          document.body.style.cursor = 'default';
        }
        
        hoveredNode = object;
        document.body.style.cursor = 'pointer';
        controls.autoRotate = false;
        
        // Pop effect
        gsap.to(hoveredNode.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.5, ease: "back.out(1.7)" });
        
        // Update UI
        const data = hoveredNode.userData;
        cardType.innerHTML = data.type === 'anchor' ? 'Theoretical Foundation' : 'Intelligence Brief';
        cardType.style.color = data.type === 'anchor' ? '#ea580c' : '#38bdf8';
        cardTitle.textContent = data.title;
        cardBluf.textContent = data.bluf;
        
        // Build actions
        cardActions.innerHTML = '';
        if (data.type === 'anchor') {
          cardActions.innerHTML = `<a href="${data.url}" class="card-action">Read Briefing</a>`;
        } else {
          cardActions.innerHTML = `
            <a href="${data.previewUrl}" class="card-action">Preview</a>
            <a href="${data.directUrl}" class="card-action secondary">Direct Link ↗</a>
          `;
        }
        
        // Show Card
        gsap.to(briefingCard, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" });
      }
    } else {
      if (hoveredNode) {
        gsap.to(hoveredNode.scale, { 
          x: hoveredNode.userData.type === 'anchor' ? 1 : 1, 
          y: hoveredNode.userData.type === 'anchor' ? 1 : 1, 
          z: hoveredNode.userData.type === 'anchor' ? 1 : 1, 
          duration: 0.5 
        });
        hoveredNode = null;
        document.body.style.cursor = 'default';
        controls.autoRotate = true;
        
        // Hide Card
        gsap.to(briefingCard, { autoAlpha: 0, x: 50, duration: 0.4, ease: "power2.in" });
      }
    }

    controls.update();
    composer.render();
  };

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  // Remove loading overlay
  if (loadingOverlay) {
    gsap.to(loadingOverlay, { opacity: 0, duration: 1, delay: 0.5, onComplete: () => loadingOverlay.remove() });
  }

  animate();
};

document.addEventListener('DOMContentLoaded', initLatentSpace);
