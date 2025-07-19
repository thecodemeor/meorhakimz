import { Component } from '@angular/core';

// Service
import { animate, stagger } from 'animejs';

@Component({
    selector: 'app-logo',
    standalone: false,
    templateUrl: './logo.component.html',
    styleUrl: './logo.component.scss'
})
export class LogoComponent {

    ngAfterViewInit() {
        animate( '.mini-o', {
            y: '1.2rem',
            ease: 'inOut',
            duration: 2000,
            loop: true,
            alternate: true
        });
    }
}