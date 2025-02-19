
'use strict'
var container, camera, scene, renderer, mesh, mesh01;

init();
animate();
//--------

function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 3500 );
  	camera.position.y = 50;
	camera.position.z = 500;

	scene = new THREE.Scene();
	
	scene.add( new THREE.AmbientLight( 0x444444 ) );
	
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0x888888, 1 );	

	container.appendChild( renderer.domElement );

	var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light1.position.set( 1, 1, 1 );
	scene.add( light1 );

	var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
	light2.position.set( 0, -1, 0 );
	scene.add( light2 );

	var triangles = 2;

	var geometry = new THREE.BufferGeometry();

	var positions = new Float32Array( triangles * 3 * 3 );  // buffer arrray, position of vertices
	var colors = new Float32Array( triangles * 3 * 3 );		// buffer arrray, vertexColors

		// 4 positions  ...
		
		var ax = 0;
		var ay = 0;
		var az = 0;

		var bx = 100;
		var by = 0;
		var bz = 100;

		var cx = 0;
		var cy = 0;
		var cz = 100;
  
  		var dx = 0;
		var dy = 100;
		var dz = 50;

		// ... some positions are needed several times
		
		// first triangle
		positions[ 0 ] = ax;
		positions[ 1 ] = ay;
		positions[ 2 ] = az;

		positions[ 3 ] = bx;
		positions[ 4 ] = by;
		positions[ 5 ] = bz;

		positions[ 6 ] = cx;
		positions[ 7 ] = cy;
		positions[ 8 ] = cz;
		
      	// second triangle
        positions[ 9 ] = ax;
		positions[ 10 ] = ay;
		positions[ 11 ] = az;

		positions[ 12 ] = bx;
		positions[ 13 ] = by;
		positions[ 14 ] = bz;

		positions[ 15 ] = dx;
		positions[ 16 ] = dy;
		positions[ 17 ] = dz;
      
		// vertex colors
		
		// first triangle
		colors[ 0]  = 0.9;
		colors[ 1 ] = 0.9;
		colors[ 2 ] = 0.0;

		colors[ 3 ] = 0.9;
		colors[ 4 ] = 0.9;
		colors[ 5 ] = 0.0;

		colors[ 6 ] = 0.9;
		colors[ 7 ] = 0.9;
		colors[ 8 ] = 0.0;
		
  		// second triangle
  		colors[ 9]  = 1;
		colors[ 10 ] = 0;
		colors[ 11 ] = 0;

		colors[ 12 ] = 0;
		colors[ 13 ] = 1;
		colors[ 14 ] = 0;

		colors[ 15 ] = 0;
		colors[ 16 ] = 0;
		colors[ 17 ] = 1;

	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ));
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors,	side: THREE.DoubleSide } );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	
	// -------
	
	var uvTex	= new THREE.TextureLoader().load( "uvgrid01.png" );
	var material01 = new THREE.MeshBasicMaterial( {  map: uvTex,   side: THREE.DoubleSide, } );	//   uv grid
	
	var geometry01 = new THREE.BufferGeometry();
	
	var vertices = new Float32Array( [
	   -50, -50,  50,
		50, -50,  50,
		50,  50,  50,
	
		 50,  50, 50,
		-50,  50, 50,
		-50, -50, 50
	] );
	var uvs = new Float32Array( [
		0,   0,
		1,   0, 
		1,   1, 
	
		1,   1, 
		0,   1, 
		0,   0
	] );
	
	geometry01.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry01.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
	mesh01 = new THREE.Mesh( geometry01, material01 );
	
	scene.add( mesh01 );
	

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );		
	var time = Date.now() * 0.001;
	mesh.rotation.y = time;
	mesh01.rotation.z = time;
	renderer.render( scene, camera );

}

