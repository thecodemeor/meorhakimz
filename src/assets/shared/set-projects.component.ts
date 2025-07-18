import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-set-project',
    standalone: false,
    template: `
        @for ( project of setProjects; track project ) {
            <div class="card">
                <div class="image"></div>
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
            width: 60%; height: fit-content;
            padding: var( --spacing-2 ) 0;
            flex-direction: column;
            gap: var( --spacing-1 );
        }
        .card {
            display: flex;
            width: 100%; height: 7rem;
            border-radius: var( --spacing-2 );
            border: solid 2px var( --primary );
            background: var( --background );
            align-items: stretch;
            overflow: hidden;
            gap: var( --spacing-2 );
            transform-origin: 0 50%;
            transition: all 0.3s;
            cursor: pointer;
        }
        .card:hover {
            background: var( --primary );
            scale: 1.05;
        }
        .image {
            width: 25%; height: 100%;
        }
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
    `
})
export class SetProjectComponent implements OnInit {
    constructor( private el: ElementRef, private renderer: Renderer2 ) {}

    buttonClass: string = ''
    directionFlex: string = 'row'
    ngOnInit() {}

    setProjects: any[] = [
        {
            image: '',
            label: 'Graphic',
            description: 'I use Adobe Photoshop, Illustrator, and Dimension for high-quality graphic design.'
        },
        {
            image: '',
            label: 'Website',
            description: 'Lots of colorful, engaging and style protrudes through every element on the website.'
        },
        {
            image: '',
            label: 'Photography',
            description: 'I am really passionate about photography, so I decided to share with you guys some photos made by me.'
        },{
            image: '',
            label: 'Videography',
            description: 'Watching movies, anime or etc is not enough for me. How about I give it a try to create some of mine.'
        }
    ]
}