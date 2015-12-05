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
var drawing_1 = require('../blueprint/drawing');
var ImageSelector = (function () {
    function ImageSelector() {
        ImageSelector.currentType = drawing_1.CurrentType.getInstance();
        ImageSelector.reader = new FileReader();
        ImageSelector.reader.onloadend = ImageSelector.onImageConvert;
    }
    ImageSelector.prototype.changed = function (event) {
        if (event.target && event.target.files && event.target.files.length) {
            ImageSelector.reader.readAsDataURL(event.target.files[0]);
        }
    };
    ImageSelector.onImageConvert = function (data) {
        ImageSelector.currentType.setImage(data.target.result);
    };
    ImageSelector = __decorate([
        angular2_1.Component({
            selector: "image-selector",
            template: "\n\t\t<input type=\"file\" accept=\"image/*\" (change)=\"changed($event)\"/>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], ImageSelector);
    return ImageSelector;
})();
exports.ImageSelector = ImageSelector;
//# sourceMappingURL=selector.js.map