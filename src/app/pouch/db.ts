import * as PouchDB from "pouch";
import * as Rx from 'rx.all';

export class Pouch {
	db: any;
	items: any[];

	constructor (public name: string, public remoteCouch?: string) {
		this.db = new PouchDB(this.name);
	}

	subscribe (callback: any) {
		return Rx.Observable.fromPromise(this.get())
			.map((results) => { return results; }).subscribe(callback)
	}
	add (object: any) {
		var dataBase = this;

		object._id = new Date().toISOString();

		return new Promise((resolve, reject)=>{
			dataBase.db.put(object, (err, result) => {
				if (!err) {
					resolve(result)
				}
			})
		})
	}

	get () {
		var dataBase = this;
		return new Promise((resolve, reject) => {
			dataBase.db.allDocs({ include_docs: true, descending: false }, function(err, doc) {
				resolve(doc.rows)
			})
		})
	}
}