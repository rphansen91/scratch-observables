import {Drawing} from '../blueprint/drawing'
import {BluePrint} from '../blueprint/blueprint'

export class Queue {
	public drawing: Drawing;
	public ammount: number;

	static instance: Queue;
	static isCreating: boolean = false;

	constructor () {
		if (Queue.isCreating) {} else {
			throw new Error("Use Queue.getInstance() instead of keyword new")
		}
	}

	static getInstance () {
		if (Queue.instance == null) {
			Queue.isCreating = true;
			Queue.instance = new Queue()
			Queue.isCreating = false;
		}
		return Queue.instance
	}

	addDrawing(drawing: Drawing) {
		this.drawing = drawing;
		this.ammount = this.drawing.instructions.length;
		return this;
	}

	begin () {
		Queue.callAndIncrement(0)
	}

	static callAndIncrement (i: number) {
		if (Queue.instance.drawing && i < Queue.instance.ammount) {
			Queue.instance.drawing.renderInstruction(i)
			.then(() => {
				i++;
				Queue.callAndIncrement(i)
			})
		}
	}
}