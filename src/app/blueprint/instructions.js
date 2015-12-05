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
var Instructions = (function () {
    function Instructions() {
        this.drawing = drawing_1.Drawing.getInstance();
    }
    Instructions.prototype.removeInstruction = function (index) {
        this.drawing.removeLine(index);
    };
    Instructions.prototype.select = function (index) {
        this.drawing.instructions.forEach(function (instruction) { instruction.unselect(); });
        this.drawing.instructions[index].select();
    };
    Instructions = __decorate([
        angular2_1.Component({
            selector: "instructions",
            styles: [
                ".instruction {position: relative;width: 95%; height: 100px; margin-top: 10px; margin-bottom: 10px; margin-left: 2.5%; border-radius: 8px; overflow: hidden; padding: 20px 40px; box-shadow: black 0 2px 5px; box-sizing: border-box;}",
                ".column {width: 25%; float: left; color: #fff; box-sizing: border-box;}",
                ".line {border-radius: 100%; position: relative; top: 0; left: 0; right: 0; bottom: 0; margin: auto;}",
                ".selected {color: green;}",
                ".speedInput {width: 100%;}"
            ],
            directives: [angular2_1.NgFor, angular2_1.NgIf, angular2_1.FORM_DIRECTIVES],
            template: "\n\t\t<div class=\"instruction\" *ng-for=\"#instruction of drawing.instructions; #i=index;\" (click)=\"select(i)\">\n\t\t\t<div class=\"column\" [class.selected]=\"instruction.selected\">\n\t\t\t\t{{i}} <span>{{(instruction.image)?\"Image\":\"Line\"}}</span>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<input class=\"speedInput\"  [(ng-model)]=\"instruction.speedIndex\">\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class=\"column\" *ng-if=\"!instruction.image\">\n\t\t\t\t<div class=\"line\" [style.height]=\"instruction.size*2\" [style.width]=\"instruction.size*2\" [style.background-color]=\"instruction.color\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\" *ng-if=\"instruction.image\">\n\t\t\t\tImage: <img style=\"height: 100%;\" src=\"{{instruction.image.dataSrc}}\"/></div>\n\n\t\t\t<div class=\"column\"><button (click)=\"removeInstruction(i)\">X</button></div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], Instructions);
    return Instructions;
})();
exports.Instructions = Instructions;
//# sourceMappingURL=instructions.js.map