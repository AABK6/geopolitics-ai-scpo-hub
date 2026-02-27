import re
with open('shared/3d-hub.js') as f:
    js = f.read()

# 1. Update Imports for CSS2DRenderer
import_text = """
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
"""
js = re.sub(r"import \* as THREE from 'three';\n.*?UnrealBloomPass\.js';", import_text, js, flags=re.DOTALL)

# 2. Add labelRenderer to initialization
renderer_init = '''
  let renderer;
  let labelRenderer;
  try {
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);
  } catch (e) {
'''
js = re.sub(r"  let renderer;\n  try \{\n    // Renderer setup\n    renderer = new THREE\.WebGLRenderer\(\{ antialias: true, alpha: true \}\);\n    renderer\.setPixelRatio\(Math\.min\(window\.devicePixelRatio, 2\)\);\n    renderer\.setSize\(window\.innerWidth, window\.innerHeight\);\n    renderer\.toneMapping = THREE\.ACESFilmicToneMapping;\n    renderer\.toneMappingExposure = 1\.2;\n    container\.appendChild\(renderer\.domElement\);\n  \} catch \(e\) \{", renderer_init, js)

# 3. Add CSS2D Labels & Refine uniform colors
node_creation = '''
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mesh.add(wireMesh);
    mesh.userData.wireMesh = wireMesh;

    // Typography Labels
    if (data.type === 'anchor') {
      const div = document.createElement('div');
      div.className = 'node-label';
      div.textContent = '0' + data.id.replace('m', '');
      div.style.color = data.id.match(/m[1-4]/) ? '#38bdf8' : '#ea580c';
      div.style.fontFamily = 'JetBrains Mono, monospace';
      div.style.fontSize = '3rem';
      div.style.fontWeight = 'bold';
      div.style.opacity = '0.3';
      div.style.textShadow = '0 0 10px rgba(255,255,255,0.2)';
      const label = new CSS2DObject(div);
      label.position.set(0, 2.5, 0);
      mesh.add(label);
    }
'''
js = js.replace('    mesh.userData.wireMesh = wireMesh;', node_creation)

# 4. Enhance the Edges for Path/Network (Sequential Links)
edge_code = '''
  // Add Edges
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1
  });
  
  const thickLineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    linewidth: 2 
  });

  // Connect satellites to nearest anchor
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

  // Connect anchors Sequentially to form a path
  const anchors = nodesData.filter(n => n.type === 'anchor');
  for (let i = 0; i < anchors.length - 1; i++) {
    const points = [anchors[i].position, anchors[i+1].position];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, thickLineMaterial);
    constellation.add(line);
  }
'''
js = re.sub(r'  // Add Edges.*?constellation\.add\(line\);\n  }', edge_code, js, flags=re.DOTALL)

# 5. Fix Material definitions
material_code = '''
  // Materials
  const anchorMat1 = new THREE.MeshPhysicalMaterial({ 
    color: 0x38bdf8,
    metalness: 0.8,
    roughness: 0.2,
    transmission: 0.9,
    thickness: 1.5,
    clearcoat: 1.0,
    emissive: 0x0f172a,
    emissiveIntensity: 0.2
  });
  const anchorMat2 = new THREE.MeshPhysicalMaterial({ 
    color: 0xea580c,
    metalness: 0.8,
    roughness: 0.2,
    transmission: 0.9,
    thickness: 1.5,
    clearcoat: 1.0,
    emissive: 0x0f172a,
    emissiveIntensity: 0.2
  });
  const satelliteMat = new THREE.MeshPhysicalMaterial({ 
    color: 0x94a3b8,
    metalness: 0.5,
    roughness: 0.5,
    transmission: 0.5,
    clearcoat: 0.5
  });

  // Create Nodes
  nodesData.forEach(data => {
    // Inner core
    const geometry = new THREE.IcosahedronGeometry(data.size, 3);
    let material;
    if (data.type === 'anchor') {
      material = data.id.match(/m[1-4]/) ? anchorMat1.clone() : anchorMat2.clone();
    } else {
      material = satelliteMat.clone();
    }
'''
js = re.sub(r'  // Materials\n  const anchorMat = new THREE\.MeshBasicMaterial\(\{ color: 0xea580c \}\);\n  const satelliteMat = new THREE\.MeshBasicMaterial\(\{ color: 0x38bdf8 \}\);\n\n  // Create Nodes\n  nodesData\.forEach\(data => \{\n    // Inner core\n    const geometry = new THREE\.IcosahedronGeometry\(data\.size, 2\);\n    const material = data\.type === \'anchor\' \? anchorMat\.clone\(\) : satelliteMat\.clone\(\);\n    material\.color\.setHex\(data\.color\);', material_code, js)

# 7. Update render loop and resize for labelRenderer
render_loop = '''
    controls.update();
    composer.render();
    if (labelRenderer) labelRenderer.render(scene, camera);
'''
js = js.replace('    controls.update();\n    composer.render();', render_loop)

resize_update = '''
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    if (labelRenderer) labelRenderer.setSize(window.innerWidth, window.innerHeight);
'''
js = js.replace('    composer.setSize(window.innerWidth, window.innerHeight);', resize_update)

with open('shared/3d-hub.js', 'w') as f:
    f.write(js)
