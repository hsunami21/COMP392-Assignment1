/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        // PRIVATE INSTANCE VARIABLES
        private _planeWidth: number;
        private _planeHeight: number;
        
        // PUBLIC INSTANCE VARIABLES
        public rotationSpeedX: number;
        public rotationSpeedY: number;
        public rotationSpeedZ: number;
        public numberOfObjects: number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeedX: number, rotationSpeedY: number, rotationSpeedZ: number, planeWidth: number, planeHeight: number) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }


        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        
        // Remove Cube Method +++++++++++++++++++++++++++++++++
        public removeCube(): void {
            var allChildren: THREE.Object3D[] = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        }
        
        // Add Cube Method
        public addCube(): void {
            var cubeSize: number = Math.ceil((Math.random() * 3));
            var cubeGeometry: CubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial: LambertMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
            var cube = new gameObject(
                cubeGeometry,
                cubeMaterial,
                -30 + Math.round((Math.random() * this._planeWidth)),
                Math.round((Math.random() * 5)),
                -20 + Math.round((Math.random() * this._planeHeight)));
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        }
        
        // Change to random colors
        public randomColor(): void {
            head.material.color.setRGB(Math.random(), Math.random(), Math.random());
            body.material.color.setRGB(Math.random(), Math.random(), Math.random());
            arm1.material.color.setRGB(Math.random(), Math.random(), Math.random());
            arm2.material.color.setRGB(Math.random(), Math.random(), Math.random());
            leg1.material.color.setRGB(Math.random(), Math.random(), Math.random());
            leg2.material.color.setRGB(Math.random(), Math.random(), Math.random());
        }
        
        // Change to preset colors
        public presetColor(): void {
            head.material.color.setHex(0xffa500);
            body.material.color.setHex(0xff69b4);
            arm1.material.color.setHex(0xffff7f);
            arm2.material.color.setHex(0x89cff0);
            leg1.material.color.setHex(0x8c001a);
            leg2.material.color.setHex(0x551a8b);
        }
        
        // show scene objects
        public outputObjects(): void {
            console.log(scene.children);
        }
    }
}
