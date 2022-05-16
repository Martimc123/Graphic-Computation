/*global THREE*/

var camera, scene, renderer;

var geometry, material, mesh;

var ball;

function createBall(x, y, z) {
 'use strict';

 ball = new THREE.Object3D();
 ball.userData = { jumping: true, step:0 };

 material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
 geometry = new THREE.SphereGeometry(4, 10, 10);
 mesh = new THREE.Mesh(geometry, material);

 ball.add(mesh);
 ball.position.set(x, y, z);

 scene.add(ball);
}


function addTableTop(obj, x, y, z) {
	'use strict';
	geometry = new THREE.BoxGeometry(60, 2, 20);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addTableLeg(obj, x, y, z) {
	'use strict';
	geometry = new THREE.BoxGeometry(2, 6, 2);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y-3, z);
	obj.add(mesh);
}

function createTable(x, y, z) {
	'use strict';

	var table = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x20b2aa, wireframe: true});

	addTableTop(table, 0, 0, 0);
	addTableLeg(table, -25 ,-1, -8);
	addTableLeg(table, -25 ,-1, 8);
	addTableLeg(table, 25 ,-1, 8);
	addTableLeg(table, 25 ,-1, -8);

	scene.add(table);

	table.position.x = x;
	table.position.y = y;
	table.position.z = z;
}

function newPyramid() {
	var defaultPyramidGeometry = new THREE.CylinderGeometry(0, radius, height, 4, 1);
}

function addObj(obj, geom, c, x, y, z) {
	'use strict';

	material = new THREE.MeshBasicMaterial({ color: c, wireframe: true});
	mesh = new THREE.Mesh(geom, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
	scene.add(obj);

	obj.position.x = x;
	obj.position.y = y;
	obj.position.z = z;

}

function createKitty() {
	'use strict';

	var defaultTorusGeometry = new THREE.TorusGeometry();
	var defaultBoxGeometry = new THREE.BoxGeometry(8,8,8);
	var defaultSphereGeometry = new THREE.SphereGeometry(18,18,18);
	var defaultCylinderGeometry = new THREE.CylinderGeometry(10,10,40,10);
	var defaultRingGeometry = new THREE.RingGeometry();
	var defaultPyramidGeometry = new THREE.CylinderGeometry();

	var torus = new THREE.Object3D();
	var box = new THREE.Object3D();
	var sphere = new THREE.Object3D();
	var cylinder = new THREE.Object3D();
	var ring = new THREE.Object3D();
	var pyramid = new THREE.Object3D();
	
	//addObj(torus, defaultTorusGeometry, 0, 0, 0);
	//addObj(pyramid, defaultPyramidGeometry, 10, 10, 10);
	addObj(box, defaultBoxGeometry, 0xFF0000,15, 10, -10);
	addObj(sphere, defaultSphereGeometry, 0x20b2aa, 10, 7, -20);
	addObj(cylinder, defaultCylinderGeometry, 0x2E8B57
		, 0, 0, 0);
	//addObj(ring, defaultRingGeometry, 50, 50, 50);

	// To know which axis is xyz
	var spherex = new THREE.Object3D();
	var spherey = new THREE.Object3D();
	var spherez = new THREE.Object3D();
	var tinySphereGeometry = new THREE.SphereGeometry(3,3,3);
	addObj(spherex, tinySphereGeometry, 0xFF0000,5, 0, 0);
	addObj(spherey, tinySphereGeometry, 0xFFFF00,0, 5, 0);
	addObj(spherez, tinySphereGeometry, 0xFFFAFA,0, 0, 5);

	//trying to rotate the cylinder(body) but its not working
	//cylinder.rotateZ(-Math.PI * 0.5);
	cylinder.rotateY(Math.PI * 0.5);
	//cylinder.rotateX(-Math.PI * 1);
	
}

function render() {
	'use strict'; // strict mode makes for faster code and supresses some warnings
	renderer.render(scene, camera); // tells 3js renderer to draw scene visualization based on camera 
}

function onResize() {
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerWidth > 0 &&  window.innerHeight > 0) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

}

function onKeyDown(e) {
	'use strict';

	switch(e.keyCode) {
		case 65: //A
		case 97: //a
			scene.traverse( function(node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
		case 83: // S
		case 115: //s
			ball.userData.jumping = !ball.userData.jumping;
			break;
	}

}

function animate() {
	'use strict';

	if (ball.userData.jumping) {
		ball.userData.step += 0.04;
		ball.position.y = Math.abs(30*Math.sin(ball.userData.step));
		ball.position.z = 15 * (Math.cos(ball.userData.step));
	}

	render();

	requestAnimationFrame(animate);
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
	scene.add(new THREE.AxesHelper(100));
	createKitty();
}

function createCamera() {
	'use strict';

	// FOV=70, Aspect ratio, ETX
	// scene could have ortogonal camera instead but its not the case
	camera = new THREE.PerspectiveCamera(70,
																		window.innerWidth/window.innerHeight,
																		1,
																		1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 50;
	camera.lookAt(scene.position); // camera pointed at scene axis
}

function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true}); // antialias softens pixel transition when changing image size

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement); // associates html to renderer
	createScene();
	createCamera();

	render();
	window.addEventListener("keydown", onKeyDown);

}
