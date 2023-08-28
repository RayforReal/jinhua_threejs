// noinspection DuplicatedCode

import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;

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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// axesHelper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// animation
const clock = new THREE.Clock();

function tick() {
    const time = clock.getElapsedTime();
    cube.position.x = Math.sin(time * 2);
    cube.position.y = Math.cos(time * 2);
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
}

tick();
