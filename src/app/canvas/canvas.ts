import {Component, View, Input, Inject, NgFor, NgIf, ElementRef, FORM_DIRECTIVES} from 'angular2/angular2';
import {LoadCanvas} from './loader'
import {BluePrint, Position} from '../blueprint/blueprint';
import {Drawing, CurrentType} from '../blueprint/drawing';
import {Instructions} from '../blueprint/instructions';
import {Cursor} from '../cursor/cursor';
import {Colors} from '../colors/pallet';
import {ImageSelector} from '../image/selector'
import {MdInput, MdInputContainer} from 'material';

@Component({
	selector: "canvas-control",
	styles: [
		".canvasContainer {position: absolute;width:100%; height: 100%;z-index: 1000;cursor: none;overflow: hidden;}",
		".controlContainer {position: absolute; z-index: 1001; width: 300px; height: 120px; background-color(255,255,255,0.9); border-radius: 8px; box-shadow: 2px 2px 5px black;}",
		".typeSelect {position: relative; float: left; width: 100px; height: 120px; overflow: hidden;}",
		".fullContainer {position: absolute;width:100%; height: 100%;}",
		".instructionsContainer {position: absolute; top: 0; right: 0; z-index: 1001; width: 300px; max-height: 200px; overflow-y: scroll; background-color(255,255,255,0.9); border-radius: 8px; box-shadow: 0px 2px 5px black;}"
	],
	directives: [LoadCanvas, Instructions, Cursor, ImageSelector, Colors, NgFor, NgIf, FORM_DIRECTIVES],
	template: `
		<div class="canvasContainer" (mousedown)="start($event)" (mouseup)="stop()" (mouseleave)="stop()" (mousemove)="movement($event)" (touchstart)="start($event)" (touchend)="start($event)" (touchmove)="movement($event)">
			<cursor [position]="position" [size]="size"></cursor>

			<load-canvas [drawing]="drawing" class="fullContainer"><load-canvas>
		</div>

		<div class="controlContainer">
			<div class="typeSelect">
				<label>SIZE</label>
				<input type="number" [(ng-model)]="size">
			</div>
			<image-selector class="typeSelect"></image-selector>
    		<color-pallet class="typeSelect"></color-pallet>
    	</div>

    	<instructions class="instructionsContainer"></instructions>
	`
})
export class CanvasControl {
	public drawing: Drawing;

	public offsetTop: number;
	public offsetLeft: number;
	public position: Position;

	public size: number = 10;
	public type: CurrentType;

	constructor (
		@Inject(ElementRef) public element: ElementRef
	) {
		this.drawing = Drawing.getInstance()

		this.offsetTop = this.element.nativeElement.offsetTop
		this.offsetLeft = this.element.nativeElement.offsetLeft

		this.type = CurrentType.getInstance()
	}

	start(event: any) {
		this.drawing.startNewLine(this.size, this.type.color, this.type.dataSrc)
		var id = setTimeout(() => { clearTimeout(id); this.movement(event); }, 0)
	}

	stop() {
		this.position = null;
		this.drawing.endNewLine()
	}

	movement(event: any) {
		var x = Number(event.x - this.offsetLeft)
		var y = Number(event.y - this.offsetTop)

		this.position = new Position(x, y)
		this.drawing.addPoint(x, y)
	}

	changeSize(size: number) {
		size = Number(size)
		if (typeof size == "number" && size >= 0) {
			this.size = size;
		}
	}
}

@Component({
	selector: "canvas-replay",
	styles: [
		".canvasContainers {position: absolute;width:100%; height: 100%;z-index: 1001;cursor: none;overflow: hidden;}",
		".fullContainer {position: absolute;width:100%; height: 100%;}"
	],
	directives: [LoadCanvas, NgFor],
	template: `
		<div class="canvasContainers" (click)="start()">
			<load-canvas class="fullContainer" [drawing]="drawing"><load-canvas>
		</div>
	`
})
export class CanvasReplay {
	public drawing: Drawing;
	public preparedInfo: any[] = [];

	constructor() {
		this.drawing = Drawing.getInstance()
	}

	start () {
		this.drawing.play()
	}
}