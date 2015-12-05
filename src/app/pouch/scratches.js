var db_1 = require("./db");
var Scratches = (function () {
    function Scratches() {
        if (Scratches.isCreating) {
            this.all = new db_1.Pouch("ALL_MY_SCRATCHES");
        }
        else {
            throw new Error("Get all scrathes using Scratches.getInstance().all.subscribe()");
        }
    }
    Scratches.getInstance = function () {
        if (Scratches.instance == null) {
            Scratches.isCreating = true;
            Scratches.instance = new Scratches();
            Scratches.isCreating = false;
        }
        return Scratches.instance;
    };
    Scratches.prototype.saveNewScratch = function (name, instructions) {
        var scratch = new Scratch(name, instructions);
        return this.all.add(scratch);
    };
    Scratches.isCreating = false;
    return Scratches;
})();
exports.Scratches = Scratches;
var Scratch = (function () {
    function Scratch(name, instructions) {
        this.name = name;
        this.instructions = instructions;
    }
    Scratch.prototype.addInstructions = function (instructions) {
        this.instructions = instructions;
        return this;
    };
    Scratch.prototype.removeInstruction = function (instruction) {
    };
    return Scratch;
})();
exports.Scratch = Scratch;
//# sourceMappingURL=scratches.js.map