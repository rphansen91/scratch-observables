var PouchDB = require("pouch");
var Rx = require('rx.all');
var PouchAuth = require("pouch-authentication");
var Pouch = (function () {
    function Pouch(name, remoteCouch) {
        this.name = name;
        this.remoteCouch = remoteCouch;
        this.db = new PouchDB(this.name);
        debugger;
        console.log(PouchAuth);
    }
    Pouch.prototype.subscribe = function (callback) {
        return Rx.Observable.fromPromise(this.get())
            .map(function (results) { return results; }).subscribe(callback);
    };
    Pouch.prototype.add = function (object) {
        var dataBase = this;
        object._id = new Date().toISOString();
        return new Promise(function (resolve, reject) {
            dataBase.db.put(object, function (err, result) {
                if (!err) {
                    resolve(result);
                }
            });
        });
    };
    Pouch.prototype.changes = function () {
        var options = {
            since: 'now',
            live: true,
            include_docs: true
        };
        return this.db.changes(options);
    };
    Pouch.prototype.get = function () {
        var dataBase = this;
        return new Promise(function (resolve, reject) {
            dataBase.db.allDocs({ include_docs: true, descending: false }, function (err, doc) {
                resolve(doc.rows);
            });
        });
    };
    return Pouch;
})();
exports.Pouch = Pouch;
//# sourceMappingURL=db.js.map