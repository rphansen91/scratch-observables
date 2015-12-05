import {Component, Input, NgIf} from 'angular2/angular2';
import {Position, ImageData} from '../blueprint/blueprint';
import {CurrentType} from '../blueprint/drawing';

@Component({
	selector: "cursor",
	directives: [NgIf],
	inputs: ["position", "size"],
	styles: [
		".cursor {position: absolute; border-radius: 100%; z-index: 1001;}",
		".cursorCircle {width: 100%; height: 100%;}",
		".cursorBkgdImg  {background-size: contain; background-repeat: no-repeat; background-position: top center; width: 100%; height: 200%; }"
	],
	template: `
		<div class="cursor" *ng-if="position" [style.top]="topPosition()" [style.left]="leftPosition()" [style.height]="getHeight()" [style.width]="getWidth()" [style.overflow]="(type.dataSrc)?'visible':'hidden'">
			<div *ng-if="!type.dataSrc" class="cursorCircle" [style.background-color]="type.color"></div>
			<div *ng-if="type.dataSrc"  class="cursorBkgdImg" [style.background-image]="'url(' + type.dataSrc + ')'"/>
		</div>
	`
})
export class Cursor {
	@Input() public position: Position;
	@Input() public size: number;

	public type: CurrentType;

	constructor () {
		this.type = CurrentType.getInstance()
	}

	topPosition () {
		if (this.type.dataSrc) {
			return this.position.y;
		} else {
			return this.position.y - this.size;
		}
	}

	leftPosition() {
		if (this.type.dataSrc) {
			return this.position.x;
		} else {
			return this.position.x - this.size;
		}
	}

	getHeight () {
		if (this.type.dataSrc) {
			return this.size;
		} else {
			return this.size * 2;
		}
	}
	getWidth () {
		if (this.type.dataSrc) {
			return this.size;
		} else {
			return this.size * 2;
		}
	}
}