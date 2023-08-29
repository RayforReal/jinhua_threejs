import * as THREE from 'three';
import Stat from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const w = window.innerWidth;
const h = window.innerHeight;

// Stat for fps
const stat = new Stat();

const gui = new dat.GUI();

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
camera.position.set(0, 5, 10)
camera.lookAt(0, 0, 0)

// Light
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
// 阴影清晰度
directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
scene.add(directionalLight)
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight)

// 球体
const sphereGeometry = new THREE.SphereGeometry(0.5);
const meshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const sphereMesh = new THREE.Mesh(sphereGeometry, meshPhongMaterial);
scene.add(sphereMesh)

// 平面
const plane = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc })
const planeMesh = new THREE.Mesh(plane, planeMaterial)
planeMesh.rotateX(-Math.PI * 0.5)
scene.add(planeMesh);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
document.body.appendChild(stat.dom);

//**------------添加阴影-----------------**//
// 1
directionalLight.castShadow = true;
// 2
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// 3
sphereMesh.castShadow = true; //default is false
sphereMesh.receiveShadow = false; //default
// 4
planeMesh.receiveShadow = true;

gui.add(directionalLight.position, 'x', -2, 2, 0.1)
gui.add(directionalLight.position, 'y', -2, 2, 0.1)

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

const clock = new THREE.Clock();

function tick() {
    const elapsedTime = clock.getElapsedTime();
    sphereMesh.position.y = Math.abs(Math.sin(elapsedTime)) + 0.5
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    stat.update();
    controls.update();
}

tick();
