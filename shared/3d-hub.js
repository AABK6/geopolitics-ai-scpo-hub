
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Materials & Shaders have been replaced with native PBR MeshPhysicalMaterials

export const initLatentSpace = () => {
  const container = document.getElementById('canvas-container');
  const loadingOverlay = document.getElementById('loading-overlay');
  const fallbackUI = document.getElementById('fallback-ui');

  const isMobile = window.innerWidth <= 768;

  // Ensure gsap is loaded globally via CDN
  const gsap = window.gsap;


  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
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
  // Use a FOV that scales responsively (handled better with OrbitControls on zoom, but base FOV helps)
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 40); // Pull slightly closer since network was scaled down

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5; // Slightly faster to show off the 3D volume
  controls.maxDistance = 60; // Pull limits in
  controls.minDistance = 20;
  controls.enablePan = true; // allow some panning flexibility
  controls.enableZoom = false; // Disable scroll wheel zooming to prevent trapping page scroll

  if (isMobile) {
    // Make 1-finger swipe directly pan the camera, aligning with typical vertical scroll expectations
    controls.touches = {
      ONE: THREE.TOUCH.PAN,
      TWO: THREE.TOUCH.DOLLY_ROTATE
    };
  }
  // Data Definition

  // Rigid Layer Strategy
  const networkStructure = [
    {
      x: -10, // Scaled in from -16
      nodes: [
        { id: 'm1', type: 'anchor', title: 'The Utopian Dawn', shortLabel: '01', bluf: 'The "End of History" illusion and the Clintonian wager that digital openness would dissolve borders.', url: 'primer/module-01.html', color: 0x5e84c6, size: 1.5, isReal: true },
        { id: 'd1', isReal: false },
        { id: 'm2', type: 'anchor', title: 'The Rebuttal', shortLabel: '02', bluf: 'China\'s foundational rebuttal and the architecture of sovereignty built against liberal internet universalism.', url: 'primer/module-02.html', color: 0x5e84c6, size: 1.5, isReal: true },
        { id: 'd2', isReal: false },
        { id: 'm3', type: 'anchor', title: 'The Rupture', shortLabel: '03', bluf: 'The 2013 Snowden revelations and the collapse of trust that turned infrastructure into a sovereignty problem.', url: 'primer/module-03.html', color: 0x5e84c6, size: 1.5, isReal: true },
      ]
    },
    {
      x: -3.5, // Scaled in from -5
      nodes: [
        { id: 'd3', isReal: false },
        { id: 'm4', type: 'anchor', title: 'The Splinternet Accelerates', shortLabel: '04', bluf: 'The balkanization of the web into competing sovereign stacks and the end of seamless digital globalization.', url: 'primer/module-04.html', color: 0x5e84c6, size: 1.5, isReal: true },
        { id: 'p1', type: 'research', title: 'Group 1', shortLabel: 'G1', bluf: 'Topic forthcoming. Student investigation in progress.', directUrl: 'projects/group-1/index.html', color: 0x7fa26d, size: 1.05, isReal: true },
        { id: 'p3', type: 'research', title: 'Group 3', shortLabel: 'G3', bluf: 'Topic forthcoming. Student investigation in progress.', directUrl: 'projects/group-3/index.html', color: 0x7fa26d, size: 1.05, isReal: true },
        { id: 'd4', isReal: false },
        { id: 'p2', type: 'research', title: 'Group 2', shortLabel: 'G2', bluf: 'Topic forthcoming. Student investigation in progress.', directUrl: 'projects/group-2/index.html', color: 0x7fa26d, size: 1.05, isReal: true }
      ]
    },
    {
      x: 3.5, // Scaled in from 6
      nodes: [
        { id: 'm5', type: 'anchor', title: 'Industrial Sovereignty', shortLabel: '05', bluf: 'The return of the production function: compute, energy, hardware, and supply-chain chokepoints.', url: 'primer/module-05.html', color: 0xc56e42, size: 1.5, isReal: true },
        { id: 'd5', isReal: false },
        { id: 'm6', type: 'anchor', title: 'National Revival Through Tech', shortLabel: '06', bluf: 'The resurgence of techno-nationalism and aggressive industrial policy as instruments of state power.', url: 'primer/module-06.html', color: 0xc56e42, size: 1.5, isReal: true },
        { id: 'd6', isReal: false },
        { id: 'p5', type: 'research', title: 'Group 5', shortLabel: 'G5', bluf: 'Topic forthcoming. Student investigation in progress.', directUrl: 'projects/group-5/index.html', color: 0x7fa26d, size: 1.05, isReal: true },
        { id: 'd7', isReal: false }
      ]
    },
    {
      x: 10, // Scaled in from 17
      nodes: [
        { id: 'p4', type: 'research', title: 'Group 4', shortLabel: 'G4', bluf: 'Topic forthcoming. Student investigation in progress.', directUrl: 'projects/group-4/index.html', color: 0x7fa26d, size: 1.05, isReal: true },
        { id: 'd8', isReal: false },
        { id: 'm7', type: 'anchor', title: 'New Ideological Map of AI', shortLabel: '07', bluf: 'Tracing competing intellectual frames, from realism to techno-accelerationism, that now shape policy imagination.', url: 'primer/module-07.html', color: 0xc56e42, size: 1.5, isReal: true },
        { id: 'd9', isReal: false },
        { id: 'm8', type: 'anchor', title: 'The Collision of Frames', shortLabel: '08', bluf: 'The core tradeoffs that will dictate the future global order: openness, enclosure, legitimacy, and power.', url: 'primer/module-08.html', color: 0xc56e42, size: 1.5, isReal: true }
      ]
    }
  ];

  const nodesData = [];
  const layerStructure = [];

  networkStructure.forEach((layer, layerIndex) => {
    const nodeCount = layer.nodes.length;
    const yRange = isMobile ? 12 : 16; // Tighter vertical spread on mobile
    const currentLayerMeshesData = [];

    layer.nodes.forEach((nData, i) => {
      // Stagger Z slightly for a very subtle 3D volume feel without breaking the planar look
      const z = (i % 2 === 0 ? 1.5 : -1.5) + (layerIndex % 2 === 0 ? 0 : 1); // Reduced Z spread
      const internalSpread = (yRange / 2) - (i * (yRange / (nodeCount - 1)));

      // Horizontal mode: Layers shift left/right (-10 to 10), nodes stack vertically
      // Mobile mode: Layers shift top/down (+9 to -9), nodes stack horizontally
      const px = isMobile ? internalSpread * 0.82 : layer.x;
      const py = isMobile ? -layer.x * 0.8 : internalSpread;

      const nodeObj = {
        ...nData,
        layer: layerIndex,
        position: new THREE.Vector3(px, py, z),
      };

      if (!nodeObj.isReal) {
        nodeObj.type = 'dummy';
        nodeObj.size = 0.5;
        nodeObj.color = 0x94a3b8;
      }

      nodesData.push(nodeObj);
      currentLayerMeshesData.push(nodeObj);
    });
    layerStructure.push(currentLayerMeshesData);
  });

  const constellation = new THREE.Group();
  scene.add(constellation);

  const meshes = [];
  const manualLabels = [];
  const uiLayer = document.getElementById('ui-layer');

  // Replace chaotic shaders with premium architectural materials
  nodesData.forEach(data => {
    const nodeSize = data.type === 'anchor' ? data.size * 0.55 : (data.type === 'research' ? data.size * 0.58 : data.size * 0.55);
    const geometry = new THREE.SphereGeometry(nodeSize, 32, 32);
    let material;

    if (data.type === 'dummy') {
      material = new THREE.MeshPhysicalMaterial({
        color: 0xcbd5e1, // Brighter, slate-grey base so it reads against the dark background
        metalness: 0.1,
        roughness: 0.4, // Less rough so it catches some specular highlights from the lights
        transmission: 0.4, // Less glass-like, more solid frosted
        opacity: 0.8, // Drastically increased from 0.05
        transparent: true,
        emissive: 0x1e293b, // Glow slightly so it is always visible
        emissiveIntensity: 0.3
      });
    } else if (data.type === 'anchor') {
      if (data.id.match(/m[1-4]/)) {
        material = new THREE.MeshPhysicalMaterial({
          color: 0x5e84c6,
          metalness: 0.48,
          roughness: 0.16,
          clearcoat: 0.9,
          emissive: 0x1d3b68,
          emissiveIntensity: 0.2
        });
      } else {
        material = new THREE.MeshPhysicalMaterial({
          color: 0xc56e42,
          metalness: 0.5,
          roughness: 0.14,
          clearcoat: 0.9,
          emissive: 0x6a331a,
          emissiveIntensity: 0.18
        });
      }
    } else {
      material = new THREE.MeshPhysicalMaterial({
        color: 0x7fa26d,
        metalness: 0.28,
        roughness: 0.34,
        clearcoat: 0.7,
        emissive: 0x243820,
        emissiveIntensity: 0.16
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(data.position);
    mesh.userData = { ...data, connectedLines: [] };

    constellation.add(mesh);
    meshes.push(mesh);

    // Typography Labels
    if (data.type === 'anchor' || data.type === 'research') {
      const isAnchor = data.type === 'anchor';
      const div = document.createElement('div');
      div.className = 'node-label';

      if (isAnchor) {
        div.innerHTML = isMobile
          ? `<span>${data.shortLabel}</span>`
          : `<span style="font-weight: 700; opacity: 0.56; margin-right: 0.36rem;">${data.shortLabel}</span><span>${data.title}</span>`;
      } else {
        div.innerHTML = isMobile
          ? `<span>${data.shortLabel}</span>`
          : `<span style="font-weight: 700; opacity: 0.56; margin-right: 0.36rem;">${data.shortLabel}</span><span>${data.title}</span>`;
      }

      div.style.color = '#f6efe5';
      div.style.fontFamily = 'Inter, -apple-system, sans-serif';
      div.style.fontSize = isMobile ? '0.62rem' : (isAnchor ? '0.74rem' : '0.68rem');
      div.style.fontWeight = '600';
      div.style.letterSpacing = isMobile ? '0.12em' : '0.03em';
      div.style.lineHeight = '1.18';
      div.style.whiteSpace = isMobile ? 'nowrap' : 'normal';
      div.style.maxWidth = isMobile ? 'none' : (isAnchor ? '144px' : '124px');
      div.style.textAlign = 'center';

      div.style.background = isAnchor ? 'rgba(19, 15, 12, 0.62)' : 'rgba(39, 53, 33, 0.82)';
      div.style.border = isAnchor ? '1px solid rgba(243, 236, 224, 0.16)' : '1px solid rgba(188, 214, 178, 0.22)';
      div.style.backdropFilter = 'blur(6px)';
      div.style.WebkitBackdropFilter = 'blur(6px)';
      div.style.padding = isMobile ? '0.22rem 0.48rem' : (isAnchor ? '0.28rem 0.78rem' : '0.24rem 0.68rem');
      div.style.borderRadius = '9999px';
      div.style.boxShadow = '0 10px 22px rgba(0, 0, 0, 0.22)';

      div.style.opacity = '1';
      div.style.position = 'absolute';
      div.style.pointerEvents = 'none';

      if (uiLayer) {
        uiLayer.appendChild(div);
      }
      manualLabels.push({ element: div, mesh: mesh });
    }

  });


  // Pipeline Connection Logic (Dense Academic Web)
  const createPipeline = (pt1, pt2) => {
    const distance = pt1.distanceTo(pt2);
    // Slightly thicker connecting lines
    const geometry = new THREE.CylinderGeometry(0.025, 0.025, distance, 6);
    geometry.translate(0, distance / 2, 0);
    geometry.rotateX(Math.PI / 2);

    // Highly transparent glass lines for the passive state
    const mat = new THREE.MeshBasicMaterial({
      color: 0xcbd5e1, // Match dummy node color
      opacity: 0.35, // Increased from 0.25 to make the network clearly visible
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const cylinder = new THREE.Mesh(geometry, mat);
    cylinder.position.copy(pt1);
    cylinder.lookAt(pt2);
    return cylinder;
  };

  // Build the dense network by connecting every node in Layer N to every node in Layer N+1
  for (let l = 0; l < layerStructure.length - 1; l++) {
    const layerA = layerStructure[l];
    const layerB = layerStructure[l + 1];

    layerA.forEach(nodeAData => {
      const meshA = meshes.find(m => m.userData.id === nodeAData.id);
      layerB.forEach(nodeBData => {
        const meshB = meshes.find(m => m.userData.id === nodeBData.id);

        const pipe = createPipeline(meshA.position, meshB.position);
        constellation.add(pipe);

        // We track connections for REAL nodes so we can highlight them on hover
        if (nodeAData.isReal || nodeBData.isReal) {
          if (nodeAData.isReal) meshA.userData.connectedLines.push(pipe);
          if (nodeBData.isReal) meshB.userData.connectedLines.push(pipe);
        }
      });
    });
  }


  // Raycaster for interactions
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);
  let hoveredNode = null;
  let activeMobileNode = null;

  // UI Elements
  const briefingCard = document.getElementById('briefing-card');
  const cardBluf = document.getElementById('card-bluf');
  const cardTitle = document.getElementById('card-title');
  const cardType = document.getElementById('card-type');
  const cardStatus = document.getElementById('card-status');
  const mobileEnterBtn = document.getElementById('mobile-enter-btn');

  const describeNode = (data) => ({
    typeLabel: data.type === 'research' ? 'Research node' : 'Module',
    shortCode: data.shortLabel || '',
    actionLabel: data.type === 'research' ? 'Open Research' : 'Open Module'
  });

  const updateBriefingCard = (data) => {
    if (!data) return;
    const meta = describeNode(data);
    if (cardTitle) cardTitle.textContent = data.title;
    if (cardType) cardType.textContent = meta.typeLabel;
    if (cardStatus) cardStatus.textContent = meta.shortCode;
    if (cardBluf) cardBluf.textContent = data.bluf;
    if (mobileEnterBtn) {
      mobileEnterBtn.textContent = meta.actionLabel;
      mobileEnterBtn.href = data.type === 'anchor' ? data.url : data.directUrl;
    }
  };

  const onMouseMove = (event) => {
    if (event.isPrimary === false) return; // Ignore multi-touch
    if (isMobile) return; // Ignore hover physics on mobile
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const onClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes, true);

    const unzoomMobile = () => {
      activeMobileNode = null;
      hoveredNode = null;

      gsap.killTweensOf(briefingCard);
      gsap.to(briefingCard, { autoAlpha: 0, scale: 0.95, duration: 0.2, ease: "power2.out" });

      gsap.to(camera.position, {
        x: 0,
        y: 4,
        z: 42,
        duration: 1.0,
        ease: "power2.out"
      });
      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.0,
        ease: "power2.out"
      });
    };

    if (intersects.length > 0) {
      let clickedNode = intersects[0].object;
      if (!clickedNode.userData || !clickedNode.userData.type) {
        clickedNode = clickedNode.parent;
      }
      if (clickedNode && clickedNode.userData && clickedNode.userData.isReal) {
        const data = clickedNode.userData;

        if (isMobile) {
          if (activeMobileNode !== clickedNode) {
            activeMobileNode = clickedNode;

            // Show floating card directly below node using GSAP
            hoveredNode = clickedNode;
            updateBriefingCard(data);

            gsap.killTweensOf(briefingCard);
            gsap.fromTo(briefingCard,
              { autoAlpha: 0, scale: 0.95, y: -10, xPercent: -50, yPercent: 0 },
              { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );

            // Pan to center the node and its pill
            gsap.to(camera.position, {
              x: clickedNode.position.x,
              y: clickedNode.position.y - 1.5, // Slightly lower the camera to center BOTH node and pill
              z: 28, // Less intense zoom on mobile so pill fits on screen
              duration: 1.2,
              ease: "power2.out"
            });
            gsap.to(controls.target, {
              x: clickedNode.position.x,
              y: clickedNode.position.y,
              z: clickedNode.position.z,
              duration: 1.2,
              ease: "power2.out"
            });

            return; // Interrupt, don't navigate
          } else {
            // Clicking the same node again zooms out
            unzoomMobile();
            return;
          }
        }

        const targetUrl = data.type === 'anchor' ? data.url : data.directUrl;
        if (targetUrl) {
          window.location.href = targetUrl; // Direct navigation on click
        }
      }
    } else {
      if (isMobile && activeMobileNode) {
        // Clicking outside zooms out
        unzoomMobile();
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

    // Raycasting (Only track floating hover if Desktop)
    if (!isMobile) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        let object = intersects[0].object;
        if (!object.userData || !object.userData.type) {
          object = object.parent;
        }

        if (hoveredNode !== object && object.userData && object.userData.isReal) {
          // Reset previous hovered lines
          if (hoveredNode && hoveredNode.userData.connectedLines) {
            hoveredNode.userData.connectedLines.forEach(line => {
              gsap.to(line.material, { opacity: 0.35, duration: 0.5 });
              gsap.to(line.material.color, { r: 203 / 255, g: 213 / 255, b: 225 / 255, duration: 0.5 }); // Back to standard color
            });
          }

          if (hoveredNode) {
            document.body.style.cursor = 'default';
          }

          hoveredNode = object;
          document.body.style.cursor = 'pointer';

          // Update Toolkit Info and Show
          const data = hoveredNode.userData;
          updateBriefingCard(data);

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
              gsap.to(line.material, { opacity: 0.35, duration: 0.5 });
              gsap.to(line.material.color, { r: 203 / 255, g: 213 / 255, b: 225 / 255, duration: 0.5 });
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
          gsap.to(briefingCard, { autoAlpha: 0, scale: 0.95, duration: 0.2 });
        }
      }
    }

    if (hoveredNode) {
      const vector = new THREE.Vector3();
      hoveredNode.getWorldPosition(vector);
      if (isMobile) {
        vector.y -= 0.72;
      } else {
        const offset = hoveredNode.userData.type === 'anchor' ? 0.86 : 0.72;
        vector.y += offset;
      }
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

      if (isMobile) {
        vector.y += mesh.userData.type === 'anchor' ? 0.9 : 0.6;
      } else {
        vector.y += mesh.userData.type === 'anchor' ? 1.05 : 0.82;
      }

      const dist = camera.position.distanceTo(vector);
      vector.project(camera);

      if (vector.z > 1.0) {
        element.style.display = 'none';
        return;
      }
      element.style.display = 'block';

      const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
      const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

      const baseDist = isMobile ? 45 : 40;
      const rawScale = 1 - (dist - baseDist) / 65;
      const scale = Math.max(isMobile ? 0.72 : 0.6, Math.min(isMobile ? 1.0 : 1.16, rawScale));
      const targetOpacity = Math.max(isMobile ? 0.68 : 0.34, 1 - (dist - baseDist) / 42);

      // Grow upwards (-100% on Y) so multiple lines never overlap the node beneath
      element.style.transform = `translate(-50%, -100%) scale(${scale})`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = targetOpacity.toFixed(2);
      // Guarantee they sit on top of everything
      element.style.zIndex = Math.round((100 - dist) * 10) + 1000;
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
