import {
    Component, 
    Input, 
    Output, 
    OnInit,
    ElementRef, 
    AfterViewInit,
    EventEmitter
} from '@angular/core';

// Service
import { animate, stagger } from 'animejs';

@Component({
    selector: 'app-input',
    standalone: false,
    template: `
        <div class="container" [class.glow]="isFocused">
            <input #textInput type="text" [(ngModel)]="userInput" [placeholder]="!loading ? 'Ask me anything...' : '...'" (focus)="isFocused=true" (blur)="isFocused=false" (keydown.enter)="submit()">
            <span (click)="submit()">
                <app-button button="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                        <path d="M427-615.91 253.04-441.96q-15.95 15.96-37.61 15.74-21.65-.21-37.6-16.17-14.96-15.96-15.18-37.61-.22-21.65 15.74-37.61l264-264q7.7-7.69 17.52-11.61 9.83-3.91 20.09-3.91t20.09 3.91q9.82 3.92 17.52 11.61l264.56 264.57q15.53 15.52 15.53 37.11 0 21.58-15.53 37.54-15.95 15.96-37.82 15.96t-37.83-15.96L533-615.91v422.13q0 22.08-15.46 37.54-15.45 15.46-37.54 15.46t-37.54-15.46Q427-171.7 427-193.78v-422.13Z"/>
                    </svg>
                </app-button>
            </span>
        </div>
    `,
    styles: `
        :host {
            --input-sizing: 2rem;
        }
        .container {
            display: flex;
            width: 100%; height: calc( var( --input-sizing ) * 2 );
            padding: 0 0 0 var( --input-sizing );
            border: solid 1px var( --line-grayscale );
            border-radius: 2rem;
            background: rgba( 255, 255, 255,  0.5);
            backdrop-filter: blur( 50px ); // frosted blur
            -webkit-backdrop-filter: blur( 50px ); // for Safari
            overflow: hidden;
        }
        input {
            flex: 1 1 0;
            width: 100%; height: 100%;
        }
        span {
            height: 100%;
            padding: 0.4rem;
        }

        // Focus
        .glow {
            border-color: var( --primary );
            box-shadow: 0 0 1.25rem var( --primary-lite );
            transition: all 0.3s;
        }
    `
})
export class InputComponent implements OnInit {
    @Input() loading: boolean = false
    @Output() sendValue = new EventEmitter< string >();
    
    ngOnInit() {}

    isFocused = false
    ngAfterViewInit() {

        // Animation
        animate('.container', {
            width: { from: '4rem' },
            padding: { from: '0' },
            easing: 'easeOutBack',
            duration: 600,
            delay: 800
        });
    }

    userInput: string = ''
    submit() {
        this.sendValue.emit( this.userInput );
        this.userInput = ''
    }
}