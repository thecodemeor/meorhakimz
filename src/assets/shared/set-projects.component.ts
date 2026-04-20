import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-set-project',
    standalone: true,
    imports: [ MatIconModule ],
    template: `
        @if (websiteSection) {
            <div class="header">
                <button class="back" (click)="websiteSection = false">
                    <mat-icon>chevron_left</mat-icon>
                </button>
                <div class="title">My Websites</div>
            </div>
            @for ( project of websitesList; track project ) {
                <div class="card-website cardProjects" (click)="openLinkWebsite( project.name )">
                    <div class="details">
                        <div class="label">{{ project.label }}</div>
                    </div>
                    <div class="container" [style.background-image]="'url(' + websiteImageBackground(project.image) + ')'">
                        <div class="github-button" (click)="openGitHub( $event, project.github )">
                            <img src="assets/images/logo/socmed/github-logo.png" alt="Github Icon">
                        </div>
                    </div>
                </div>
            }
        }
        @else {
            <div class="title">My Projects</div>
            @for ( project of setProjects; track project ) {
                <div class="card cardProjects" (click)="openLink( project.label )">
                    <div class="image">
                        <img [src]="project.image" alt="Abstract">
                    </div>
                    <div class="details">
                        <div class="label">{{ project.label }}</div>
                        <div class="description">{{ project.description }}</div>
                    </div>
                </div>
            }
        }
    `,
    styles: `
        :host {
            --spacing-1: 0.625rem;
            --spacing-2: 1.25rem;
            display: flex;
            width: 100%; height: fit-content;
            padding: 0;
            flex-direction: column;
            gap: var( --spacing-1 );
        }
        .title {
            padding: 0 var( --spacing-2 );
            font-size: 2.5rem;
            font-weight: 600;
            color: var( --text-color-standard )
        }
        .card {
            display: flex;
            width: 60%; height: 7rem;
            border-radius: var( --spacing-2 );
            border: solid 2px var( --primary );
            background: var( --background );
            align-items: stretch;
            overflow: hidden;
            // gap: var( --spacing-2 );
            transform-origin: 0 50%;
            transition: all 0.3s;
            cursor: pointer;
        }
        .card:hover {
            background: var( --primary );
            scale: 1.05;
        }
        .image {
            display: flex;
            width: 30%; height: 100%;
            justify-content: center;
            align-items: center;
        }
        .image img { width: auto; height: 75%;}
        .details {
            flex: 1 1 0;
            display: flex;
            height: 100%;
            padding: 0 var( --spacing-1 ) 0 0;
            color: var( --text-color-standard );
            flex-direction: column;
            justify-content: center;
        }
        .card:hover>.details {
            color: var( --primary-lite );
        }
        .label {
            margin-bottom: 5px;
            font-family: "Conthrax", sans-serif;
            font-size: 1.25rem;
        }
        .description {
            font-size: 0.625rem;
            color: var( --primary )
        }
        .card:hover>.details .description {
            color: white;
        }
        
        .cardProjects {
            transform: translateX( 5rem );
            opacity: 0;
            animation: fadeleft 0.6s ease-in-out forwards;
        }
        .cardProjects:nth-child( 2 ) { animation-delay: 0.15s}
        .cardProjects:nth-child( 3 ) { animation-delay: 0.3s}
        .cardProjects:nth-child( 4 ) { animation-delay: 0.45s}
        @keyframes fadeleft {
            to {
                transform: translateX( 0 );
                opacity: 1;
            }
        }
        @media ( max-width: 991px ) {
            .card { width: 100%}
        }

        .header {
            display: flex;
            align-items: center;
        }

        button.back {
            display: flex;
            height: 2rem;
            aspect-ratio: 1 / 1;
            border: none;
            border-radius: 50%;
            background-color: var(--primary);
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            cursor: pointer;
        }
        button.back:hover { scale: 1.1;}
        button.back mat-icon {
            --back-icon-size: 1.3rem;
            width: var(--back-icon-size); height: var(--back-icon-size);
            font-size: var(--back-icon-size);
            color: white;
        }
        .card-website {
            display: flex;
            padding: var(--moz-space-1);
            aspect-ratio: 1.7 / 1;
            border-radius: var( --moz-radius-lg );
            background: var( --primary-dark );
            overflow: hidden;
            flex-direction: column;
            transform-origin: 0 50%;
            transition: all 0.3s;
            gap: 0.3rem;
            cursor: pointer;
        }
        .card-website:hover { scale: 1.05;}
        .card-website .details {
            flex: none;
            width: 100%; height: fit-content;
            padding: 0.3rem 0 0 var(--moz-space-2);
        }
        .card-website .details .label { color: white;}
        .card-website .details .description { color: var(--primary-lite);}
        .card-website .container {
            flex: 1 1 0;
            display: flex;
            width: 100%; height: 100%;
            border-radius: calc(var(--moz-radius-lg) - var(--moz-space-1));
            background-color: white;
            background-position: center;
            background-size: cover;
        }
        .card-website .container .github-button {
            position: relative;
            width: fit-content; height: fit-content;
            margin: auto 0 0 auto;
            padding: var(--moz-space-1) var(--moz-space-1) 0 var(--moz-space-1);
            border-radius: 1.6rem 0 0 0;
            background-color: var(--primary-dark);
        }
        .card-website .container .github-button::before {
            content: '';
            position: absolute;
            top: -1rem; right: 0;
            width: 1rem; height: 1rem;
            border-radius: 0 0 0.5rem 0;
            box-shadow: 0 0.5rem 0 var(--primary-dark);
        }
        .card-website .container .github-button::after {
            content: '';
            position: absolute;
            bottom: 0; left: -1rem;
            width: 1rem; height: 1rem;
            border-radius: 0 0 0.5rem 0;
            box-shadow: 0.5rem 0 0 var(--primary-dark);
        }
        .card-website .container .github-button img {
            width: 2rem; height: 2rem;
            filter: invert(1);
        }
    `
})
export class SetProjectComponent implements OnInit {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    buttonClass: string = ''
    directionFlex: string = 'row'
    ngOnInit() {
        console.log(this.setProjects, 'mcb')
    }

    setProjects: any[] = [
        {
            image: 'assets/images/others/abstract/image-getproject-design.svg',
            label: 'Graphic',
            description: 'I use Adobe Photoshop, Illustrator, and Dimension for high-quality graphic design.',
        },
        {
            image: 'assets/images/others/abstract/image-getproject-web.svg',
            label: 'Website',
            description: 'Lots of colorful, engaging and style protrudes through every element on the website.',
        },
        // {
        //     image: 'assets/images/others/abstract/image-getproject-photo.svg',
        //     label: 'Photography',
        //     description: 'I am really passionate about photography, so I decided to share with you guys some photos made by me.',
        // },{
        //     image: 'assets/images/others/abstract/image-getproject-video.svg',
        //     label: 'Videography',
        //     description: 'Watching movies, anime or etc is not enough for me. How about I give it a try to create some of mine.',
        // }
    ]

    websiteSection: boolean = false
    websitesList: any[] = [
        {
            name: 'mozek',
            label: 'Mozek UI Library',
            image: 'mozek',
            github: 'mozek-package'
        },
        {
            name: 'pokemon',
            label: 'Pokedex',
            image: 'pokemon',
            github: 'pokemon'
        },
        {
            name: 'syazareen',
            label: 'Areen’s Website',
            image: 'syazareen',
            github: 'my-syazareen'
        }
    ]

    openLink( project: string ) {
        switch ( project.toLowerCase() ) {
            case 'graphic':
                window.open('https://thecodemeor.github.io/creatives/', '_blank');
                break;
            case 'website':
                this.websiteSection = true
                break;
            case 'photography':
                window.location.href = '';
                break;
            case 'videography':
                window.location.href = '';
                break;
        }
        return
    }

    openLinkWebsite(project: string) {
        switch (project) {
            case 'mozek':
                window.open('https://thecodemeor.github.io/mozek-website/home', '_blank');
                break;
            case 'pokemon':
                window.open('https://thecodemeor.github.io/pokemon/home', '_blank');
                break;
            case 'syazareen':
                window.open('https://syazareen-nafisah.web.app/home', '_blank');
                break;
        }
    }

    websiteImageBackground(website: string) {
        return `assets/images/backgrounds/websites/${website}-website.png`
    }

    openGitHub(event: MouseEvent, github: string) {
        event.stopPropagation();
        window.open('https://github.com/thecodemeor/' + github, '_blank');
    }
}