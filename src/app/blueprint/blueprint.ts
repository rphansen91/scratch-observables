export interface Instruction {
	isDrawing?: boolean;
	selected?: boolean;

	begin?: number;
	end?: number;
	speedIndex?: number;

	size?: number;
	color?: string;
	image?: ImageData;

	points?: any;
	
}

export class BluePrint {

	public isDrawing: boolean = false;
	public selected: boolean = false;

	public begin: number;
	public end: number;
	public speedIndex: number = 1;

	public points: any;

	public image: ImageData;
	public color: string;
	public size: number;

	public previous: LinePoint;
	static intervalTime: number = 17;

	constructor(options?: Instruction) {
		if (options) {
			this.isDrawing = (options.isDrawing || false)
			this.selected = (options.selected || false)

			this.begin = (options.begin || 0)
			this.end = (options.end || 0)
			this.speedIndex = (options.speedIndex || 1)

			this.points = (options.points || {})
			this.size = (options.size || 10)
			this.color = (options.color || "rgb(255,255,255)")

			if (options.image && options.image.dataSrc) {
				this.setImageData(options.image.dataSrc)
			}
		}
	}
	
	setImageData (dataUrl: string) {
		if (dataUrl && dataUrl.length) {
			this.image = new ImageData(dataUrl)
		}
		return this;
	}
	start () {
		this.points = {}
		this.isDrawing = true;
		this.begin = new Date().getTime()
		
		return this;
	}
	stop() {
		this.isDrawing = false;
		this.end = new Date().getTime()
	}

	addPoint (x: number, y: number) {
		var point = new LinePoint()
		var time = new Date().getTime()

		point.setPosition(x, y, time)
		this.points[time] = point
		return this.points[time]
	}
	getRenderHeight(point: LinePoint):number {
		if (this.image) {
			return (this.image.imageElement.height / this.image.imageElement.width) * this.size
		} else {
			return this.size
		}
	}
	getRenderWidth(point: LinePoint): number {
		return this.size;
	}
	select () {
		this.selected = true
	}
	unselect() {
		this.selected = false
	}
}

export class LinePoint {
	public position: Position;
	public time: number;

	constructor() { }

	setPosition (x: number, y: number, time: number) {
		this.time = time;
		this.position = new Position(x, y)
		return this;
	}
}

export class ImageData {

	public imageElement: HTMLImageElement;

	constructor(public dataSrc: string) {
		this.imageElement = document.createElement("img")
		this.imageElement.src = dataSrc
	}

	setDataSrc (src: string) {
		this.dataSrc = src;
	}
}

export class Position {
	constructor (public x: number, public y: number) {}
}