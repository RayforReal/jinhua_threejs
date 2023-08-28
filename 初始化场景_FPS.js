import * as THREE from 'three';
import Stat from 'three/examples/jsm/libs/stats.module.js';

const w = window.innerWidth;
const h = window.innerHeight;

// Stat for fps
const stat = new Stat();

// Scene
const scene = new THREE.Scene();

// Light
const light = new THREE.DirectionalLight(0xffffff, 0.3);
light.position.set(5, 5, 5)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
camera.position.set(0, 2, 5)
camera.lookAt(0, 0, 0)

// Objects
const cubeGroup = new THREE.Group();

function creatCube() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)
    cubeGroup.add(cube)
}

for (let i = 0; i < 200; i++) {
    creatCube()
}
scene.add(cubeGroup);

// axesHelper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
document.body.appendChild(stat.dom);

renderer.render(scene, camera);

// animation
const clock = new THREE.Clock();

function tick() {
    const time = clock.getElapsedTime();
    cubeGroup.children.forEach((item, index) => {
        item.rotation.z = time + index
    })
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    stat.update()
}

tick();
