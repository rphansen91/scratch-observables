var blueprint_1 = require('./blueprint');
var queue_1 = require('../queue/queue');
var Drawing = (function () {
    function Drawing() {
        this.instructions = [];
        this.currentLine = 0;
        if (!Drawing.isCreating) {
            throw new Error("Only one at a time please");
        }
        else {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
        }
    }
    Drawing.getInstance = function () {
        if (Drawing.instance == null) {
            Drawing.isCreating = true;
            Drawing.instance = new Drawing();
            Drawing.isCreating = false;
        }
        return Drawing.instance;
    };
    Drawing.prototype.setNewInstructions = function (instructions) {
        this.cleanAll();
        this.instructions = instructions.map(function (instruction) {
            return new blueprint_1.BluePrint(instruction);
        });
        this.currentLine = this.instructions.length;
    };
    Drawing.prototype.viewResult = function () {
        var _this = this;
        this.cleanAll();
        this.instructions.forEach(function (instruction, index) { _this.viewInstruction(index); });
    };
    Drawing.prototype.cleanAll = function () {
        this.intervalCancel();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Drawing.prototype.deleteInstructions = function () {
        this.instructions = [];
        this.currentLine = 0;
    };
    Drawing.prototype.removeLine = function (index) {
        if (this.instructions && this.instructions[index]) {
            this.removeInstruction(index);
            this.instructions.splice(index, 1);
            this.currentLine = this.instructions.length;
        }
    };
    Drawing.prototype.startNewLine = function (size, color, dataSrcUrl) {
        var options = {};
        options.size = size;
        options.color = color;
        options.image = new blueprint_1.ImageData(dataSrcUrl);
        var newLine = new blueprint_1.BluePrint(options).start();
        this.instructions.push(newLine);
    };
    Drawing.prototype.addPoint = function (x, y) {
        if (this.instructions[this.currentLine] && this.instructions[this.currentLine].isDrawing) {
            var point = this.instructions[this.currentLine].addPoint(x, y);
            this.drawPoint(this.currentLine, point);
        }
    };
    Drawing.prototype.endNewLine = function () {
        if (this.instructions[this.currentLine] && this.instructions[this.currentLine].isDrawing) {
            this.instructions[this.currentLine].stop();
            this.currentLine++;
        }
    };
    Drawing.prototype.deleteLastLine = function () {
        if (this.instructions && this.instructions.length) {
            var lastLine = this.instructions.pop();
            this.currentLine--;
        }
    };
    Drawing.prototype.play = function () {
        this.cleanAll();
        queue_1.Queue.getInstance()
            .addDrawing(this)
            .begin();
    };
    Drawing.prototype.playAll = function () {
        var _this = this;
        this.cleanAll();
        this.instructions.forEach(function (instruction, index) { _this.renderInstruction(index); });
    };
    Drawing.prototype.viewInstruction = function (index) {
        var _this = this;
        if (this.instructions && this.instructions[index].points) {
            var timeoutId = setTimeout(function () {
                for (var time in _this.instructions[index].points) {
                    _this.drawPoint(index, _this.instructions[index].points[time]);
                }
                clearTimeout(timeoutId);
            }, 0);
        }
    };
    Drawing.prototype.renderInstruction = function (index) {
        var _this = this;
        if (this.instructions && this.instructions[index]) {
            return new Promise(function (resolve, reject) {
                var instruction = _this.instructions[index];
                var time = instruction.begin;
                _this.sequenceId = setInterval(function () {
                    for (var i = time; i < time + blueprint_1.BluePrint.intervalTime * instruction.speedIndex; i++) {
                        if (instruction.points && instruction.points[i]) {
                            _this.drawPoint(index, instruction.points[i]);
                        }
                    }
                    time += blueprint_1.BluePrint.intervalTime * instruction.speedIndex;
                    if (time && time >= instruction.end) {
                        resolve();
                        _this.intervalCancel();
                    }
                }, blueprint_1.BluePrint.intervalTime);
            });
        }
    };
    Drawing.prototype.removeInstruction = function (index) {
        if (this.instructions && this.instructions[index]) {
            for (var time in this.instructions[index].points) {
                this.removePoint(index, this.instructions[index].points[time]);
            }
        }
    };
    Drawing.prototype.drawPoint = function (index, point) {
        var instruction = this.instructions[index];
        if (instruction.image) {
            if (instruction.previous) {
                this.removePoint(index, instruction.previous);
            }
            this.context.drawImage(instruction.image.imageElement, 0, 0, instruction.image.imageElement.width, instruction.image.imageElement.height, point.position.x, point.position.y, instruction.getRenderWidth(point), instruction.getRenderHeight(point));
            instruction.previous = point;
        }
        else if (instruction.color) {
            this.context.fillStyle = instruction.color;
            this.context.beginPath();
            this.context.arc(point.position.x, point.position.y, instruction.size, 0, 2 * Math.PI);
            this.context.fill();
        }
    };
    Drawing.prototype.removePoint = function (index, point) {
        var instruction = this.instructions[index];
        if (instruction.image) {
            this.context.clearRect(point.position.x, point.position.y, this.instructions[index].getRenderWidth(point), this.instructions[index].getRenderHeight(point));
        }
        else if (instruction.color) {
            this.context.clearRect(point.position.x - instruction.size, point.position.y - instruction.size, this.instructions[index].size * 2, this.instructions[index].size * 2);
        }
    };
    Drawing.prototype.intervalCancel = function () {
        if (this.sequenceId) {
            clearInterval(this.sequenceId);
        }
    };
    Drawing.isCreating = false;
    return Drawing;
})();
exports.Drawing = Drawing;
var CurrentType = (function () {
    function CurrentType(color, dataSrc) {
        this.color = color;
        this.dataSrc = dataSrc;
        if (!CurrentType.isCreating) {
            throw new Error("Can only have one point type at a time");
        }
    }
    CurrentType.getInstance = function () {
        if (CurrentType.instance == null) {
            CurrentType.isCreating = true;
            CurrentType.instance = new CurrentType("rgba(255,255,255,1)");
            CurrentType.isCreating = false;
        }
        return CurrentType.instance;
    };
    CurrentType.prototype.setColor = function (color) {
        this.dataSrc = null;
        this.color = color;
    };
    CurrentType.prototype.setImage = function (imageDate) {
        this.dataSrc = imageDate;
    };
    CurrentType.isCreating = false;
    return CurrentType;
})();
exports.CurrentType = CurrentType;
//# sourceMappingURL=drawing.js.map