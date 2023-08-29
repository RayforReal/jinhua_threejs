import * as THREE from 'three';
import Stat from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const w = window.innerWidth;
const h = window.innerHeight;

const gui = new dat.GUI();

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
camera.position.set(100, 100, 100)
camera.lookAt(0, 0, 0)

// 正方体
const boxControl = {
    width: 10,
    height: 10,
    depth: 10
}
const boxGeometry = new THREE.BoxGeometry(boxControl.width, boxControl.height, boxControl.depth);
const boxMaterial = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

const boxFolder = gui.addFolder('长方体')
boxFolder.add(boxMesh.position, 'x', -20, 20, 1).name('X轴');
boxFolder.add(boxMesh.position, 'y', -20, 20, 1).name('Y轴');
boxFolder.add(boxMesh.position, 'z', -20, 20, 1).name('Z轴');
const boxScale = { value: 1 };
boxFolder.add(boxScale, 'value', 0.1, 10, 0.1).name('大小').onChange(value => {
    boxMesh.scale.set(value, value, value)
});

// 球体
const sphereControl = {
    speed: 1,
    r: 50,
    stop: () => {
        sphereControl.speed = sphereControl.speed ? 0 : 1
    },
    color: 0xff0000
}

const sphereGeometry = new THREE.SphereGeometry(10, 16, 16);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: sphereControl.color, wireframe: false });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

const sphereFolder = gui.addFolder('球体')
sphereFolder.add(sphereControl, 'speed', 0.1, 10, .1).name('旋转速度')
sphereFolder.add(sphereControl, 'r', 0.1, 80, 0.1).name('旋转半径')
sphereFolder.add(sphereControl, 'stop').name('旋转状态')
sphereFolder.addColor(sphereControl, 'color').onChange(color => {
    sphereMaterial.color = new THREE.Color(color)
}).name('球体颜色');
sphereFolder.add(sphereMaterial, 'wireframe')

scene.add(new THREE.AxesHelper(20));

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
document.body.appendChild(stat.dom);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

const clock = new THREE.Clock()

function tick() {
    const time = clock.getElapsedTime();
    if (sphereControl.speed !== 0) {
        sphereMesh.position.x = Math.sin(time * sphereControl.speed) * sphereControl.r
        sphereMesh.position.z = Math.cos(time * sphereControl.speed) * sphereControl.r
    }
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    stat.update();
    controls.update();
}

tick();
