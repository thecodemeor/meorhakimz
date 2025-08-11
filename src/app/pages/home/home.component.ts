import { Component, OnInit, inject, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Service
import packageJson from '../../../../package.json'
import { animate, stagger, svg } from 'animejs';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    author: string = 'thecodemeor'
    version: string = packageJson.version
    licenseYear: number = new Date().getFullYear()
    private breakpointObserver = inject( BreakpointObserver );
    constructor(
        private renderer: Renderer2,
        @Inject( DOCUMENT ) private document: Document
    ) { }

    responsive: string = ''
    ngOnInit() {
        this.breakpointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait
        ])
        .subscribe( result => {
            if ( result.matches && !result.breakpoints[ Breakpoints.HandsetLandscape ]) {
                this.responsive = 'mobile'
            } else if ( result.breakpoints[ Breakpoints.HandsetLandscape ]) {
                this.responsive = 'mobile-landscape'
            } else {
                this.responsive = ''
            }
        });
    }

    ngAfterViewInit() {
        animate( 'app-input', {
            width: { from: '4rem' },
            easing: 'easeOutBack',
            duration: 600,
            delay: 300
        });

        animate( 'app-button.link', {
            translateY: { from: '4rem' },
            opacity: { from: '0' },
            easing: 'easeOutBack',
            duration: 600,
            delay: stagger( 150 )
        });

        animate( 'app-button.setting', {
            translateX: { from: '4rem' },
            easing: 'easeOutBack',
            duration: 600,
        });
    }

    theme: boolean = true
    selectTheme( event: MouseEvent ) {
        event.stopPropagation()
        this.theme = !this.theme
        if ( this.theme ) {
            this.renderer.addClass( this.document.body, 'light' );
            this.renderer.removeClass( this.document.body, 'dark' );
        } else {
            this.renderer.addClass( this.document.body, 'dark' );
            this.renderer.removeClass( this.document.body, 'light' );
        }
    }

    selectColor( event: MouseEvent, color: string ) {
        event.stopPropagation()
        for ( const item of this.themes ) {
            if ( color === item.label ) {
                this.renderer.addClass( this.document.body, color );
            } else {
                this.renderer.removeClass( this.document.body, item.label );
            }
        }
    }

    userInput: string = ''
    getValue( value: string ) {
        this.userInput = value;
    }

    loading: boolean = false
    getLoading( status: boolean ) {
        this.loading = status;
    }

    signalInput( name: string ) {
        switch ( name ) {
            case 'me':
                this.userInput = 'Could you tell me about yourself'
                break;
            case 'projects':
                this.userInput = 'I\'d be interested to hear more about your project. Could you share what it\'s about?'
                break;
            case 'skills':
                this.userInput = 'What skills do you have?'
                break;
            case 'fun':
                this.userInput = ''
                break;
            case 'contact':
                this.userInput = 'How can I contact you?'
                break;
        }
    }

    // *** Menu Bar ************************************************** //
    menus = [ "me", "projects", "skills", "fun", "contact" ]

    // *** Color Collection ****************************************** //
    themes = [
        { label: 'red', code: '#ff2323'},
        { label: 'rose', code: '#ff27ac'},
        { label: 'violet', code: '#803bff'},
        { label: 'malibu', code: '#06aaf1'},
        { label: 'chartreuse', code: '#63e600'},
    ]
}
