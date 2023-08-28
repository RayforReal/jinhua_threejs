import * as THREE from 'three';
import Stat from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

// Stat for fps
const stat = new Stat();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)

// Light
const light = new THREE.DirectionalLight(0xffffff, 0.3);
light.position.set(5, 5, 5)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
camera.position.set(0, 1, 5)
camera.lookAt(0, 0, 0)

// 汽车
const car = new THREE.Group();

const body = new THREE.BoxGeometry(0.5, 1, 0.1);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const bodyMesh = new THREE.Mesh(body, bodyMaterial);
car.add(bodyMesh);

const bodyTop = new THREE.BoxGeometry(0.2, 0.2, 0.15);
const bodyTopMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const bodyTopMesh = new THREE.Mesh(bodyTop, bodyTopMaterial);
bodyTopMesh.position.set(0, 0.2, 0.1)
car.add(bodyTopMesh);

function createWheel(x, y) {
    const geometry = new THREE.TorusGeometry(0.1, 0.1, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const torus = new THREE.Mesh(geometry, material);
    torus.rotateY(1 / 2 * Math.PI);
    torus.position.set(x, y, 0)
    return torus.clone()
}

// 四个轮子
const wheel1 = new THREE.Group();
wheel1.add(createWheel(-0.38, 0.3));
const wheel2 = new THREE.Group();
wheel2.add(createWheel(0.38, 0.3));
const wheel3 = new THREE.Group();
wheel3.add(createWheel(-0.38, -0.3));
const wheel4 = new THREE.Group();
wheel4.add(createWheel(0.38, -0.3));

// 轮胎
function createTyre(x, y) {
    const tyreGeometry = new THREE.BoxGeometry(0.2, 0.02, 0.02);
    const tyreMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const tyre = new THREE.Mesh(tyreGeometry, tyreMaterial);
    const tyreGroup = new THREE.Group();
    const tyres = 25;
    const r = 0.2;
    for (let i = 0; i < tyres; i++) {
        tyre.position.setZ(r * Math.sin(2 * Math.PI / tyres * i))
        tyre.position.setY(r * Math.cos(2 * Math.PI / tyres * i))
        tyreGroup.add(tyre.clone())
    }
    tyreGroup.position.set(x, y, 0);
    return tyreGroup
}

const tyre1 = createTyre(-0.38, 0.3);
const tyre2 = createTyre(0.38, 0.3)
const tyre3 = createTyre(-0.38, -0.3)
const tyre4 = createTyre(0.38, -0.3)

car.add(tyre1, tyre2, tyre3, tyre4);
car.add(wheel1, wheel2, wheel3, wheel4);
scene.add(car);

// axesHelper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
document.body.appendChild(stat.dom);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

// animation
const clock = new THREE.Clock();

function tick() {
    const time = clock.getElapsedTime()
    car.position.setY(time / 2 % 2.5 - 2);
    tyre1.rotateX(-5 / Math.PI)
    tyre2.rotateX(-5 / Math.PI)
    tyre3.rotateX(-5 / Math.PI)
    tyre4.rotateX(-5 / Math.PI)
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    stat.update();
    controls.update();
}

tick();
