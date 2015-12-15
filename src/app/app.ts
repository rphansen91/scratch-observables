import {bootstrap, Component, NgIf, NgFor} from 'angular2/angular2';
import {CanvasControl, CanvasReplay} from './canvas/canvas'
import {BluePrint} from './blueprint/blueprint';
import {Drawing, CurrentType} from './blueprint/drawing';
import {Scratches} from './pouch/scratches'

@Component({
    selector: 'scratch-builder',
    directives: [CanvasControl, CanvasReplay, NgIf, NgFor],
    styles: [
		".scratchContainer {position: absolute; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,1);height: 100%;width: 100%;overflow: hidden;}",
		".scratchCanvasContainer {position: absolute; margin: auto; top: 5%; left: 0; right: 0; width: 90%; height: 65%; background-color: rgba(255,255,255,0.15); border-radius: 20px;}",
		".scratchReplayContainer {position: absolute; margin: auto; top: 5%; left: 0; right: 0; width: 90%; height: 65%; background-color: rgba(255,255,255,0); border-radius: 20px;}",
		".controls {position: absolute; margin: auto; bottom: 0; left: 0; right: 0; height: 30%; width: 90%;}",
		".buttons {position: relative; width: 265px; height: 100px; left: 0; right: 0; margin: auto;}",
		".button {width: 60px; height: 60px; margin: 20px 1.5px; border-radius: 12px; outline: none!important;}",
    ],
	template: `
		<div class="scratchContainer">
			
	    	<canvas-control *ng-if="editing" class="scratchCanvasContainer"></canvas-control>
	    	
			<canvas-replay *ng-if="!editing" class="scratchReplayContainer"></canvas-replay>

	    	<div class="controls">
	    		<div class="buttons">
					<button class="button" (click)="draw()">Play</button>
		    		<button class="button" (click)="save()">Save</button>
		    		<button class="button" (click)="delete()">Delete</button>
		    		<button class="button" (click)="edit()">Edit</button>
	    		</div>

	    		<div style="color: #fff;" *ng-for="#scratch of all" (click)="setInstructions(scratch.doc.instructions)">{{scratch.doc.name}}</div>
	    	</div>
    	</div>
    `
})
class ScratchBuilder {
	public canvas: HTMLCanvasElement;
	public drawing: Drawing;
	public currentLine: number = 0;

	public scratches: Scratches;
	public all: any[];

	public editing: boolean = true;

	constructor() {
		this.drawing = Drawing.getInstance()
		this.scratches = Scratches.getInstance();

		var that = this;
		
		that.scratches.all.get()
			.then((all) => { that.all = all; })
		
		that.scratches.all.changes()
		.on('change', function(change) {
			that.scratches.all.get()
			.then((all) => { that.all = all; })
			console.log(change)
		}).on('error', function(err) {
			console.log(err)
		})
	}

	setInstructions(instructions: BluePrint[]) {
		this.drawing.setNewInstructions(instructions)
		this.drawing.viewResult()
		this.editing = false;
	}

	save () {
		
		var name = prompt("What would you like to call this")
		if (name && name.length) {
			this.scratches.saveNewScratch(name, this.drawing.instructions)
			.then(()=>{
				this.scratches.all.get()
				.then((all) => { this.all = all; })
			})
		}

	}

	draw () {
		this.editing = false;
		this.drawing.play()
	}

	edit() {
		this.drawing.viewResult()
		this.editing = true;
	}

	delete() {
		this.drawing.cleanAll()
		this.drawing.deleteInstructions();
	}
}

bootstrap(ScratchBuilder);