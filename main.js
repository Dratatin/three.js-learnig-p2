import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvasElement = document.getElementById("canvas-element");
const canvasWidth = canvasElement.offsetWidth;
const canvasHeight = canvasElement.offsetHeight;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(canvasWidth, canvasHeight);
canvasElement.appendChild(renderer.domElement);


const fov = 75;
const far = 10;
const near = .1;
const ratio = canvasWidth/canvasHeight;
const camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);


const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: "yellow"
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);


(function animate(t) {
    requestAnimationFrame(animate);
    cube.rotation.z = t * 0.0002;
    cube.rotation.x = t * 0.0003;
    renderer.render(scene, camera);
})()



