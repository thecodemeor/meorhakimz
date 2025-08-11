import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-set-contact',
    standalone: false,
    template: `
        <div class="title">My Contacts</div>
        <div class="contact-widget">
            <div class="sect-personal"></div>
            <div class="sect-email button" (click)="openExternal( 'email' )">
                <img src="assets/images/logo/socmed/gmail-logo.svg" class="apps-icon" alt="Gmail Logo">
                <span class="spacer"></span>
                <h6>{{ personaEmail }}</h6>
            </div>
            <div class="sect-socmed">
                <div class="sect-linkedin button" (click)="openExternal( 'linkedin' )">
                    <img src="assets/images/logo/socmed/linkedin-logo.svg" class="apps-icon" alt="LinkedIn Logo">
                    <span class="spacer"></span>
                    <h5>LinkedIn</h5>
                    <span class="spacer"></span>
                </div>
                <div class="sect-facebook button" (click)="openExternal( 'facebook' )">
                    <img src="assets/images/logo/socmed/facebook-logo.svg" class="apps-icon" alt="Facebook Logo">
                    <span class="spacer"></span>
                    <h5>Facebook</h5>
                    <span class="spacer"></span>
                </div>
            </div>
            <div class="sect-blog undermentainance" (click)="openExternal( 'blog' )">
                <div class="sect-timmera">
                    <img src="assets/images/logo/socmed/timmera-logo.svg" class="apps-icon" alt="Timmera Logo">
                    <span class="spacer"></span>
                    <h5>Timmera</h5>
                    <span class="spacer"></span>
                </div>
            </div>
        </div>
    `,
    styles: `
        :host {
            --spacing-1: 0.625rem;
            --spacing-2: 1.25rem;
            display: flex;
            width: 100%; height: fit-content;
            padding: 0 0 var( --spacing-2 );
            flex-direction: column;
            gap: var( --spacing-1 );
            animation: fadeup 0.6s ease-out forwards;
        }
        @keyframes fadeup {
            from {
                opacity: 0;
                transform: translateY( 3rem );
            }
        }
        .title {
            padding: 0 var( --spacing-2 );
            font-size: 2.5rem;
            font-weight: 600;
            color: var( --text-color-standard )
        }
        .contact-widget {
            display: flex;
            width: 100%; height: fit-content;
            padding: 0;
            flex-wrap: wrap;
            gap: var( --spacing-1 )
        }
        .sect-personal,
        .sect-email,
        .sect-linkedin,
        .sect-facebook,
        .sect-blog {
            display: flex;
            padding: var( --spacing-1 );
            border-radius: var( --spacing-2 );
        }
        .sect-personal {
            width: 55%; height: 20dvh;
            background: var( --color-500 );
            background-image: url('src/assets/images/others/personal-3d.png');
            background-size: cover;
            background-position: center 10%;
        }
        .sect-email {
            width: calc( 45% - var( --spacing-1 )); height: 20dvh;
            background: var( --color-300 );
            flex-direction: column;
        }
        .sect-socmed {
            display: flex;
            width: calc( 40% - var( --spacing-1 )); height: calc( 20dvh + var( --sppacing-1 ));
            flex-direction: column;
            gap: var( --spacing-1 )
        }
        .sect-blog {
            width: 60%; height: calc( 20dvh + var( --sppacing-1 ));
            background: var( --color-500 );
            align-items: start;
        }
        .sect-linkedin {
            width: 100%; height: 10dvh;
            background-image: linear-gradient( 30deg, #0177b5, #00a6edff );
            align-items: center;
        }
        .sect-facebook {
            width: 100%; height: 10dvh;
            background-image: linear-gradient( 30deg, #0865fe, #438bffff );
            align-items: center;
        }
        .sect-timmera {
            display: flex;
            width: 100%; height: fit-content;
            align-items: center;
        }
        .apps-icon {
            width: calc( 10dvh - ( var( --spacing-1 ) * 2 ));
            height: calc( 10dvh - ( var( --spacing-1 ) * 2 ));
        }
        h5, h6 { color: white;}
        h6 { margin: auto auto var( --spacing-1 );}
        a {
            text-decoration-line: none;
            color: var( --text-color-standard )
        }
        .button {
            cursor: pointer;
            transition: all 0.3s;
        }
        .button:active { scale: 0.98;}
        .response { margin: var( --spacing-1 ) 0 0;}

        @media ( max-width: 991px ) {
            .sect-personal { width: 100%; height: 20dvh;}
            .sect-email { width: 100%; height: 10dvh; flex-direction: row;}
            .sect-socmed {
                width: 10dvh; height: calc( 20dvh + var( --sppacing-1 ));
            }
            .sect-linkedin h5,
            .sect-facebook h5 {
                display: none;
            }
            .sect-blog {
                flex: 1 1 0;
                width: unset; height: calc( 20dvh + var( --sppacing-1 ));
                flex-direction: column;
                align-items: start;
            }
            h6 { margin: auto auto 0;}
        }
    `
})
export class SetContactComponent implements OnInit {
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