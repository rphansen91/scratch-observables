import {Component, NgFor, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import {Drawing} from '../blueprint/drawing';

@Component({
	selector: "instructions",
	styles: [
		".instruction {position: relative;width: 95%; height: 100px; margin-top: 10px; margin-bottom: 10px; margin-left: 2.5%; border-radius: 8px; overflow: hidden; padding: 20px 40px; box-shadow: black 0 2px 5px; box-sizing: border-box;}",
		".column {width: 25%; float: left; color: #fff; box-sizing: border-box;}",
		".line {border-radius: 100%; position: relative; top: 0; left: 0; right: 0; bottom: 0; margin: auto;}",
		".selected {color: green;}",
		".speedInput {width: 100%;}"
	],
	directives: [NgFor, NgIf, FORM_DIRECTIVES],
	template: `
		<div class="instruction" *ng-for="#instruction of drawing.instructions; #i=index;" (click)="select(i)">
			<div class="column" [class.selected]="instruction.selected">
				{{i}} <span>{{(instruction.image)?"Image":"Line"}}</span>
			</div>
			<div class="column">
				<input class="speedInput"  [(ng-model)]="instruction.speedIndex">
			</div>
			
			<div class="column" *ng-if="!instruction.image">
				<div class="line" [style.height]="instruction.size*2" [style.width]="instruction.size*2" [style.background-color]="instruction.color"></div>
			</div>
			<div class="column" *ng-if="instruction.image">
				Image: <img style="height: 100%;" src="{{instruction.image.dataSrc}}"/></div>

			<div class="column"><button (click)="removeInstruction(i)">X</button></div>
		</div>
	`
})
export class Instructions {
	public drawing: Drawing;

	constructor () {
		this.drawing = Drawing.getInstance()
	}
	removeInstruction (index: number) {
		this.drawing.removeLine(index)
	}
	select(index: number) {
		this.drawing.instructions.forEach((instruction) => {instruction.unselect()})
		this.drawing.instructions[index].select()
	}
}