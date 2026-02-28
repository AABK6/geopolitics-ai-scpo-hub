
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Materials & Shaders have been replaced with native PBR MeshPhysicalMaterials

export const initLatentSpace = () => {
  const container = document.getElementById('canvas-container');
  const loadingOverlay = document.getElementById('loading-overlay');
  const fallbackUI = document.getElementById('fallback-ui');

  // Ensure gsap is loaded globally via CDN
  const gsap = window.gsap;


  let renderer;
  try {
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Ensure transparency
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Ensure the canvas element has no background
    renderer.domElement.style.background = 'transparent';
  } catch (e) {

    console.error('WebGL Initialization Error:', e);
    if (loadingOverlay) loadingOverlay.style.display = 'none';
    if (fallbackUI) fallbackUI.style.display = 'flex';
    if (container) container.style.display = 'none';
    return null;
  }

  // Scene setup
  const scene = new THREE.Scene();
  // Removed fog to allow crisp visibility of HTML background image (chapel data center)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lowered ambient for contrast
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1c2e45, 0.5);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // High-end studio lighting for physical materials
  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  const backLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
  backLight.position.set(-15, 10, -15);
  scene.add(backLight);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 45);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.1; // Reduced from 0.8
  controls.maxDistance = 100;
  controls.minDistance = 5;
  controls.enablePan = false; // Prevent dragging scene off-screen
  controls.enableZoom = false; // Fix trackpad scrolling
  // Data Definition
  const nodesData = [

    {
      id: 'm1',
      type: 'anchor',
      title: 'The Strategic Convergence',
      bluf: 'The "End of History" illusion and the Clintonian Wager.',
      url: 'primer/module-01.html',
      position: new THREE.Vector3(-14, 8, 0), // Layer 1 (Top Left)
      color: 0x3b82f6, // Royal Blue
      size: 1.5
    },
    {
      id: 'm2',
      type: 'anchor',
      title: 'Architecture of Sovereignty',
      bluf: 'China\'s foundational rebuttal to the liberal digital order.',
      url: 'primer/module-02.html',
      position: new THREE.Vector3(-14, 0, 0), // Layer 1 (Mid Left)
      color: 0x3b82f6,
      size: 1.5
    },
    {
      id: 'm3',
      type: 'anchor',
      title: 'The Rupture',
      bluf: 'The 2013 Snowden revelations and the resulting collapse of global trust.',
      url: 'primer/module-03.html',
      position: new THREE.Vector3(-14, -8, 0), // Layer 1 (Bot Left)
      color: 0x3b82f6,
      size: 1.5
    },
    {
      id: 'm4',
      type: 'anchor',
      title: 'The Splinternet Accelerates',
      bluf: 'The balkanization of the web into competing sovereign technology stacks.',
      url: 'primer/module-04.html',
      position: new THREE.Vector3(0, 5, -2), // Layer 2 (Top Mid)
      color: 0x0ea5e9, // Bright Sky Blue
      size: 1.5
    },
    {
      id: 'm5',
      type: 'anchor',
      title: 'Industrial Sovereignty',
      bluf: 'The return of the production function: compute, energy, and hardware chokepoints.',
      url: 'primer/module-05.html',
      position: new THREE.Vector3(0, -5, 2), // Layer 2 (Bot Mid)
      color: 0x0ea5e9,
      size: 1.5
    },
    {
      id: 'm6',
      type: 'anchor',
      title: 'National Revival Through Tech',
      bluf: 'The resurgence of techno-nationalism and aggressive industrial policy.',
      url: 'primer/module-06.html',
      position: new THREE.Vector3(14, 8, 0), // Layer 3 (Top Right)
      color: 0xea580c, // Terracotta
      size: 1.5
    },
    {
      id: 'm7',
      type: 'anchor',
      title: 'New Ideological Map of AI',
      bluf: 'Tracing competing intellectual frames—from realism to techno-accelerationism.',
      url: 'primer/module-07.html',
      position: new THREE.Vector3(14, 0, 0), // Layer 3 (Mid Right)
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm8',
      type: 'anchor',
      title: 'The Collision of Frames',
      bluf: 'The core tradeoffs that will dictate the future global order.',
      url: 'primer/module-08.html',
      position: new THREE.Vector3(14, -8, 0), // Layer 3 (Bot Right)
      color: 0xea580c,
      size: 1.5
    },
    // --- Satellites ---
    {
      id: 'p1',
      type: 'satellite',
      title: 'Group 1: Thermal Sovereignty',
      bluf: 'Analyzing the geopolitical leverage of data center cooling infrastructure.',
      previewUrl: 'preview.html?project=group-1',
      directUrl: 'projects/group-1/index.html',
      position: new THREE.Vector3(-10, 11, -4), // Anchored near m1
      color: 0xf8fafc,
      size: 0.8
    },
    {
      id: 'p2',
      type: 'satellite',
      title: 'Group 2: DeepSeek Asymmetry',
      bluf: 'The strategic impact of algorithmic efficiency targeting heavily constrained computing power.',
      previewUrl: 'preview.html?project=group-2',
      directUrl: 'projects/group-2/index.html',
      position: new THREE.Vector3(-3, -10, 4), // Anchored near m5/m3
      color: 0xf8fafc,
      size: 0.8
    },
    {
      id: 'p3',
      type: 'satellite',
      title: 'Group 3: Subsea Realism',
      bluf: 'The physical chokepoints of global data transmission.',
      previewUrl: 'preview.html?project=group-3',
      directUrl: 'projects/group-3/index.html',
      position: new THREE.Vector3(-18, -2, -6), // Anchored near m2
      color: 0xf8fafc,
      size: 0.8
    },
    {
      id: 'p4',
      type: 'satellite',
      title: 'Group 4: The GPU Gap',
      bluf: 'Capital concentration and compute hoarding as national security imperatives.',
      previewUrl: 'preview.html?project=group-4',
      directUrl: 'projects/group-4/index.html',
      position: new THREE.Vector3(4, 11, 4), // Anchored near m4
      color: 0xf8fafc,
      size: 0.8
    },
    {
      id: 'p5',
      type: 'satellite',
      title: 'Group 5: Compute Diplomacy',
      bluf: 'How access to raw compute is reshaping traditional diplomatic alliances.',
      previewUrl: 'preview.html?project=group-5',
      directUrl: 'projects/group-5/index.html',
      position: new THREE.Vector3(10, 3, 5), // Anchored near m7
      color: 0xf8fafc,
      size: 0.8
    }
  ];

  const constellation = new THREE.Group();
  scene.add(constellation);

  const meshes = [];
  const manualLabels = [];
  const uiLayer = document.getElementById('ui-layer');

  // Replace chaotic shaders with premium architectural materials
  nodesData.forEach(data => {
    const nodeSize = data.type === 'anchor' ? data.size * 0.55 : data.size * 0.45;
    // Perfect, high-resolution spheres instead of low-poly icosahedrons
    const geometry = new THREE.SphereGeometry(nodeSize, 64, 64);
    let material;

    if (data.type === 'anchor') {
      if (data.id.match(/m[1-4]/)) {
        // Architecture & Security nodes -> Polished Cobalt/Cyan
        material = new THREE.MeshPhysicalMaterial({
          color: 0x0284c7, // Deep Cyan base
          metalness: 0.6,
          roughness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          emissive: 0x0369a1,
          emissiveIntensity: 0.3
        });
      } else {
        // Industry & Theory nodes -> Polished Terracotta / Copper
        material = new THREE.MeshPhysicalMaterial({
          color: 0xea580c,
          metalness: 0.6,
          roughness: 0.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.15,
          emissive: 0x9a3412,
          emissiveIntensity: 0.2
        });
      }
    } else {
      // Satellites -> Matte pearl finish
      material = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.3,
        roughness: 0.4
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(data.position);
    mesh.userData = { ...data, connectedLines: [] };

    constellation.add(mesh);
    meshes.push(mesh);

    // Typography Labels
    if (data.type === 'anchor') {
      const div = document.createElement('div');
      div.className = 'node-label';
      div.textContent = '0' + data.id.replace('m', '');
      div.style.color = 'rgba(255, 255, 255, 0.9)'; // Crisper white instead of pure blue/orange
      div.style.fontFamily = 'Inter, -apple-system, sans-serif';
      div.style.fontSize = '2.2rem';
      div.style.fontWeight = '300'; // Thin, elegant weight
      div.style.opacity = '0.7';
      div.style.letterSpacing = '-0.04em';
      div.style.position = 'absolute';
      div.style.transform = 'translate(-50%, -50%)';
      div.style.pointerEvents = 'none';

      if (uiLayer) {
        uiLayer.appendChild(div);
      }
      manualLabels.push({ element: div, mesh: mesh });
    }

  });


  // Pipeline Connection Logic (Solid Cylinders instead of 1px ghostly Lines)
  const createPipeline = (pt1, pt2, isAnchor) => {
    const distance = pt1.distanceTo(pt2);
    // Extremely thin "fiber optic" traces, not thick plastic pipes
    const geometry = new THREE.CylinderGeometry(0.02, 0.02, distance, 8);
    // Rotate cylinder to point from pt1 to pt2
    geometry.translate(0, distance / 2, 0);
    geometry.rotateX(Math.PI / 2);

    // High-end glass/optical material for data throughput
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: isAnchor ? 0.6 : 0.2,
      transparent: true,
      roughness: 0.1,
      clearcoat: 1.0,
      emissive: 0xffffff,
      emissiveIntensity: isAnchor ? 0.4 : 0.1
    });

    const cylinder = new THREE.Mesh(geometry, mat);
    cylinder.position.copy(pt1);
    cylinder.lookAt(pt2);
    return cylinder;
  };

  // Connect satellites to nearest anchor via smaller pipes
  nodesData.filter(n => n.type === 'satellite').forEach(sat => {
    let closestAnchorMesh = null;
    let minDistance = Infinity;

    meshes.filter(m => m.userData.type === 'anchor').forEach(anchorMesh => {
      const dist = sat.position.distanceTo(anchorMesh.position);
      if (dist < minDistance) {
        minDistance = dist;
        closestAnchorMesh = anchorMesh;
      }
    });

    if (closestAnchorMesh) {
      const satMesh = meshes.find(m => m.userData.id === sat.id);
      const pipe = createPipeline(satMesh.position, closestAnchorMesh.position, false);
      constellation.add(pipe);

      // Store references for interaction rip-effects
      if (satMesh) satMesh.userData.connectedLines.push(pipe);
      closestAnchorMesh.userData.connectedLines.push(pipe);
    }
  });

  // Connect anchors Sequentially as heavily rigid Neural Net structural links
  const anchorMeshes = meshes.filter(m => m.userData.type === 'anchor');
  // Layer 1 -> Layer 2
  for (let i = 0; i < 3; i++) {
    for (let j = 3; j < 5; j++) {
      const pipe = createPipeline(anchorMeshes[i].position, anchorMeshes[j].position, true);
      constellation.add(pipe);
      anchorMeshes[i].userData.connectedLines.push(pipe);
      anchorMeshes[j].userData.connectedLines.push(pipe);
    }
  }
  // Layer 2 -> Layer 3
  for (let j = 3; j < 5; j++) {
    for (let k = 5; k < 8; k++) {
      const pipe = createPipeline(anchorMeshes[j].position, anchorMeshes[k].position, true);
      constellation.add(pipe);
      anchorMeshes[j].userData.connectedLines.push(pipe);
      anchorMeshes[k].userData.connectedLines.push(pipe);
    }
  }


  // Raycaster for interactions
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);
  let hoveredNode = null;
  let activeNode = null;

  // UI Elements
  const briefingCard = document.getElementById('briefing-card');
  const cardType = document.getElementById('card-type');
  const cardTitle = document.getElementById('card-title');
  const cardBluf = document.getElementById('card-bluf');

  const onMouseMove = (event) => {
    if (event.isPrimary === false) return; // Ignore multi-touch
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const onClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let clickedNode = intersects[0].object;
      if (!clickedNode.userData || !clickedNode.userData.type) {
        clickedNode = clickedNode.parent;
      }
      if (clickedNode && clickedNode.userData) {
        const data = clickedNode.userData;
        const targetUrl = data.type === 'anchor' ? data.url : data.directUrl;
        if (targetUrl) {
          window.location.href = targetUrl; // Direct navigation on click
        }
      }
    }
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onClick);

  // Animation Loop
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();

    const elapsedTime = clock.getElapsedTime();

    // Slow constellation drift
    if (!hoveredNode) {
      constellation.rotation.y += 0.00008;
      constellation.rotation.x += 0.00002;
    }

    meshes.forEach(mesh => {
      // Common slow rotation
      mesh.rotation.y += 0.0008;

      // Pulse effect logic
      const pulseSpeed = (mesh.userData.type === 'anchor') ? 2 : 1;
      const pulseAmount = (mesh.userData.type === 'anchor') ? 0.025 : 0.012;
      const scaleBase = (hoveredNode === mesh) ? 1.2 : 1.0;
      const scale = scaleBase + Math.sin(elapsedTime * pulseSpeed + mesh.position.x) * pulseAmount;
      mesh.scale.set(scale, scale, scale);
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
        // Reset previous hovered lines
        if (hoveredNode && hoveredNode.userData.connectedLines) {
          hoveredNode.userData.connectedLines.forEach(line => {
            gsap.to(line.material, { opacity: 0.1, duration: 0.5 });
            gsap.to(line.material.color, { r: 1, g: 1, b: 1, duration: 0.5 });
          });
        }

        if (hoveredNode) {
          document.body.style.cursor = 'default';
        }

        hoveredNode = object;
        document.body.style.cursor = 'pointer';

        // Update Toolkit Info and Show
        const data = hoveredNode.userData;
        cardType.innerHTML = data.type === 'anchor' ? 'Theoretical Foundation' : 'Intelligence Brief';
        cardType.style.color = data.type === 'anchor' ? '#ea580c' : '#3b82f6';
        cardTitle.textContent = data.title;
        cardBluf.textContent = data.bluf;

        gsap.killTweensOf(briefingCard);
        // Uses xPercent and yPercent to handle CSS translate(-50%, -100%) natively within GSAP
        gsap.fromTo(briefingCard,
          { autoAlpha: 0, scale: 0.95, y: 10, xPercent: -50, yPercent: -100 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );

        // Ripple Effect on Connected Lines
        if (hoveredNode.userData.connectedLines) {
          const nodeColor = new THREE.Color(hoveredNode.userData.color);
          hoveredNode.userData.connectedLines.forEach((line, index) => {
            gsap.to(line.material, {
              opacity: 0.8,
              duration: 0.4,
              delay: index * 0.05,
              repeat: 1,
              yoyo: true,
              ease: "power2.out"
            });
            gsap.to(line.material.color, {
              r: nodeColor.r, g: nodeColor.g, b: nodeColor.b,
              duration: 0.4,
              delay: index * 0.05
            });
          });
        }
      }
    } else {
      if (hoveredNode) {
        // Reset lines
        if (hoveredNode.userData.connectedLines) {
          hoveredNode.userData.connectedLines.forEach(line => {
            gsap.to(line.material, { opacity: 0.1, duration: 0.5 });
            gsap.to(line.material.color, { r: 1, g: 1, b: 1, duration: 0.5 });
          });
        }

        gsap.to(hoveredNode.scale, {
          x: hoveredNode.userData.type === 'anchor' ? 1 : 1,
          y: hoveredNode.userData.type === 'anchor' ? 1 : 1,
          z: hoveredNode.userData.type === 'anchor' ? 1 : 1,
          duration: 0.5
        });
        hoveredNode = null;
        document.body.style.cursor = 'default';

        // Hide Tooltip
        gsap.killTweensOf(briefingCard);
        gsap.to(briefingCard, { autoAlpha: 0, scale: 0.95, y: 5, duration: 0.2, ease: "power2.in" });
      }
    }

    if (hoveredNode) {
      const vector = new THREE.Vector3();
      hoveredNode.getWorldPosition(vector);
      const offset = hoveredNode.userData.type === 'anchor' ? 0.8 : 0.6;
      vector.y += offset;
      vector.project(camera);

      const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
      const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

      if (vector.z > 1.0) {
        briefingCard.style.visibility = 'hidden';
      } else {
        briefingCard.style.left = `${x}px`;
        briefingCard.style.top = `${y}px`;
        // Removed manual style.transform entirely so GSAP can handle scale/y offsets natively
      }
    }

    // Update custom 2D labels
    manualLabels.forEach(labelObj => {
      const { element, mesh } = labelObj;
      const vector = new THREE.Vector3();
      mesh.getWorldPosition(vector);

      const dist = camera.position.distanceTo(vector);
      vector.project(camera);

      if (vector.z > 1.0) {
        element.style.display = 'none';
        return;
      }
      element.style.display = 'block';

      const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
      const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

      // Exaggerated depth scaling
      const scale = Math.max(0.2, 1 - (dist - 15) / 30);
      const targetOpacity = Math.max(0.1, 0.65 - (dist - 20) / 40);

      element.style.transform = `translate(-50%, -150%) scale(${scale})`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = targetOpacity.toFixed(2);
      element.style.zIndex = Math.round((100 - dist) * 10);
    });

    controls.update();
    renderer.render(scene, camera);

  };

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Remove loading overlay
  if (loadingOverlay) {
    gsap.to(loadingOverlay, { opacity: 0, duration: 1, delay: 0.5, onComplete: () => loadingOverlay.remove() });
  }

  animate();

  return { camera, controls, scene, renderer };
};

// document.addEventListener('DOMContentLoaded', initLatentSpace);
