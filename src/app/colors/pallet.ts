import {Component, NgFor, FORM_DIRECTIVES} from 'angular2/angular2';
import {CurrentType} from '../blueprint/drawing';

@Component({
	selector: "color-pallet",
	styles: [
		'.pallet {}'
	],
	directives: [NgFor, FORM_DIRECTIVES],
	template: `
		<div class="pallet" *ng-for="#color of colors; #i=index;">
			<label>{{color}}: </label>
			<input type="number" [min]="min" [max]="max" [ng-model]="values[i]" (ng-model-change)="setColor($event, i)"/>
		</div>
	`
})
export class Colors {
	public values: number[] = [255, 255, 255];
	public colors: string[] = ["red", "green", "blue"];

	public max = 255;
	public min = 0;

	setColor (value: any, index: number) {
		var num = Number(value);
		num = Math.min(this.max, num)
		num = Math.max(this.min, num)
		this.values[index] = num;
		CurrentType.getInstance().setColor(this.getRgb())
	}

	getRgb (): string {
		return this.values.reduce((p: number, c: number, index: number, array: number[]) => {
			if (index < array.length - 1) { c += ","; }
			return p + c;
		}, "rgb(") + ")"
	}
}