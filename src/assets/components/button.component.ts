import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-button',
    standalone: false,
    template: `
        <button
            [ngClass]="buttonClass"
            [style.flex-direction]="directionFlex"
            (click)="triggerClick( $event )">
            <ng-content></ng-content>
            <span class="ripple"></span>
        </button>
    `,
    styles: `
        :host {
            display: flex;
            width: 100%; height: 100%;
            justify-content: center;
        }
        button {
            position: relative;
            display: flex;
            width: 100%; height: 100%;
            border: solid 1px var( --line-grayscale );
            border-radius: 1.25rem;
            background: rgba( 255, 255, 255,  0.5);
            backdrop-filter: blur( 50px ); // frosted blur
            -webkit-backdrop-filter: blur( 50px ); // for Safari
            justify-content: center;
            align-items: center;
            gap: 0.625rem;
            overflow: hidden;
            cursor: pointer;
            transition: 0.3s
        }
        button:hover { scale: 1.1}
        button:active { scale: 1}

        // Button Icon
        button.icon {
            width: unset; height: 100%;
            aspect-ratio: 1;
            border: none;
            border-radius: 50%;
            background: var( --primary );
        }

        // Ripple style
        .ripple {
            position: absolute;
            width: 10rem; height: 10rem;
            border-radius: 50%;
            background: var( --primary-dark );
            opacity: 0.1;
            transform: scale( 0 );
            pointer-events: none;
            z-index: 1;
            animation: ripple 0.6s linear forwards;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
})
export class ButtonComponent implements OnInit {
    @Input() button: string = 'button'
    @Input() direction?: string = 'row'
    constructor( private el: ElementRef, private renderer: Renderer2 ) {}

    buttonClass: string = ''
    directionFlex: string = 'row'
    ngOnInit() {
        if ( this.button === 'icon' ) {
            this.buttonClass = 'icon'
        } else { this.buttonClass = ''}

        if ( this.direction === 'column' ) {
            this.directionFlex = 'column'
        } else {
            this.directionFlex = 'row'
        }
    }

    // === Ripples =============================== //
    triggerClick( event: MouseEvent ): void {
        const button = this.el.nativeElement.querySelector( 'button' );

        // Remove any existing ripples to prevent multiple ripples overlapping
        const oldRipples = button.querySelectorAll( '.ripple' );
        oldRipples.forEach((ripple: HTMLElement) => {
            this.renderer.removeChild( button, ripple );
        });

        // Create the ripple div element
        const ripple = this.renderer.createElement( 'div' );
        this.renderer.addClass( ripple, 'ripple' );

        // Get the click's location relative to the button
        const rect = button.getBoundingClientRect();
        const eX = event.clientX - rect.left;
        const eY = event.clientY - rect.top;

        // Get the element's width and height
        const w = button.offsetWidth;
        const h = button.offsetHeight;

        // Calculate the maximum dimension needed for the ripple to cover the entire button
        // This is the distance from the click point to the furthest corner.
        const maxDim = Math.max(
        Math.sqrt( Math.pow( eX, 2 ) + Math.pow( eY, 2 )), // Top-left
        Math.sqrt( Math.pow( w - eX, 2 ) + Math.pow( eY, 2 )), // Top-right
        Math.sqrt( Math.pow( eX, 2 ) + Math.pow( h - eY, 2 )), // Bottom-left
        Math.sqrt( Math.pow( w - eX, 2 ) + Math.pow( h - eY, 2 )) // Bottom-right
        );

        // The size of the ripple circle should be twice the max dimension to ensure it covers the button
        const size = maxDim * 2;

        // Set the ripple's initial position and size
        // Position it centered on the click, then adjust by half its size to align top-left corner
        this.renderer.setStyle( ripple, 'width', `${ size }px` );
        this.renderer.setStyle( ripple, 'height', `${ size }px` );
        this.renderer.setStyle( ripple, 'top', `${ eY - size / 2 }px` );
        this.renderer.setStyle( ripple, 'left', `${ eX - size / 2 }px` );

        // Append the ripple to the button
        this.renderer.appendChild( button, ripple );

        // After the animation completes, remove the ripple element
        // Listen for the 'animationend' event
        this.renderer.listen( ripple, 'animationend', () => {
            this.renderer.removeChild( button, ripple );
        });
    }
}