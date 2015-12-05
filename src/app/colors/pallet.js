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
var Colors = (function () {
    function Colors() {
        this.values = [255, 255, 255];
        this.colors = ["red", "green", "blue"];
        this.max = 255;
        this.min = 0;
    }
    Colors.prototype.setColor = function (value, index) {
        var num = Number(value);
        num = Math.min(this.max, num);
        num = Math.max(this.min, num);
        this.values[index] = num;
        drawing_1.CurrentType.getInstance().setColor(this.getRgb());
    };
    Colors.prototype.getRgb = function () {
        return this.values.reduce(function (p, c, index, array) {
            if (index < array.length - 1) {
                c += ",";
            }
            return p + c;
        }, "rgb(") + ")";
    };
    Colors = __decorate([
        angular2_1.Component({
            selector: "color-pallet",
            styles: [
                '.pallet {}'
            ],
            directives: [angular2_1.NgFor, angular2_1.FORM_DIRECTIVES],
            template: "\n\t\t<div class=\"pallet\" *ng-for=\"#color of colors; #i=index;\">\n\t\t\t<label>{{color}}: </label>\n\t\t\t<input type=\"number\" [min]=\"min\" [max]=\"max\" [ng-model]=\"values[i]\" (ng-model-change)=\"setColor($event, i)\"/>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], Colors);
    return Colors;
})();
exports.Colors = Colors;
//# sourceMappingURL=pallet.js.map