import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-set-contact',
    standalone: true,
    template: `
        <div class="title">My Contacts</div>
        <div class="contact-widget">
            <div class="sect-personal">
                <img src="assets/images/others/profile-image.JPG" class="profile-image" alt="Profile Image">
                <div class="profile-label">
                    <h5>{{ personaName }}</h5>
                </div>
            </div>

            <div class="sect-email button" (click)="openExternal( 'email' )">
                <div class="email">
                    <div class="header">
                        <img src="assets/images/logo/socmed/gmail-logo.svg" class="apps-icon" alt="Gmail Logo">
                        <h4>Email</h4>
                    </div>
                    <span class="spacer"></span>
                    <div class="footer">
                        <p>To:</p>
                        <h6>{{ personaEmail }}</h6>
                    </div>
                </div>
            </div>

            <div class="sect-linkedin button" (click)="openExternal( 'linkedin' )">
                <img src="assets/images/logo/socmed/linkedin-logo.svg" class="apps-icon" alt="LinkedIn Logo">
            </div>

            <div class="sect-github button" (click)="openExternal( 'github' )">
                <img src="assets/images/logo/socmed/github-logo.png" class="apps-icon" alt="GitHub Logo">
            </div>

            <div class="sect-document button" (click)="openExternal( 'blog' )">
                <div class="header">
                    <img src="assets/images/logo/others/document-icon.png" class="icon" alt="Document Icon">
                    <h4>Resume</h4>
                </div>
                <p>Download my resume to get a detailed view of my background, projects, and capabilities as a developer.</p>
                <span class="spacer"></span>
                <img src="assets/images/others/resume-header.png" class="resume-header" alt="Resume Header">
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
            display: grid;
            width: 85%; height: auto;
            aspect-ratio: 5 / 4;
            margin: 0 auto;
            padding: 0;

            grid-template-columns: repeat( 5, 1fr);
            grid-template-rows: repeat( 4, 1fr);
            gap: var( --moz-space-1 )
        }
        .sect-personal, .sect-email, .sect-github, .sect-linkedin, .sect-document {
            display: flex;
            width: 100%; height: 100%;
            padding: var( --moz-space-2 );
            border-radius: 4rem;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            corner-shape: squircle;
            transition: all 0.3s;
            overflow: hidden;

            &:hover { scale: 1.02;}
        }
        .sect-personal {
            grid-column: 1 / span 2;
            grid-row: 1 / span 4;
            position: relative;
            padding: 0;
        }
        .sect-personal .profile-image {
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            width: 100%; height: 100%;
            object-fit: cover;
        }
        .sect-personal .profile-label {
            --size: 4px;
            position: absolute;
            bottom: var(--size); left: var(--size); right: var(--size);
            display: flex;
            width: calc(100% - (var(--size) * 2)); height: 28%;
            padding: var(--moz-space-1);
            border-radius: calc(4rem - var(--size));
            background: rgba(255, 255, 255, 0.42);
            border: 1px solid rgba(255, 255, 255, 0.48);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            justify-content: center;
            align-items: center;
            corner-shape: squircle;
        }
        .sect-personal .profile-label h5 { color: white;}
        .sect-email {
            grid-column: 3 / span 3;
            grid-row: 1 / span 2;
            padding: var(--moz-space-2);
            background-image: url('src/assets/images/backgrounds/blue-abstract-background.jpg');
            background-position: center;
            background-size: cover;
        }
        .sect-email .email {
            position: relative;
            display: flex;
            width: 100%; height: 100%;
            border-radius: calc(4rem - var(--moz-space-2));
            border: solid 1px rgba(255, 255, 255, 0.88);
            background: rgba(255, 255, 255, 0.82);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            flex-direction: column;
            justify-content: space-between;
            corner-shape: squircle;
            overflow: hidden;
        }
        .sect-email .email .header {
            display: flex;
            width: 100%; height: fit-content;
            padding: var(--moz-space-2) var(--moz-space-3);
            align-items: center;
            gap: 0.625rem;
        }
        .sect-email .email h4 { color: black; font-family: "Lilita One", sans-serif;}
        .sect-email .email .footer {
            display: flex;
            width: 100%; height: fit-content;
            padding: var(--moz-space-1) var(--moz-space-3) var(--moz-space-2);
            border-top: solid 1px rgba(255, 255, 255, 0.48);
            background-color: #efefef;
            flex-direction: column;
            gap: 0.3rem;
        }
        .sect-email .email .footer p { color: #aaa;}
        .sect-linkedin {
            grid-column: 3 / span 1;
            grid-row: 3 / span 1;
            background-image: linear-gradient( 30deg, #0177b5, #00a6edff );
            justify-content: center;
            align-items: center;  
        }
        .sect-github {
            grid-column: 3 / span 1;
            grid-row: 4 / span 1;
            background-image: linear-gradient( 30deg, #e8e8e8, rgb(255, 255, 255) );
            justify-content: center;
            align-items: center;  
        }
        .sect-github img { padding: 0.2rem;}
        .sect-document {
            grid-column: 4 / span 2;
            grid-row: 3 / span 2;
            display: flex;
            padding-right: 0;
            padding-bottom: 0;
            background-image: linear-gradient( 30deg, #ff512f, #dd2476 );
            flex-direction: column;
        }
        .sect-document .header {
            display: flex;
            gap: 0.625rem;
            transition: all 0.3s;
        }
        .sect-document .header img { width: auto; height: 1.7rem;}
        .sect-document .header h4 { color: white; font-family: "Lilita One", sans-serif;}
        .sect-document .resume-header {
            width: auto; height: 4rem;
            margin: auto 0 0 auto;
            border-radius: 1.3rem 0 0 0;
            transform-origin: 100% 100%;
            transition: all 0.3s;
        }
        .sect-document p {
            width: 80%;
            margin-top: 1rem;
            font-size: 0.7rem;
            line-height: 1.2;
            color: white;
        }
        .sect-document:hover > .resume-header { scale: 1.1;}
        .apps-icon {
            width: calc( 10dvh - ( var( --spacing-1 ) * 2 ));
            border-radius: 1rem;
            box-shadow: 0 0.1rem 0.2rem rgb(0, 0, 0, 0.15);
        }
        .button { cursor: pointer; transition: all 0.3s;}

        @media ( max-width: 991px ) {
            .contact-widget { gap: var( --moz-space-1 )}
            .sect-personal, .sect-email, .sect-github, .sect-linkedin, .sect-blog {
                padding: var( --moz-space-1 );
                border-radius: 2.6rem;
                corner-shape: squircle;
            }
            .sect-personal {
                grid-column: 1 / span 2;
                grid-row: 1 / span 3;
                padding: 0;
            }
            .sect-email {
                grid-column: 3 / span 3;
                grid-row: 1 / span 2;
                padding: var(--moz-space-1);
            }
            .sect-email .email {
                padding: var(--moz-space-1);
                border-radius: calc(2.6rem - var(--moz-space-1));
                corner-shape: squircle;
            }
            .sect-email .email h6 { font-size: 0.7rem;}
            .sect-linkedin {
                grid-column: 1 / span 1;
                grid-row: 4 / span 1;
            }
            .sect-github {
                grid-column: 2 / span 1;
                grid-row: 4 / span 1;
            }
            .sect-document {
                grid-column: 3 / span 3;
                grid-row: 3 / span 3;
            }
            h6 { margin: auto auto 0;}
        }

        @media ( max-width: 768px ) {
            .contact-widget {
                width: 100%; height: auto;
                margin: 0;
                grid-template-rows: unset;
            }
            .sect-personal {
                grid-column: 1 / span 3;
                grid-row: 1 / span 3;
                padding: 0;
            }
            .sect-email {
                grid-column: 4 / span 2;
                grid-row: 1 / span 1;
                padding: var(--moz-space-1);
            }
            .sect-email .email {
                display: flex;
                padding: 0;
                justify-content: center;
                align-items: center;
                
                .header {
                    display: flex;
                    padding: 0;
                    justify-content: center;
                    align-items: center;
                }

                .spacer, .footer, h4 { display: none}
            }
            .sect-linkedin {
                grid-column: 4 / span 2;
                grid-row: 2 / span 1;
            }
            .sect-github {
                grid-column: 4 / span 2;
                grid-row: 3 / span 1;
            }
            .sect-document {
                grid-column: 1 / span 5;
                grid-row: 4 / span 1;
            }
        }
    `
})
export class SetContactComponent implements OnInit {
    constructor( private el: ElementRef, private renderer: Renderer2 ) {}

    personaName: string = 'Meor Hakim'
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
            case 'github':
                window.open('https://github.com/thecodemeor', '_blank');
                break;
            case 'blog':
                window.open('assets/documents/Meor_Hakim_Frontend_Developer_Resume.pdf', '_blank');
                break;
        }
    }
}