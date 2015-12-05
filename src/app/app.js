var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var canvas_1 = require('./canvas/canvas');
var drawing_1 = require('./blueprint/drawing');
var scratches_1 = require('./pouch/scratches');
var ScratchBuilder = (function () {
    function ScratchBuilder() {
        var _this = this;
        this.currentLine = 0;
        this.editing = true;
        this.drawing = drawing_1.Drawing.getInstance();
        this.scratches = scratches_1.Scratches.getInstance();
        this.scratches.all.subscribe(function (all) { _this.all = all; });
    }
    ScratchBuilder.prototype.setInstructions = function (instructions) {
        this.drawing.setNewInstructions(instructions);
        this.drawing.viewResult();
        this.editing = false;
    };
    ScratchBuilder.prototype.save = function () {
        var _this = this;
        var name = prompt("What would you like to call this");
        if (name && name.length) {
            this.scratches.saveNewScratch(name, this.drawing.instructions)
                .then(function () {
                _this.scratches.all.subscribe(function (all) { _this.all = all; });
            });
        }
    };
    ScratchBuilder.prototype.draw = function () {
        this.editing = false;
        this.drawing.play();
    };
    ScratchBuilder.prototype.edit = function () {
        this.drawing.viewResult();
        this.editing = true;
    };
    ScratchBuilder.prototype.delete = function () {
        this.drawing.cleanAll();
        this.drawing.deleteInstructions();
    };
    ScratchBuilder = __decorate([
        angular2_1.Component({
            selector: 'scratch-builder',
            directives: [canvas_1.CanvasControl, canvas_1.CanvasReplay, angular2_1.NgIf, angular2_1.NgFor],
            styles: [
                ".scratchContainer {position: absolute; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,1);height: 100%;width: 100%;overflow: hidden;}",
                ".scratchCanvasContainer {position: absolute; margin: auto; top: 5%; left: 0; right: 0; width: 90%; height: 65%; background-color: rgba(255,255,255,0.15); border-radius: 20px;}",
                ".scratchReplayContainer {position: absolute; margin: auto; top: 5%; left: 0; right: 0; width: 90%; height: 65%; background-color: rgba(255,255,255,0); border-radius: 20px;}",
                ".controls {position: absolute; margin: auto; bottom: 0; left: 0; right: 0; height: 30%; width: 90%;}",
                ".buttons {position: relative; width: 265px; height: 100px; left: 0; right: 0; margin: auto;}",
                ".button {width: 60px; height: 60px; margin: 20px 1.5px; border-radius: 12px; outline: none!important;}",
            ],
            template: "\n\t\t<div class=\"scratchContainer\">\n\t\t\t\n\t    \t<canvas-control *ng-if=\"editing\" class=\"scratchCanvasContainer\"></canvas-control>\n\t    \t\n\t\t\t<canvas-replay *ng-if=\"!editing\" class=\"scratchReplayContainer\"></canvas-replay>\n\n\t    \t<div class=\"controls\">\n\t    \t\t<div class=\"buttons\">\n\t\t\t\t\t<button class=\"button\" (click)=\"draw()\">Play</button>\n\t\t    \t\t<button class=\"button\" (click)=\"save()\">Save</button>\n\t\t    \t\t<button class=\"button\" (click)=\"delete()\">Delete</button>\n\t\t    \t\t<button class=\"button\" (click)=\"edit()\">Edit</button>\n\t    \t\t</div>\n\n\t    \t\t<div style=\"color: #fff;\" *ng-for=\"#scratch of all\" (click)=\"setInstructions(scratch.doc.instructions)\">{{scratch.doc.name}}</div>\n\t    \t</div>\n    \t</div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ScratchBuilder);
    return ScratchBuilder;
})();
angular2_1.bootstrap(ScratchBuilder);
//# sourceMappingURL=app.js.map