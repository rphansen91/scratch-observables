import {BluePrint, LinePoint, Instruction, ImageData} from './blueprint';
import {Queue} from '../queue/queue';

export class Drawing {
	public instructions: BluePrint[] = [];
	public currentLine: number = 0;

	public canvas: HTMLCanvasElement;
	public context: CanvasRenderingContext2D;

	public sequenceId: number;
	
	static instance: Drawing;
	static isCreating: boolean = false;

	constructor () {
		if (!Drawing.isCreating) {
			throw new Error("Only one at a time please")
		} else {
			this.canvas = <HTMLCanvasElement>document.createElement("canvas")
			this.context = this.canvas.getContext("2d")
		}
	}

	static getInstance () {
		if (Drawing.instance == null) {
			Drawing.isCreating = true;
			Drawing.instance = new Drawing();
			Drawing.isCreating = false;
		}
		return Drawing.instance;
	}
	setNewInstructions(instructions: BluePrint[]) {
		this.cleanAll()
		this.instructions = instructions.map((instruction) => {
			return new BluePrint(instruction)
		})
		this.currentLine = this.instructions.length
	}
	viewResult () {
		this.cleanAll()
		this.instructions.forEach((instruction: BluePrint, index: number) => {this.viewInstruction(index)})
	}
	cleanAll () {
		this.intervalCancel()
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
	}
	deleteInstructions () {
		this.instructions = []
		this.currentLine = 0;
	}
	removeLine (index: number) {
		if (this.instructions && this.instructions[index]) {
			this.removeInstruction(index)
			this.instructions.splice(index, 1)
			this.currentLine = this.instructions.length
		}
	}
	startNewLine(size: number, color?: string, dataSrcUrl?: string) {
		let options: Instruction = {}
		options.size = size;
		options.color = color;
		options.image = new ImageData(dataSrcUrl)

		var newLine = new BluePrint(options).start()
		this.instructions.push(newLine)
	}
	addPoint(x: number, y: number) {
		if (this.instructions[this.currentLine] && this.instructions[this.currentLine].isDrawing) {
			var point = this.instructions[this.currentLine].addPoint(x, y)
			this.drawPoint(this.currentLine, point)
		}
	}
	endNewLine () {
		if (this.instructions[this.currentLine] && this.instructions[this.currentLine].isDrawing) {
			this.instructions[this.currentLine].stop()
			this.currentLine++
		}
	}

	deleteLastLine () {
		if (this.instructions && this.instructions.length) {
			var lastLine = this.instructions.pop()
			this.currentLine--
		}
	}

	play () {
		this.cleanAll()

		Queue.getInstance()
		.addDrawing(this)
		.begin()
	}
	playAll () {
		this.cleanAll()
		this.instructions.forEach((instruction, index) => {this.renderInstruction(index)})
	}

	viewInstruction (index: number) {
		if (this.instructions && this.instructions[index].points) {
			var timeoutId = setTimeout(() => {
				for (var time in this.instructions[index].points) {
					this.drawPoint(index, this.instructions[index].points[time])
				}
				clearTimeout(timeoutId)
			}, 0)
		}
	}

	renderInstruction(index: number): Promise<any> {
		if (this.instructions && this.instructions[index]) {

			return new Promise((resolve, reject) => {

				var instruction = this.instructions[index];
				var time = instruction.begin;

				this.sequenceId = setInterval(() => {
					for (var i = time; i < time + BluePrint.intervalTime * instruction.speedIndex; i++) {
						if (instruction.points && instruction.points[i]) {
							this.drawPoint(index, instruction.points[i])
						}
					}

					time += BluePrint.intervalTime * instruction.speedIndex;

					if (time && time >= instruction.end) {
						resolve()
						this.intervalCancel()
					}
				}, BluePrint.intervalTime)

			})
		}
	}

	removeInstruction(index: number) {
		if (this.instructions && this.instructions[index]) {
			for (var time in this.instructions[index].points) {
				this.removePoint(index, this.instructions[index].points[time])
			}
		}
	}

	drawPoint (index: number, point: LinePoint) {
		var instruction = this.instructions[index]

		if (instruction.image) {
			if (instruction.previous) {
				this.removePoint(index, instruction.previous)
			}
			this.context.drawImage(instruction.image.imageElement, 0, 0, instruction.image.imageElement.width, instruction.image.imageElement.height, point.position.x, point.position.y, instruction.getRenderWidth(point), instruction.getRenderHeight(point))
			instruction.previous = point
		} else if (instruction.color) {
			this.context.fillStyle = instruction.color;
			this.context.beginPath()
			this.context.arc(point.position.x, point.position.y, instruction.size, 0, 2 * Math.PI);
			this.context.fill()
		}
	}
	removePoint(index: number, point: LinePoint) {
		var instruction = this.instructions[index]

		if (instruction.image) {
			this.context.clearRect(point.position.x, point.position.y, this.instructions[index].getRenderWidth(point), this.instructions[index].getRenderHeight(point))
		} else if (instruction.color) {
			this.context.clearRect(point.position.x - instruction.size, point.position.y - instruction.size, this.instructions[index].size * 2, this.instructions[index].size * 2)
		}
	}
	intervalCancel() {
		if (this.sequenceId) {
			clearInterval(this.sequenceId)
		}
	}
}


export class CurrentType {
	public height: number;
	public width: number;

	static instance: CurrentType;
	static isCreating: boolean = false;

	constructor(public color: string, public dataSrc?: string) {
		if (!CurrentType.isCreating) {
			throw new Error("Can only have one point type at a time")
		}
	}
	static getInstance() {
		if (CurrentType.instance == null) {
			CurrentType.isCreating = true;
			CurrentType.instance = new CurrentType("rgba(255,255,255,1)")
			CurrentType.isCreating = false;
		}
		return CurrentType.instance
	}
	setColor (color: string) {
		this.dataSrc = null;
		this.color = color;
	}
	setImage(imageDate: string) {
		this.dataSrc = imageDate;
	}
}