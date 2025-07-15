// src/app/canvas-cursor/canvas-cursor.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SpaceringCursorService } from 'src/service/spacering-cursor.service';

@Component({
    selector: 'app-spacering-cursor',
    template: `<canvas #canvasElement></canvas>`,
    styles: `
        canvas {
            position: fixed;
            top: 0; left: 0;
        }
    `,
    standalone: false
})
export class SpaceRingCursor implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild( 'canvasElement' ) canvasElement!: ElementRef< HTMLCanvasElement >;

    constructor( private canvasCursorService: SpaceringCursorService ) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        if ( this.canvasElement ) {
            this.canvasCursorService.initializeCanvas( this.canvasElement.nativeElement );
        }
    }

    ngOnDestroy(): void {
        this.canvasCursorService.destroyCanvas();
    }
}