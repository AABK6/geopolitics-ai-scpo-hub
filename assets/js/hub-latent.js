/**
 * LATENT SPACE HUB: THREE.JS IMPLEMENTATION
 * Geopolitics of AI | Course Hub
 */

let scene, camera, renderer, nodes = [], lines = [];
const container = document.getElementById('canvas-container');

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Deep Navy

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    createNodes();
    animate();
}

function createNodes() {
    // 2 Anchor Nodes (Main course)
    createNode(0, 0, 0, 5, 0xea580c, "Anchor Node", "Module 01: History", "primer/module-01.html");
    createNode(30, 10, -20, 5, 0xea580c, "Anchor Node", "Module 02: New Creed", "primer/module-02.html");

    // 5 Satellite Nodes (Students)
    for (let i = 1; i <= 5; i++) {
        const x = (Math.random() - 0.5) * 80;
        const y = (Math.random() - 0.5) * 80;
        const z = (Math.random() - 0.5) * 80;
        createNode(x, y, z, 2, 0x15803d, "Applied Node", `Group ${i} Project`, `projects/group-${i}/index.html`);
    }
}

function createNode(x, y, z, size, color, type, title, link) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        shininess: 100
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    
    // Custom data
    sphere.userData = { type, title, link };
    
    scene.add(sphere);
    nodes.push(sphere);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Subtle rotation of nodes
    nodes.forEach(node => {
        node.rotation.y += 0.01;
        node.position.y += Math.sin(Date.now() * 0.001 + node.position.x) * 0.05;
    });

    renderer.render(scene, camera);
}

// Interactivity Placeholder (Raycasting)
window.addEventListener('click', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodes);
    
    if (intersects.length > 0) {
        const data = intersects[0].object.userData;
        const card = document.getElementById('briefing-card');
        card.style.display = 'block';
        card.querySelector('.brief-type').innerText = data.type;
        card.querySelector('.brief-title').innerText = data.title;
        card.querySelector('.brief-btn').href = data.link;
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
