import {Pouch} from "./db"
import {BluePrint} from "../blueprint/blueprint"

export class Scratches {
	static instance: Scratches;
	static isCreating: boolean = false;

	public all: Pouch;

	constructor () {
		if (Scratches.isCreating) {
			this.all = new Pouch("ALL_MY_SCRATCHES")
		} else {
			throw new Error("Get all scrathes using Scratches.getInstance().all.subscribe()")
		}
	}

	static getInstance () {
		if (Scratches.instance == null) {
			Scratches.isCreating = true;
			Scratches.instance = new Scratches()
			Scratches.isCreating = false;
		}
		return Scratches.instance
	}


	saveNewScratch (name: string, instructions: BluePrint[]):Promise<Scratch> {
		var scratch = new Scratch(name, instructions)

		return this.all.add(scratch)
	}

}

export class Scratch {

	constructor(public name: string, public instructions: BluePrint[]) {}

	addInstructions(instructions: BluePrint[]) {
		this.instructions = instructions
		return this;
	}
	removeInstruction(instruction: BluePrint) {

	}
}