import * as THREE from 'three';
import { renderer, scene, camera, controls, stats } from './init';
import './main.css';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

let sessionCheck = sessionStorage.getItem('picture');
let session = null
if (sessionCheck == null) { sessionStorage.setItem('picture', 'img/logo_mco1.png'); session = sessionStorage.getItem('picture'); }
else { session = sessionCheck; }

let animation = true;

document.querySelector("#esteban").onclick = () => { updatePicture('esteban_3.png'); }
document.querySelector("#logo").onclick = () => { updatePicture('logo_mco1.png'); }
document.querySelector("#zia").onclick = () => { updatePicture('zia_8.png'); }
document.querySelector("#tao").onclick = () => { updatePicture('tao_5.png'); }
document.querySelector("#solaris").onclick = () => { updatePicture('solaris_3.png'); }
document.querySelector("#thallios").onclick = () => { updatePicture('sous-marin.jpg'); }
document.querySelector("#condor").onclick = () => { updatePicture('temple-condor.png'); }
document.querySelector("#olmeque").onclick = () => { updatePicture('03.jpg'); }
document.querySelector("#help").onclick = () => { document.querySelector("#help-text").classList.toggle('display'); }


const updatePicture = pictureName => {
	sessionStorage.clear();
	sessionStorage.setItem('picture', `img/${pictureName}`);
	animation = true;
	window.location.reload();
}

let uniforms = null;


const loadAnimation = () => {

	const radiusX = 10; //5.34;
	const radiusY = 10;
	const particles = radiusX * radiusY * 5000;
	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(particles * 3);
	const colors = new Float32Array(particles * 3);
	const sizes = new Float32Array(particles);
	const color = new THREE.Color();
	for (let i = 0; i < particles; i += 3) {
		positions[i + 0] = (Math.random() * 2 - 1) * radiusX;
		positions[i + 1] = (Math.random() * 2 - 1) * radiusY;
		positions[i + 2] = 0;
	}
	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

	geometry.computeBoundingBox();
	const max = geometry.boundingBox.max;
	const min = geometry.boundingBox.min;
	console.log(max, min);

	uniforms = {
		texture: { value: new THREE.TextureLoader().load(session) },
		boundingMin: { value: min },
		boundingMax: { value: max },
		time: { value: 0 },
	};
	const shaderMaterial = new THREE.ShaderMaterial({
		uniforms,
		vertexShader,
		fragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
	});

	const particleSystem = new THREE.Points(geometry, shaderMaterial);
	scene.add(particleSystem);

}
// post processing
// const composer = new THREE.EffectComposer(renderer);
//
// const renderPass = new THREE.RenderPass(scene, camera);
// const grainPass = new THREE.ShaderPass(THREE.FilmShader);
// grainPass.renderToScreen = true;
// grainPass.uniforms['grayscale'] = false;
//
// composer.addPass(renderPass);
// composer.addPass(grainPass);

const animate = timestamp => {
	requestAnimationFrame(animate);

	if(animation == true) {
		loadAnimation();
		animation = false;
	}else {
		uniforms.time.value = timestamp;
	}
	// stats.begin();
	renderer.render(scene, camera);
	// composer.render();
	// stats.end();
};
animate();
