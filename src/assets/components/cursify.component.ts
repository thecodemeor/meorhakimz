import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SpaceringCursorService } from 'src/service/spacering-cursor.service';
import { RainbowfluidCursorService } from 'src/service/rainbowfluid-cursor.service';

@Component({
    selector: 'app-cursor-canvas',
    template: `
        <!-- <canvas #canvasElement></canvas> -->
        <canvas id="fluid"></canvas>
    `,
    styles: `
        canvas {
            position: fixed;
            top: 0; left: 0;
            width: 100dvw; height: 100dvh;
        }
    `,
    standalone: false
})
export class CursifyComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild( 'canvasElement' ) canvasElement!: ElementRef< HTMLCanvasElement >;

    constructor( private canvasCursorService: SpaceringCursorService ) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // For Space Ring
        if ( this.canvasElement ) {
            this.canvasCursorService.initializeCanvas( this.canvasElement.nativeElement );
        }

        // For Fluid
        RainbowfluidCursorService()
    }

    ngOnDestroy(): void {
        this.canvasCursorService.destroyCanvas();
    }
}