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
var blueprint_1 = require('../blueprint/blueprint');
var drawing_1 = require('../blueprint/drawing');
var Cursor = (function () {
    function Cursor() {
        this.type = drawing_1.CurrentType.getInstance();
    }
    Cursor.prototype.topPosition = function () {
        if (this.type.dataSrc) {
            return this.position.y;
        }
        else {
            return this.position.y - this.size;
        }
    };
    Cursor.prototype.leftPosition = function () {
        if (this.type.dataSrc) {
            return this.position.x;
        }
        else {
            return this.position.x - this.size;
        }
    };
    Cursor.prototype.getHeight = function () {
        if (this.type.dataSrc) {
            return this.size;
        }
        else {
            return this.size * 2;
        }
    };
    Cursor.prototype.getWidth = function () {
        if (this.type.dataSrc) {
            return this.size;
        }
        else {
            return this.size * 2;
        }
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', blueprint_1.Position)
    ], Cursor.prototype, "position");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], Cursor.prototype, "size");
    Cursor = __decorate([
        angular2_1.Component({
            selector: "cursor",
            directives: [angular2_1.NgIf],
            inputs: ["position", "size"],
            styles: [
                ".cursor {position: absolute; border-radius: 100%; z-index: 1001;}",
                ".cursorCircle {width: 100%; height: 100%;}",
                ".cursorBkgdImg  {background-size: contain; background-repeat: no-repeat; background-position: top center; width: 100%; height: 200%; }"
            ],
            template: "\n\t\t<div class=\"cursor\" *ng-if=\"position\" [style.top]=\"topPosition()\" [style.left]=\"leftPosition()\" [style.height]=\"getHeight()\" [style.width]=\"getWidth()\" [style.overflow]=\"(type.dataSrc)?'visible':'hidden'\">\n\t\t\t<div *ng-if=\"!type.dataSrc\" class=\"cursorCircle\" [style.background-color]=\"type.color\"></div>\n\t\t\t<div *ng-if=\"type.dataSrc\"  class=\"cursorBkgdImg\" [style.background-image]=\"'url(' + type.dataSrc + ')'\"/>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], Cursor);
    return Cursor;
})();
exports.Cursor = Cursor;
//# sourceMappingURL=cursor.js.map