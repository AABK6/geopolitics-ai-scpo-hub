
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// =====================
// SHADER SOURCE CODE: Neural Node Material
// =====================
const nodeVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nodeFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 uColor;
  uniform float uHover;

  // Smooth Simplex Noise for organic "grouillement"
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) { 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    // THREE mixed frequencies for "active but smooth" grouillement
    // 1. NEW Macro-scale blocks (Very slow)
    float n0 = snoise(vPosition * 1.5 + uTime * 0.1);
    
    // 2. Medium-scale flow
    float n1 = snoise(vPosition * 4.0 + uTime * 0.3);
    
    // 3. Fine-grain activity
    float n2 = snoise(vPosition * 10.0 - uTime * 0.5);
    
    float activity = (n0 * 0.5 + n1 * 0.3 + n2 * 0.2) * 0.5 + 0.5;
    
    // Brighter palette to read as an active network, not dark celestial bodies.
    vec3 baseColor = uColor * 0.55;
    vec3 midColor = uColor * 0.9;
    vec3 activeColor = uColor * 1.2;
    
    vec3 finalColor = mix(baseColor, midColor, activity);
    finalColor = mix(finalColor, activeColor, pow(activity, 5.0));
    
    // Interaction
    finalColor *= (1.0 + uHover * 0.1);

    // Light, flatter shading so nodes read as data points.
    float diff = max(dot(vNormal, normalize(vec3(0.5, 1.0, 0.8))), 0.45);
    finalColor *= (0.75 + diff * 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const initLatentSpace = () => {
  const container = document.getElementById('canvas-container');
  const loadingOverlay = document.getElementById('loading-overlay');
  const fallbackUI = document.getElementById('fallback-ui');

  // Ensure gsap is loaded globally via CDN
  const gsap = window.gsap;


  let renderer;
  let labelRenderer;
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

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none'; // Fall-through to canvas
    container.appendChild(labelRenderer.domElement);
  } catch (e) {

    console.error('WebGL Initialization Error:', e);
    if (loadingOverlay) loadingOverlay.style.display = 'none';
    if (fallbackUI) fallbackUI.style.display = 'flex';
    if (container) container.style.display = 'none';
    return null;
  }

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x4b6176, 0.008);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1c2e45, 1.0);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 25);

  // Post-Processing (Bloom) - Drastically Reduced
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.2, // strength reduced from 1.5
    0.1, // radius reduced from 0.4
    0.9  // threshold increased from 0.1
  );

  const composer = new EffectComposer(renderer);
  
  // Ensure the composer's render targets support alpha
  composer.renderTarget1.texture.format = THREE.RGBAFormat;
  composer.renderTarget2.texture.format = THREE.RGBAFormat;

  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.1; // Reduced from 0.8
  controls.maxDistance = 50;
  controls.minDistance = 5;
  controls.enablePan = true; // Enabled panning
  controls.enableZoom = true;

  // Data Definition
  const nodesData = [
    {
      id: 'm1',
      type: 'anchor',
      title: 'The Strategic Convergence',
      bluf: 'The "End of History" illusion and the Clintonian Wager: How early internet optimism assumed the non-rival nature of digital ideas would inevitably dissolve borders.',
      url: 'primer/module-01.html',
      position: new THREE.Vector3(-12, 4, 0),
      color: 0x38bdf8,
      size: 1.5
    },
    {
      id: 'm2',
      type: 'anchor',
      title: 'Architecture of Sovereignty',
      bluf: 'China\'s foundational rebuttal to the liberal digital order: the construction of a "Porous but Policed" internet that imports capital while filtering dissent.',
      url: 'primer/module-02.html',
      position: new THREE.Vector3(-8, -2, -4),
      color: 0x38bdf8,
      size: 1.5
    },
    {
      id: 'm3',
      type: 'anchor',
      title: 'The Rupture',
      bluf: 'The 2013 Snowden revelations and the resulting collapse of global trust, triggering a race for defensive sovereignty over critical infrastructure.',
      url: 'primer/module-03.html',
      position: new THREE.Vector3(-4, 3, 5),
      color: 0x38bdf8,
      size: 1.5
    },
    {
      id: 'm4',
      type: 'anchor',
      title: 'The Splinternet Accelerates',
      bluf: 'The balkanization of the web into competing, deeply sovereign technological stacks and the end of globalization as the default state.',
      url: 'primer/module-04.html',
      position: new THREE.Vector3(0, -4, 0),
      color: 0x38bdf8,
      size: 1.5
    },
    {
      id: 'm5',
      type: 'anchor',
      title: 'Industrial Sovereignty',
      bluf: 'The return of the production function: how frontier AI relies on rival, physical inputs—compute, energy, data, and human talent.',
      url: 'primer/module-05.html',
      position: new THREE.Vector3(4, 5, -3),
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm6',
      type: 'anchor',
      title: 'National Revival Through Tech',
      bluf: 'The resurgence of techno-nationalism and industrial policy, as states race to secure domestic capability while denying adversaries access to critical chokepoints.',
      url: 'primer/module-06.html',
      position: new THREE.Vector3(8, 0, 4),
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm7',
      type: 'anchor',
      title: 'New Ideological Map of AI',
      bluf: 'Tracing the competing intellectual frames—from state realism to techno-accelerationism—that are actively defining what constitutes "rational" policy.',
      url: 'primer/module-07.html',
      position: new THREE.Vector3(12, -4, 0),
      color: 0xea580c,
      size: 1.5
    },
    {
      id: 'm8',
      type: 'anchor',
      title: 'The Collision of Frames',
      bluf: 'The core tradeoffs that will dictate the future global order: diffusion vs. enclosure, growth vs. legitimacy, and state control vs. corporate power.',
      url: 'primer/module-08.html',
      position: new THREE.Vector3(16, 2, -4),
      color: 0xea580c,
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
      color: 0x94a3b8,
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
      color: 0x94a3b8,
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
      color: 0x94a3b8,
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
      color: 0x94a3b8,
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
      color: 0x94a3b8,
      size: 0.8
    }
  ];

  const constellation = new THREE.Group();
  scene.add(constellation);

  const meshes = [];


  // Materials
  const createAnchorMaterial = (color) => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uHover: { value: 0.0 }
    },
    vertexShader: nodeVertexShader,
    fragmentShader: nodeFragmentShader,
    transparent: false
  });

  const satelliteMat = new THREE.MeshPhongMaterial({ 
    color: 0x94a3b8,
    shininess: 100,
    transparent: true,
    opacity: 0.8
  });

  // Create Nodes
  nodesData.forEach(data => {
    // Slightly smaller, less perfectly spherical forms read more like graph nodes.
    const nodeSize = data.type === 'anchor' ? data.size * 0.58 : data.size * 0.52;
    const geometry = new THREE.IcosahedronGeometry(nodeSize, 1);
    let material = createAnchorMaterial(data.color);
    
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
      div.style.color = data.id.match(/m[1-4]/) ? '#38bdf8' : '#ea580c';
      div.style.fontFamily = 'JetBrains Mono, monospace';
      div.style.fontSize = '2.4rem';
      div.style.fontWeight = 'bold';
      div.style.opacity = '0.28';
      div.style.textShadow = '0 0 8px rgba(170,220,255,0.2)';
      const label = new CSS2DObject(div);
      label.position.set(0, 2.5, 0);
      mesh.add(label);
    }

  });


  // Connect satellites to nearest anchor
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
      const points = [sat.position, closestAnchorMesh.position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0x7d9eb7, transparent: true, opacity: 0.2 });
      const line = new THREE.Line(geometry, mat);
      constellation.add(line);
      
      // Store references
      if (satMesh) satMesh.userData.connectedLines.push(line);
      closestAnchorMesh.userData.connectedLines.push(line);
    }
  });

  // Connect anchors Sequentially
  const anchorMeshes = meshes.filter(m => m.userData.type === 'anchor');
  for (let i = 0; i < anchorMeshes.length - 1; i++) {
    const points = [anchorMeshes[i].position, anchorMeshes[i+1].position];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: 0x7d9eb7, transparent: true, opacity: 0.24 });
    const line = new THREE.Line(geometry, mat);
    constellation.add(line);
    
    anchorMeshes[i].userData.connectedLines.push(line);
    anchorMeshes[i+1].userData.connectedLines.push(line);
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

      // Update Shader Uniforms
      if (mesh.material.uniforms) {
        mesh.material.uniforms.uTime.value = elapsedTime;
        const targetHover = (hoveredNode === mesh) ? 1.0 : 0.0;
        mesh.material.uniforms.uHover.value = THREE.MathUtils.lerp(mesh.material.uniforms.uHover.value, targetHover, 0.1);
      }

      // Pulse effect logic refined for both
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
        const data = hoveredNode.userData;
        document.body.style.cursor = 'pointer';
        controls.autoRotate = false;

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
        
        // Update UI
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
        controls.autoRotate = true;
        
        // Hide Card
        gsap.to(briefingCard, { autoAlpha: 0, x: 50, duration: 0.4, ease: "power2.in" });
      }
    }


    controls.update();
    composer.render();
    if (labelRenderer) labelRenderer.render(scene, camera);

  };

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    if (labelRenderer) labelRenderer.setSize(window.innerWidth, window.innerHeight);

  });

  // Remove loading overlay
  if (loadingOverlay) {
    gsap.to(loadingOverlay, { opacity: 0, duration: 1, delay: 0.5, onComplete: () => loadingOverlay.remove() });
  }

  animate();
  
  return { camera, controls, scene, renderer, composer, labelRenderer };
};

// document.addEventListener('DOMContentLoaded', initLatentSpace);
