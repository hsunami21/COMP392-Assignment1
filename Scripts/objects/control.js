/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeedX, rotationSpeedY, rotationSpeedZ, planeWidth, planeHeight) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }
        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        // Remove Cube Method +++++++++++++++++++++++++++++++++
        Control.prototype.removeCube = function () {
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };
        // Add Cube Method
        Control.prototype.addCube = function () {
            var cubeSize = Math.ceil((Math.random() * 3));
            var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
            var cube = new objects.gameObject(cubeGeometry, cubeMaterial, -30 + Math.round((Math.random() * this._planeWidth)), Math.round((Math.random() * 5)), -20 + Math.round((Math.random() * this._planeHeight)));
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };
        // Change to random colors
        Control.prototype.randomColor = function () {
            head.material.color.setRGB(Math.random(), Math.random(), Math.random());
            body.material.color.setRGB(Math.random(), Math.random(), Math.random());
            arm1.material.color.setRGB(Math.random(), Math.random(), Math.random());
            arm2.material.color.setRGB(Math.random(), Math.random(), Math.random());
            leg1.material.color.setRGB(Math.random(), Math.random(), Math.random());
            leg2.material.color.setRGB(Math.random(), Math.random(), Math.random());
        };
        // Change to preset colors
        Control.prototype.presetColor = function () {
            head.material.color.setHex(0xffa500);
            body.material.color.setHex(0xff69b4);
            arm1.material.color.setHex(0xffff7f);
            arm2.material.color.setHex(0x89cff0);
            leg1.material.color.setHex(0x8c001a);
            leg2.material.color.setHex(0x551a8b);
        };
        // show scene objects
        Control.prototype.outputObjects = function () {
            console.log(scene.children);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map