/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;

var head, body, arm1, arm2, leg1, leg2;
var bodyMesh: THREE.Object3D;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    
    // Instantiate a new Object3D (the body mesh) object
    bodyMesh = new THREE.Object3D();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
    
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );
    console.log("Added Fog to scene...");
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

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
    head = new THREE.Mesh( new THREE.CubeGeometry( 4, 4, 4 ), new THREE.MeshBasicMaterial({color: 0x000000}) );
	head.position.y = 19;
    bodyMesh.add(head);
    
    // Body
    body = new THREE.Mesh( new THREE.CubeGeometry( 8, 10, 2 ), new THREE.MeshBasicMaterial({color: 0xff0000}) );
	body.position.y = 12;
    bodyMesh.add(body);
    
    // Arm 1
    arm1 = new THREE.Mesh( new THREE.CubeGeometry( 8, 2, 2 ), new THREE.MeshBasicMaterial({color: 0x00ff00}) );
    arm1.position.x = -8;
	arm1.position.y = 16;
    bodyMesh.add(arm1);
    
    // Arm 2
    arm2 = new THREE.Mesh( new THREE.CubeGeometry( 8, 2, 2 ), new THREE.MeshBasicMaterial({color: 0x00ff00}) );
    arm2.position.x = 8;
	arm2.position.y = 16;
    bodyMesh.add(arm2);
    
    // Leg 1
    leg1 = new THREE.Mesh( new THREE.CubeGeometry( 2, 7, 2 ), new THREE.MeshBasicMaterial({color: 0x0000ff}) );
    leg1.position.x = -3;
	leg1.position.y = 7 * 0.5;
    bodyMesh.add(leg1);
    
    // Leg 2
    leg2 = new THREE.Mesh( new THREE.CubeGeometry( 2, 7, 2 ), new THREE.MeshBasicMaterial({color: 0x0000ff}) );
    leg2.position.x = 3;
	leg2.position.y = 7 * 0.5;
    bodyMesh.add(leg2);
    
    scene.add(bodyMesh);
    
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control): void {
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
function gameLoop(): void {
    stats.update();
    
    // rotate the cubes around its axes
    scene.traverse(function(threeObject:THREE.Object3D) {
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
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
