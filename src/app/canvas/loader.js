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
var drawing_1 = require('../blueprint/drawing');
var LoadCanvas = (function () {
    function LoadCanvas(element) {
        this.element = element;
        this.height = this.element.nativeElement.clientHeight;
        this.width = this.element.nativeElement.clientWidth;
    }
    LoadCanvas.prototype.onInit = function () {
        if (this.drawing && this.drawing.canvas) {
            this.drawing.canvas.style.position = "absolute";
            this.drawing.canvas.width = this.width;
            this.drawing.canvas.height = this.height;
            this.element.nativeElement.appendChild(this.drawing.canvas);
        }
    };
    __decorate([
        angular2_1.Input("drawing"), 
        __metadata('design:type', drawing_1.Drawing)
    ], LoadCanvas.prototype, "drawing");
    LoadCanvas = __decorate([
        angular2_1.Component({
            selector: "load-canvas",
            inputs: ["drawing"],
            providers: [angular2_1.ElementRef],
            template: ""
        }),
        __param(0, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], LoadCanvas);
    return LoadCanvas;
})();
exports.LoadCanvas = LoadCanvas;
//# sourceMappingURL=loader.js.map