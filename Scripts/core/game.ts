/// <reference path="_reference.ts"/>

/*
    Source name: CubeMan
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: February 1, 2016
    Program Description: Creation of a humanoid figure using THREEJS and TypeScript
    Revision History:
        Commit #1: Added cube man
        Commit #2: Added rotation along each axis
        Commit #3: Added color changing
        Commit #4: Added textures
        Commit #5: Added reset scene function
        Commit #6: Added plane texture and moved spotlight
        Commit #7: Fixed gitignore file to use on Azure
        Commit #8: Changed body part object types
        Commit #9: Added header information to files
        Commit #10: Fixed reset scene function
*/

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

var head: gameObject;
var body: gameObject;
var arm1: gameObject;
var arm2: gameObject;
var leg1: gameObject;
var leg2: gameObject;
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
        new LambertMaterial({ map:  THREE.ImageUtils.loadTexture('../../Assets/Images/grass.jpg')}),
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
    spotLight.position.set(-40, 120, -40);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(0, 0, 0, 60, 40);
    addControl(control);
    console.log("Added Control to scene...");
    
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    // Head
    head = new gameObject(
            new THREE.CubeGeometry( 4, 4, 4 ), 
            new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('../../Assets/Images/face.jpg')}),
            0, 19, 0);
    bodyMesh.add(head);
    
    // Body
    body = new gameObject( 
            new THREE.CubeGeometry( 8, 10, 2 ), 
            new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('../../Assets/Images/brickBody.jpeg')}),
            0, 12, 0);
    bodyMesh.add(body);
    
    // Arm 1
    arm1 = new gameObject( 
            new THREE.CubeGeometry( 8, 2, 2 ), 
            new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('../../Assets/Images/paperArms.jpg')}),
            -8, 16, 0);
    bodyMesh.add(arm1);
    
    // Arm 2
    arm2 = new gameObject( 
            new THREE.CubeGeometry( 8, 2, 2 ), 
            new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('../../Assets/Images/paperArms.jpg')}),
            8, 16, 0);
    bodyMesh.add(arm2);
    
    // Leg 1
    leg1 = new gameObject( 
            new THREE.CubeGeometry( 2, 7, 2 ), 
            new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('../../Assets/Images/woodLegs.jpg')}),
            -3, 7 * 0.5, 0);
    bodyMesh.add(leg1);
    
    // Leg 2
    leg2 = new gameObject( 
            new THREE.CubeGeometry( 2, 7, 2 ), 
            new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('../../Assets/Images/woodLegs.jpg')}),
            3, 7 * 0.5, 0);
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
    gui.add(controlObject, 'rotationSpeedX', 0, 0.5);
    gui.add(controlObject, 'rotationSpeedY', 0, 0.5);
    gui.add(controlObject, 'rotationSpeedZ', 0, 0.5);
    gui.add(controlObject, 'randomColor');
    gui.add(controlObject, 'presetColor');
    gui.add(controlObject, 'resetScene');
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

            threeObject.rotation.x += control.rotationSpeedX;
            threeObject.rotation.y += control.rotationSpeedY;
            threeObject.rotation.z += control.rotationSpeedZ;
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
