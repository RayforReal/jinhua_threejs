import * as THREE from 'three';
import Stat from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
camera.position.set(0, 3, 6)
camera.lookAt(0, 0, 0)

// 公共统一材料
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });

// 整个车----group
const car = new THREE.Group();

/** ------------------- 车轮 = 轮子 + 轮毂  ------------------- **/
//  左轮
const leftCarWheel = new THREE.Group();

// 前面两个轮子的group
const frontCarWheel = new THREE.Group();

// 轮子
const wheelGeometry = new THREE.TorusGeometry(0.2, 0.03, 50, 50);
const wheelMesh = new THREE.Mesh(wheelGeometry, material);

// 轮毂
const createCarHub = () => {
    const count = 10;
    const group = new THREE.Group();
    const carHubGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.35, 16);
    const carHubMesh = new THREE.Mesh(carHubGeometry, material);
    for (let i = 0; i < count; i++) {
        const mesh = carHubMesh.clone();
        mesh.rotation.z = ((2 * Math.PI) / count) * i
        group.add(mesh)
    }
    return group
}

leftCarWheel.add(wheelMesh, createCarHub());
leftCarWheel.position.setZ(0.5)

const rightCarWheel = leftCarWheel.clone();
rightCarWheel.position.setZ(-0.5)

// 车轴
const axleGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 16);
const axleMesh = new THREE.Mesh(axleGeometry, material);
axleMesh.rotation.x = 0.5 * Math.PI

frontCarWheel.add(axleMesh)

frontCarWheel.add(leftCarWheel, rightCarWheel)
frontCarWheel.position.setX(0.7);

// 后面两个轮子的group
const backCarWheel = frontCarWheel.clone();
backCarWheel.position.setX(-0.7);

car.add(frontCarWheel, backCarWheel)

/** ------------------- 车身 = 车底 + 车顶  ------------------- **/
// 车身
const carBody = new THREE.Group()

// 车底
const bodyBaseGeometry = new THREE.BoxGeometry(2, 0.1, 0.8);
const bodyBaseMesh = new THREE.Mesh(bodyBaseGeometry, material);
carBody.add(bodyBaseMesh);

// 车顶
const topGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 3, 1, false, 0, Math.PI);
const topMesh = new THREE.Mesh(topGeometry, material);
topMesh.rotateZ(Math.PI / 2)
carBody.add(topMesh);

car.add(carBody)

/** ------------------- 地面  ------------------- **/
const groundPlane = new THREE.PlaneGeometry(5, 5);
const groundMesh = new THREE.Mesh(groundPlane, new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide
}));
groundMesh.rotateX(-Math.PI / 2);
groundMesh.position.setY(-0.23)

scene.add(groundMesh, car)

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);

// Stat for fps
const stat = new Stat();
document.body.appendChild(stat.dom);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

const clock = new THREE.Clock()

function tick() {
    const time = clock.getElapsedTime();
    car.position.setX(Math.sin(time * 2))
    /**
     * 在设置旋转角度时候 （Math.PI / deg）中的deg不能为5的倍数 因为轮毂的数量是10个，否则会导致视图看起来没有变化
     */
    frontCarWheel.rotateZ(Math.PI / 11)
    backCarWheel.rotateZ(Math.PI / 11)
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    stat.update();
    controls.update();
}

tick();
