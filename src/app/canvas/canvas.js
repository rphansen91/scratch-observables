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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var loader_1 = require('./loader');
var blueprint_1 = require('../blueprint/blueprint');
var drawing_1 = require('../blueprint/drawing');
var instructions_1 = require('../blueprint/instructions');
var cursor_1 = require('../cursor/cursor');
var pallet_1 = require('../colors/pallet');
var selector_1 = require('../image/selector');
var CanvasControl = (function () {
    function CanvasControl(element) {
        this.element = element;
        this.size = 10;
        this.drawing = drawing_1.Drawing.getInstance();
        this.offsetTop = this.element.nativeElement.offsetTop;
        this.offsetLeft = this.element.nativeElement.offsetLeft;
        this.type = drawing_1.CurrentType.getInstance();
    }
    CanvasControl.prototype.start = function (event) {
        var _this = this;
        this.drawing.startNewLine(this.size, this.type.color, this.type.dataSrc);
        var id = setTimeout(function () { clearTimeout(id); _this.movement(event); }, 0);
    };
    CanvasControl.prototype.stop = function () {
        this.position = null;
        this.drawing.endNewLine();
    };
    CanvasControl.prototype.movement = function (event) {
        console.log(event);
        var xPosition = (typeof event.x == "number") ? event.x : event.touches[0].clientX;
        var yPosition = (typeof event.y == "number") ? event.y : event.touches[0].clientY;
        var x = xPosition - this.offsetLeft;
        var y = yPosition - this.offsetTop;
        this.position = new blueprint_1.Position(x, y);
        this.drawing.addPoint(x, y);
    };
    CanvasControl.prototype.changeSize = function (size) {
        size = Number(size);
        if (typeof size == "number" && size >= 0) {
            this.size = size;
        }
    };
    CanvasControl = __decorate([
        angular2_1.Component({
            selector: "canvas-control",
            styles: [
                ".canvasContainer {position: absolute;width:100%; height: 100%;z-index: 1000;cursor: none;overflow: hidden;}",
                ".controlContainer {position: absolute; z-index: 1001; width: 300px; height: 120px; background-color(255,255,255,0.9); border-radius: 8px; box-shadow: 2px 2px 5px black;}",
                ".typeSelect {position: relative; float: left; width: 100px; height: 120px; overflow: hidden;}",
                ".fullContainer {position: absolute;width:100%; height: 100%;}",
                ".instructionsContainer {position: absolute; top: 0; right: 0; z-index: 1001; width: 300px; max-height: 200px; overflow-y: scroll; background-color(255,255,255,0.9); border-radius: 8px; box-shadow: 0px 2px 5px black;}"
            ],
            directives: [loader_1.LoadCanvas, instructions_1.Instructions, cursor_1.Cursor, selector_1.ImageSelector, pallet_1.Colors, angular2_1.NgFor, angular2_1.NgIf, angular2_1.FORM_DIRECTIVES],
            template: "\n\t\t<div class=\"canvasContainer\" (mousedown)=\"start($event)\" (mouseup)=\"stop()\" (mouseleave)=\"stop()\" (mousemove)=\"movement($event)\" (touchstart)=\"start($event)\" (touchmove)=\"movement($event)\" (touchend)=\"stop()\" (touchleave)=\"stop()\">\n\t\t\t<cursor [position]=\"position\" [size]=\"size\"></cursor>\n\n\t\t\t<load-canvas [drawing]=\"drawing\" class=\"fullContainer\"><load-canvas>\n\t\t</div>\n\n\t\t<div class=\"controlContainer\">\n\t\t\t<div class=\"typeSelect\">\n\t\t\t\t<label>SIZE</label>\n\t\t\t\t<input type=\"number\" [(ng-model)]=\"size\">\n\t\t\t</div>\n\t\t\t<image-selector class=\"typeSelect\"></image-selector>\n    \t\t<color-pallet class=\"typeSelect\"></color-pallet>\n    \t</div>\n\n    \t<instructions class=\"instructionsContainer\"></instructions>\n\t"
        }),
        __param(0, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], CanvasControl);
    return CanvasControl;
})();
exports.CanvasControl = CanvasControl;
var CanvasReplay = (function () {
    function CanvasReplay() {
        this.preparedInfo = [];
        this.drawing = drawing_1.Drawing.getInstance();
    }
    CanvasReplay.prototype.start = function () {
        this.drawing.play();
    };
    CanvasReplay = __decorate([
        angular2_1.Component({
            selector: "canvas-replay",
            styles: [
                ".canvasContainers {position: absolute;width:100%; height: 100%;z-index: 1001;cursor: none;overflow: hidden;}",
                ".fullContainer {position: absolute;width:100%; height: 100%;}"
            ],
            directives: [loader_1.LoadCanvas, angular2_1.NgFor],
            template: "\n\t\t<div class=\"canvasContainers\" (click)=\"start()\">\n\t\t\t<load-canvas class=\"fullContainer\" [drawing]=\"drawing\"><load-canvas>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], CanvasReplay);
    return CanvasReplay;
})();
exports.CanvasReplay = CanvasReplay;
//# sourceMappingURL=canvas.js.map