import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-set-personal',
    standalone: false,
    template: `
        <img src="assets/images/others/meor-pixar.jpg" alt="Pixar">
        <div class="content">
            <div class="name">Meor Hakim</div>
            <span class="subtitle">
                <h6>29 years old</h6>
                <div class="round"></div>
                <h6>Selangor, Malaysia</h6>
            </span>
            <span class="spacer"></span>
            <h5>Hi 👋 <br> I'm Meor, a developer who enjoys working with Angular and TypeScript. I like problem-solving, refining code for clarity, and learning new tools that make frontend and backend work together smoothly.</h5>
            <span class="spacer"></span>
        </div>
    `,
    styles: `
        :host {
            --spacing-1: 0.625rem;
            --spacing-2: 1.25rem;
            display: flex;
            width: 100%; height: fit-content;
            padding: 0 0 var( --spacing-2 );
            align-items: stretch;
            gap: 2rem;
            animation: fadeup 0.6s ease-out forwards;
        }
        @keyframes fadeup {
            from {
                opacity: 0;
                transform: translateY( 3rem );
            }
        }
        img {
            width: 40%; height: auto;
            border-radius: var( --spacing-2 )
        }
        .content {
            display: flex;
            width: 60%; height: auto;
            flex-direction: column;
        }
        .name {
            width: 100%;
            font-size: 2rem;
            font-weight: 600;
            color: var( --primary-dark )
        }
        .subtitle {
            display: flex;
            width: fit-content;
            align-items: center;
            gap: var( --spacing-2 )
        }
        .round {
            width: 6px; height: 6px;
            border-radius: 50%;
            background-color: var( --color-400 )
        }
        h5 { line-height: 1.6;}

        @media( max-width: 991px ) {
            :host {
                flex-direction: column;
                align-items: center;
            }
            img { width: 60%;}
            .content { width: 100%;}
            .subtitle { margin-bottom: var( --spacing-2 )}
            .round {
                width: 6px; height: 6px;
                border-radius: 50%;
                background-color: var( --color-400 )
            }
            h5 { line-height: 1.6;}
        }
    `
})
export class SetPersonalComponent implements OnInit {
    constructor( private el: ElementRef, private renderer: Renderer2 ) {}

    personaEmail: string = 'meorhakimz@gmail.com'
    ngOnInit() {}

    openExternal( link: string ) {
        switch ( link ) {
            case 'email':
                window.location.href = `mailto:meorhakimz@gmail.com`;
                break;
            case 'linkedin':
                window.open('https://www.linkedin.com/in/meorhakimz/', '_blank');
                break;
            case 'facebook':
                window.open('https://www.facebook.com/zeus.alpha.92', '_blank');
                break;
            case 'blog':
                break;
        }
    }
}