import { Component, inject, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Accessory
import { LCD } from 'src/assets/shared/lcd'

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy {
    title = 'meorhakimz';

    @ViewChild( 'lcdRow', { static: true } ) lcdRow!: ElementRef< HTMLDivElement >;
    private breakpointObserver = inject( BreakpointObserver );
    constructor (
        private router: Router, 
        private route: ActivatedRoute
    ) {}

    responsive: string = ''
    ngOnInit() {
        this.breakpointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait
        ])
        .subscribe( result => {
            if ( result.matches && !result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = 'mobile'
                this.numChars = 8;
            } else if (result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = 'mobile-landscape'
            } else {
                this.responsive = ''
            }
        });
        this.animationLCD()
    }
    ngOnDestroy(): void {
        clearInterval( this.scrollInterval );
    }

    // Works Array ====================================== //
    works: any = [
        { label: 'Graphic Design'},
        { label: 'Website'},
        { label: 'Photography'},
        { label: 'Cinematography'}
    ]

    // Download Document ================================ //
    downloadDoc( url: string ) {
        window.open( url, "_blank" );
    }

    // General Functional =============================== //
    openPage( page: string ) {
        this.router.navigate( [ page ], { relativeTo: this.route.parent } )
    }

    // Extra ============================================ //
    highlight: string[] = []

    // LCD
    numChars = 10;
    charWidth = 5;
    charHeight = 8;
    pixelSize = 1;
    characterPatterns = LCD

    displayText = 'Game On';
    currentIndex = 0;
    scrollInterval: any;
    animationLCD() {
        for ( let i = 0; i < this.numChars; i++ ) {
            this.lcdRow.nativeElement.appendChild( this.createCharacterCell() );
        }
        this.startScrolling();
    }
    createCharacterCell(): HTMLDivElement {
        const charCell = document.createElement( 'div' );
        charCell.classList.add( 'lcd-char' );

        for ( let i = 0; i < this.charHeight * this.pixelSize; i++ ) {
            for ( let j = 0; j < this.charWidth * this.pixelSize; j++ ) {
                const pixel = document.createElement( 'div' );
                pixel.classList.add( 'pixel' );
                charCell.appendChild( pixel );
            }
        }
        return charCell;
    }
    startScrolling() {
        clearInterval( this.scrollInterval );
        if ( this.displayText.length > this.numChars ) {
            this.scrollInterval = setInterval( () => this.scrollText(), 300 );
        } else {
            this.updateDisplay( this.displayText );
        }
    }
    scrollText() {
        this.currentIndex++;
        if ( this.currentIndex > this.displayText.length - this.numChars ) {
            this.currentIndex = 0;
        }
        const visibleText = this.displayText.substring( this.currentIndex, this.currentIndex + this.numChars );
        this.updateDisplay( visibleText );
    }
    updateDisplay( text: string ) {
        const lcdEl = this.lcdRow.nativeElement;
        lcdEl.innerHTML = '';
        for ( let i = 0; i < this.numChars; i++ ) {
            const charCell = this.createCharacterCell();
            const char = text[i]?.toUpperCase() || ' ';
            const pattern = this.characterPatterns[ char ] || this.characterPatterns[' '];
            this.displayCharacter( charCell, pattern );
            lcdEl.appendChild( charCell );
        }
    }
    displayCharacter( charCell: HTMLElement, pattern: number[][] ) {
        const pixels = charCell.querySelectorAll( '.pixel' );
        let pixelIndex = 0;
        for ( let i = 0; i < this.charHeight; i++ ) {
            for ( let j = 0; j < this.charWidth; j++ ) {
                const on = pattern?.[ i ]?.[ j ] === 1;
                if ( pixels[pixelIndex] ) {
                    ( pixels[ pixelIndex ] as HTMLElement ).classList.toggle( 'on', on );
                    pixelIndex++;
                }
            }
        }
    }

    // Download Document ================================ //
}
