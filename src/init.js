import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import Stats from 'stats.js';

// stats
// export const stats = new Stats();
// document.body.appendChild(stats.domElement);

// scene, renderer, camera, mesh (geometry + material)
export const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// enbale the drawing of shadows
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

export const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xf8ebb8);
export const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 2, 20);
// controls
export const controls = new THREE.OrbitControls(camera, renderer.domElement);
// axis helper
// const axisHelper = new THREE.AxisHelper(100);
// scene.add(axisHelper);

// lights
const light = new THREE.AmbientLight(0x888888);
scene.add(light);

const spotLight = new THREE.SpotLight(0x88aa88);
spotLight.angle = 25 * (Math.PI / 180);
spotLight.position.set(80, 80, 0);
spotLight.castShadow = true;
spotLight.distance = 200;
spotLight.decay = 2;
spotLight.penumbra = 0.9;
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

const spotLight2 = new THREE.SpotLight(0x88aa88);
spotLight2.angle = 25 * (Math.PI / 180);
spotLight2.position.set(80, 80, 50);
spotLight2.distance = 200;
spotLight2.decay = 2;
spotLight2.penumbra = 0.9;
scene.add(spotLight2);
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
// scene.add(spotLightHelper2);

const handleResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	// composer.setSize(window.innerWidth, window.innerHeight);
};
addEventListener('resize', handleResize);
