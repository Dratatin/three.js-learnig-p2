import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getFresnelMat } from "./utils/getFresnelMat.js";

const canvasElement = document.getElementById("canvas-element");
const canvasWidth = canvasElement.offsetWidth;
const canvasHeight = canvasElement.offsetHeight;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(canvasWidth, canvasHeight);
canvasElement.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const fov = 75;
const far = 10;
const near = .1;
const ratio = canvasWidth/canvasHeight;
const camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
camera.position.z = 4;
const scene = new THREE.Scene();


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = .003;


const loader = new THREE.TextureLoader();


const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);


const earthGeometry = new THREE.IcosahedronGeometry(1, 12);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("./texture/earthmap10k.jpg")
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earthMesh);


const earthLightMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("./texture/earthlights10k.jpg"),
    blending: THREE.AdditiveBlending
})
const earthLightMesh = new THREE.Mesh(earthGeometry, earthLightMaterial);
earthGroup.add(earthLightMesh);


const earthCloudMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("./texture/earthhiresclouds4K.jpg"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: .7
})
const earthCloudMesh = new THREE.Mesh(earthGeometry, earthCloudMaterial);
earthCloudMesh.scale.setScalar(1.005);
earthGroup.add(earthCloudMesh);


const earthGlowMaterial = getFresnelMat();
const earthGlowMesh = new THREE.Mesh(earthGeometry, earthGlowMaterial);
earthGlowMesh.scale.setScalar(1.008);
earthGroup.add(earthGlowMesh);


const sunLight = new THREE.DirectionalLight("white", 2.0);
sunLight.position.set(-1,1,1);
scene.add(sunLight);


(function animate() {
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.0005;
    earthLightMesh.rotation.y += 0.0005;
    earthCloudMesh.rotation.y += 0.0008;
    controls.update();
    renderer.render(scene, camera);
})()

canvasElement.addEventListener("mousedown", () => {
    canvasElement.classList.add("dragging");
})

canvasElement.addEventListener("mouseup", () => {
    canvasElement.classList.remove("dragging");
})