import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-toggle',
    standalone: false,
    template: `
        <span class="toggle-base-span" (click)="trigger()">
            <div class="toggle-base" [style.background]="baseTheme ? '#79c4fd' : '#152874'">
                <span class="moving-area">
                    <span style="transition: all 0.3s ease;" [style.flex]="right ? '0' : '1 1 0'"></span>
                    <span class="toggle-span">
                        <div class="toggle"></div>
                    </span>
                </span>
            </div>
        </span>
    `,
    styles: `
        :host {
            display: flex;
        }
        .toggle-base-span {
            --width: 6.25rem;
            --height: 2.8rem;
            display: flex;
            width: calc( var( --width ) + 3px ); height: calc( var( --height ) + 3px );
            padding: 1.5px;
            border-radius: calc(( var( --height ) / 2 ) + 3px );
            background-image: linear-gradient( 10deg, var( --background ),  var( --line-grayscale ) 200% );
            cursor: pointer;
        }
        .toggle-base {
            width: var( --width ); height: var( --height );
            padding: 3px;
            border-radius: calc( var( --height ) / 2 );
            transition: all 0.3s;
            cursor: pointer;
        }
        .moving-area {
            display: flex;
            width: 100%; height: 100%;
        }
        .toggle-span {
            display: flex;
            height: 100%;
            aspect-ratio: 1 / 1;
            padding: 1.5px;
            border-radius: 50%;
            background-image: linear-gradient( 30deg, #f0f0f0, white 50% );
            transition: all 0.5s ease;
        }
        .toggle {
            display: flex;
            width: 100%; height: 100%;
            border-radius: 50%;
            background-image: linear-gradient( 30deg, white, #f0f0f0 );
        }
    `
})
export class ToggleComponent implements OnInit {

    baseTheme: boolean = true
    right: boolean = true
    ngOnInit() {
        
    }

    trigger() {
        this.baseTheme = !this.baseTheme
        this.right = !this.right
    }
}