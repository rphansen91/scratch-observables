import {Component, Input, NgIf} from 'angular2/angular2';
import {CurrentType} from '../blueprint/drawing';

@Component({
	selector: "image-selector",
	template: `
		<input type="file" accept="image/*" (change)="changed($event)"/>
	`
})
export class ImageSelector {
	static reader: FileReader;
	static currentType: CurrentType;

	constructor () {
		ImageSelector.currentType = CurrentType.getInstance()
		ImageSelector.reader = new FileReader()

		ImageSelector.reader.onloadend = ImageSelector.onImageConvert;
	}

	changed (event: any) {
		if (event.target && event.target.files && event.target.files.length) {
			ImageSelector.reader.readAsDataURL(event.target.files[0])
		}
	}

	static onImageConvert (data: any) {
		ImageSelector.currentType.setImage(data.target.result)
	}
}