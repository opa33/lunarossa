import * as THREE from 'three';
	import { OrbitControls } from 'OrbitControls';
	import { GLTFLoader } from 'GLTFLoader';
	import { RectAreaLightHelper } from 'RectAreaLightHelper';
	import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';

	function init() {
			let container = document.querySelector('.adidas_mobile2');

			// Сцена
			const scene = new THREE.Scene();
			scene.background = null; // Прозрачный фон

			// Камера
			const camera = new THREE.PerspectiveCamera(30, 850 / 700, 0.1, 3000);
			camera.position.set(0, 0, 0.5);

			// Рендерер
			const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(330, 280);
			renderer.shadowMap.enabled = true; // Включаем тени
			renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Мягкие тени
			container.appendChild(renderer.domElement);

			// Модель
			const loader = new GLTFLoader();
			loader.load('./model/scene.gltf', gltf => {
					const model = gltf.scene;
					model.traverse(function (node) {
							if (node.isMesh) {
									node.castShadow = true; // Включаем тени для модели
									node.receiveShadow = true;
							}
					});
					scene.add(model);
			}, function (error) {
					console.log('Ошибка: ' + error);
			});

			// Мягкий верхний свет
			const topLight = new THREE.SpotLight(0xffffff, 0.8);
			topLight.position.set(0, 2, 0);
			topLight.angle = Math.PI / 6;
			topLight.penumbra = 0.2;
			topLight.decay = 2;
			topLight.distance = 50;
			topLight.castShadow = true;
			topLight.shadow.mapSize.width = 1024;
			topLight.shadow.mapSize.height = 1024;
			topLight.shadow.camera.near = 1;
			topLight.shadow.camera.far = 50;
			scene.add(topLight);

			// RectAreaLight
			RectAreaLightUniformsLib.init();
			const rectLight1 = new THREE.RectAreaLight(0xC0C0C0, 1, 100, 100);
			rectLight1.position.set(-10, 0, 0);
			rectLight1.rotation.y = Math.PI + Math.PI / 4;
			scene.add(rectLight1);

			const rectLight2 = new THREE.RectAreaLight(0xC0C0C0, 1, 100, 100);
			rectLight2.position.set(10, 0, 0);
			rectLight2.rotation.y = Math.PI - Math.PI / 4;
			scene.add(rectLight2);

			// Фоновый свет для смягчения теней
			const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
			scene.add(ambientLight);

			// OrbitControls
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.autoRotate = true;
			controls.enableRotate = true;
			controls.autoRotateSpeed = 0.5;
			controls.enableDamping = false;
			controls.enableZoom = false;

			// Изменение размера окна
			window.addEventListener('resize', onWindowResize, false);
			function onWindowResize() {
					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();
					renderer.setSize(window.innerWidth, window.innerHeight);
			}

			// Анимация
			function animate() {
					requestAnimationFrame(animate);
					controls.update();
					renderer.render(scene, camera);
			}
			animate();
	}

	init();