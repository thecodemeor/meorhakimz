import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Service
import { animate, stagger } from 'animejs';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    author: string = 'thecodemeor'
    private breakpointObserver = inject( BreakpointObserver );
    
    menus = [ "me", "projects", "skills", "fun", "contact" ]
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
            } else if (result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = 'mobile-landscape'
            } else {
                this.responsive = ''
            }
        });
    }

    ngAfterViewInit() {
        animate( 'app-button.link', {
            translateY: { from: '4rem' },
            opacity: { from: '0' },
            easing: 'easeOutBack',
            duration: 600,
            delay: stagger( 150 )
        });

        animate( 'app-input', {
            width: { from: '4rem' },
            easing: 'easeOutBack',
            duration: 600,
            delay: 800
        });
    }

    userInput: string = ''
    getValue( value: string ) {
        this.userInput = value;
    }

    loading: boolean = false
    getLoading( status: boolean ) {
        this.loading = status;
    }
}
