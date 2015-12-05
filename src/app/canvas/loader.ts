import {Component, Input, Inject, ElementRef} from 'angular2/angular2';
import {BluePrint, Position} from '../blueprint/blueprint';
import {Drawing} from '../blueprint/drawing';

@Component({
	selector: "load-canvas",
	inputs: ["drawing"],
	providers: [ElementRef],
	template: ``
})
export class LoadCanvas {
	@Input("drawing") public drawing: Drawing;
	public height: number;
	public width: number;

	constructor(
		@Inject(ElementRef) public element: ElementRef
	) {
		this.height = this.element.nativeElement.clientHeight
		this.width = this.element.nativeElement.clientWidth
	}

	onInit() {
		if (this.drawing && this.drawing.canvas) {
			this.drawing.canvas.style.position = "absolute";
			this.drawing.canvas.width = this.width
			this.drawing.canvas.height = this.height
			this.element.nativeElement.appendChild(this.drawing.canvas)
		}
	}
}