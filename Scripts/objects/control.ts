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
            arm1.material.color.setHex(0x89cff0);
            arm2.material.color.setHex(0x89cff0);
            leg1.material.color.setHex(0x551a8b);
            leg2.material.color.setHex(0x551a8b);
        }
        
        // Reset scene
        public resetScene(): void {
            this.rotationSpeedX = 0;
            this.rotationSpeedY = 0;
            this.rotationSpeedZ = 0;
            
            bodyMesh.rotation.x = 0;
            bodyMesh.rotation.y = 0;
            bodyMesh.rotation.z = 0;
            
            head.material.color.setHex(0xffffff);
            body.material.color.setHex(0xffffff);
            arm1.material.color.setHex(0xffffff);
            arm2.material.color.setHex(0xffffff);
            leg1.material.color.setHex(0xffffff);
            leg2.material.color.setHex(0xffffff);
        }
        
        // show scene objects
        public outputObjects(): void {
            console.log(scene.children);
        }
    }
}
