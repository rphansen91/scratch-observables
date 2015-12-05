var BluePrint = (function () {
    function BluePrint(options) {
        this.isDrawing = false;
        this.selected = false;
        this.speedIndex = 1;
        if (options) {
            this.isDrawing = (options.isDrawing || false);
            this.selected = (options.selected || false);
            this.begin = (options.begin || 0);
            this.end = (options.end || 0);
            this.speedIndex = (options.speedIndex || 1);
            this.points = (options.points || {});
            this.size = (options.size || 10);
            this.color = (options.color || "rgb(255,255,255)");
            if (options.image && options.image.dataSrc) {
                this.setImageData(options.image.dataSrc);
            }
        }
    }
    BluePrint.prototype.setImageData = function (dataUrl) {
        if (dataUrl && dataUrl.length) {
            this.image = new ImageData(dataUrl);
        }
        return this;
    };
    BluePrint.prototype.start = function () {
        this.points = {};
        this.isDrawing = true;
        this.begin = new Date().getTime();
        return this;
    };
    BluePrint.prototype.stop = function () {
        this.isDrawing = false;
        this.end = new Date().getTime();
    };
    BluePrint.prototype.addPoint = function (x, y) {
        var point = new LinePoint();
        var time = new Date().getTime();
        point.setPosition(x, y, time);
        this.points[time] = point;
        return this.points[time];
    };
    BluePrint.prototype.getRenderHeight = function (point) {
        if (this.image) {
            return (this.image.imageElement.height / this.image.imageElement.width) * this.size;
        }
        else {
            return this.size;
        }
    };
    BluePrint.prototype.getRenderWidth = function (point) {
        return this.size;
    };
    BluePrint.prototype.select = function () {
        this.selected = true;
    };
    BluePrint.prototype.unselect = function () {
        this.selected = false;
    };
    BluePrint.intervalTime = 17;
    return BluePrint;
})();
exports.BluePrint = BluePrint;
var LinePoint = (function () {
    function LinePoint() {
    }
    LinePoint.prototype.setPosition = function (x, y, time) {
        this.time = time;
        this.position = new Position(x, y);
        return this;
    };
    return LinePoint;
})();
exports.LinePoint = LinePoint;
var ImageData = (function () {
    function ImageData(dataSrc) {
        this.dataSrc = dataSrc;
        this.imageElement = document.createElement("img");
        this.imageElement.src = dataSrc;
    }
    ImageData.prototype.setDataSrc = function (src) {
        this.dataSrc = src;
    };
    return ImageData;
})();
exports.ImageData = ImageData;
var Position = (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
})();
exports.Position = Position;
//# sourceMappingURL=blueprint.js.map