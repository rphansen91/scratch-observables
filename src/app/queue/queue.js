var Queue = (function () {
    function Queue() {
        if (Queue.isCreating) { }
        else {
            throw new Error("Use Queue.getInstance() instead of keyword new");
        }
    }
    Queue.getInstance = function () {
        if (Queue.instance == null) {
            Queue.isCreating = true;
            Queue.instance = new Queue();
            Queue.isCreating = false;
        }
        return Queue.instance;
    };
    Queue.prototype.addDrawing = function (drawing) {
        this.drawing = drawing;
        this.ammount = this.drawing.instructions.length;
        return this;
    };
    Queue.prototype.begin = function () {
        Queue.callAndIncrement(0);
    };
    Queue.callAndIncrement = function (i) {
        if (Queue.instance.drawing && i < Queue.instance.ammount) {
            Queue.instance.drawing.renderInstruction(i)
                .then(function () {
                i++;
                Queue.callAndIncrement(i);
            });
        }
    };
    Queue.isCreating = false;
    return Queue;
})();
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map