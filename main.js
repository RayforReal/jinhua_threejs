import * as THREE from 'three';
import Stat from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

// Stat for fps
const stat = new Stat();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc)

// Light
const light = new THREE.DirectionalLight(0xffffff, 0.3);
light.position.set(5, 5, 5)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
camera.position.set(0, 1, 5)
camera.lookAt(0, 0, 0)

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
document.body.appendChild(stat.dom);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

function tick() {
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    stat.update();
    controls.update();
}

tick();
