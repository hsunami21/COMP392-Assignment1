/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var head, body, arm1, arm2, leg1, leg2;
var bodyMesh;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    // Instantiate a new Object3D (the body mesh) object
    bodyMesh = new THREE.Object3D();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    console.log("Added Fog to scene...");
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0xffffff }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0, 60, 40);
    addControl(control);
    console.log("Added Control to scene...");
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    // Head
    head = new THREE.Mesh(new THREE.CubeGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    head.position.y = 19;
    bodyMesh.add(head);
    // Body
    body = new THREE.Mesh(new THREE.CubeGeometry(8, 10, 2), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    body.position.y = 12;
    bodyMesh.add(body);
    // Arm 1
    arm1 = new THREE.Mesh(new THREE.CubeGeometry(8, 2, 2), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    arm1.position.x = -8;
    arm1.position.y = 16;
    bodyMesh.add(arm1);
    // Arm 2
    arm2 = new THREE.Mesh(new THREE.CubeGeometry(8, 2, 2), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    arm2.position.x = 8;
    arm2.position.y = 16;
    bodyMesh.add(arm2);
    // Leg 1
    leg1 = new THREE.Mesh(new THREE.CubeGeometry(2, 7, 2), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    leg1.position.x = -3;
    leg1.position.y = 7 * 0.5;
    bodyMesh.add(leg1);
    // Leg 2
    leg2 = new THREE.Mesh(new THREE.CubeGeometry(2, 7, 2), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    leg2.position.x = 3;
    leg2.position.y = 7 * 0.5;
    bodyMesh.add(leg2);
    scene.add(bodyMesh);
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed', 0, 0.5);
    gui.add(controlObject, 'addCube');
    gui.add(controlObject, 'removeCube');
    gui.add(controlObject, 'outputObjects');
    gui.add(controlObject, 'numberOfObjects').listen();
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    // rotate the cubes around its axes
    scene.traverse(function (threeObject) {
        if (threeObject == bodyMesh) {
            threeObject.rotation.x += control.rotationSpeed;
            threeObject.rotation.y += control.rotationSpeed;
            threeObject.rotation.z += control.rotationSpeed;
        }
    });
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map