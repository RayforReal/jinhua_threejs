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

// Light
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight)

// 平行光
const directionalColor={
    value:0xffffff
}
const directionalLight = new THREE.DirectionalLight(directionalColor.value, 2);
directionalLight.position.set(30, 30, 30);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLight,directionalLightHelper)

// 聚光灯
const spotLight = new THREE.SpotLight(0xff0000,10);
spotLight.position.set(10, 10, 10);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight,spotLightHelper);

// Camera
const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
camera.position.set(0, 100, 100)
camera.lookAt(0, 0, 0)

// 正方体
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff00000 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.setY(15)
scene.add(boxMesh)

// 平面
const plane = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide })
const planeMesh = new THREE.Mesh(plane, planeMaterial)
planeMesh.rotateX(-Math.PI / 2)
scene.add(planeMesh);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
document.body.appendChild(stat.dom);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

const ambientFolder = gui.addFolder('环境光')
ambientFolder.add(ambientLight,'visible')

const directionalFolder = gui.addFolder('平行光')
directionalFolder.add(directionalLight,'visible').onChange(value=>{
    directionalLightHelper.visible = value
})
directionalFolder.add(directionalLight,'intensity',0.1,10,0.1).name('亮度')
directionalFolder.addColor(directionalColor,'value').name('颜色').onChange(value=>{
    directionalLight.color = new THREE.Color(value)
})
directionalFolder.add(directionalLight.position,'x',-100,100,.1).name('X轴位置')

const spotLightFolder = gui.addFolder('聚光灯')
// spotLightFolder.add(spotLight,'visible').onChange(value=>{
//     spotLightHelper.visible = value
// })


function tick() {
    boxMesh.rotateX(0.5 / 180 * Math.PI)
    boxMesh.rotateY(0.5 / 180 * Math.PI)
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    stat.update();
    controls.update();
    directionalLightHelper.update()
}

tick();
