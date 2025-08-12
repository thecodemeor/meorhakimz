import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-set-project',
    standalone: false,
    template: `
        <div class="title">My Projects</div>
        @for ( project of setProjects; track project ) {
            <div class="card cardProjects">
                <div class="image">
                    <img [src]="project.image" alt="Abstaract">
                </div>
                <div class="details">
                    <div class="label">{{ project.label }}</div>
                    <div class="description">{{ project.description }}</div>
                </div>
            </div>
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
        {
            image: 'assets/images/others/abstract/image-getproject-photo.svg',
            label: 'Photography',
            description: 'I am really passionate about photography, so I decided to share with you guys some photos made by me.',
        },{
            image: 'assets/images/others/abstract/image-getproject-video.svg',
            label: 'Videography',
            description: 'Watching movies, anime or etc is not enough for me. How about I give it a try to create some of mine.',
        }
    ]
}