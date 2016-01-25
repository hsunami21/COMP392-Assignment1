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
        // Change to random colors
        Control.prototype.randomColor = function () {
            head.material.setValues({ color: (Math.random() * 0xFFFFFF) });
            body.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            arm1.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            arm2.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            leg1.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            leg2.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
        };
        // Change to preset colors
        Control.prototype.presetColor = function () {
            head.material.setValues({ color: 0xffa500 });
            body.material.setValues({ color: 0xff69b4 });
            arm1.material.setValues({ color: 0x89cff0 });
            arm2.material.setValues({ color: 0x89cff0 });
            leg1.material.setValues({ color: 0x551a8b });
            leg2.material.setValues({ color: 0x551a8b });
        };
        // Reset scene
        Control.prototype.resetScene = function () {
            this.rotationSpeedX = 0;
            this.rotationSpeedY = 0;
            this.rotationSpeedZ = 0;
            bodyMesh.rotation.x = 0;
            bodyMesh.rotation.y = 0;
            bodyMesh.rotation.z = 0;
            head.material.setValues({ color: 0xffffff });
            body.material.setValues({ color: 0xffffff });
            arm1.material.setValues({ color: 0xffffff });
            arm2.material.setValues({ color: 0xffffff });
            leg1.material.setValues({ color: 0xffffff });
            leg2.material.setValues({ color: 0xffffff });
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