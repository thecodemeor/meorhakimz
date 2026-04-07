import {
    Component,
    OnInit,
    ElementRef,
    Renderer2,
    ViewChild,
    AfterViewInit,
    OnDestroy
} from '@angular/core';

@Component({
    selector: 'app-set-personal',
    standalone: true,
    template: `
        <div
            #magnetCard
            class="personal-card"
            (mousemove)="onMouseMove($event)"
            (mouseleave)="onMouseLeave()"
        >
            <div class="doodle">
                <img src="assets/images/backgrounds/doodle-background.jpg" alt="">
            </div>

            <div class="career">ANGULAR<br>DEVELOPER</div>

            <div class="card-container">
                <div class="image">
                    <img src="assets/images/others/personal.png" class="personal" alt="Personal">
                    <img src="assets/images/others/line.png" class="line" alt="White Line">
                </div>

                <div class="biodata">
                    <div class="name">Meor Hakim</div>
                    <span class="subtitle">
                        <p>{{ age }} years old</p>
                        <div class="round"></div>
                        <p>Selangor, Malaysia</p>
                    </span>
                </div>
            </div>
        </div>
    `,
    styles: `
        :host {
            --spacing-1: 0.625rem;
            --spacing-2: 1.25rem;
            display: flex;
            width: 100%;
            height: fit-content;
            padding: 0 0 var(--spacing-2);
            justify-content: center;
            align-items: stretch;
            gap: 2rem;
            animation: fadeup 0.6s ease-out forwards;
            perspective: 1200px;
        }

        @keyframes fadeup {
            from {
                opacity: 0;
                transform: translateY(3rem);
            }
        }

        .personal-card {
            position: relative;
            display: flex;
            width: 80%;
            aspect-ratio: 1.8 / 1;
            padding: var(--moz-space-2);
            border-radius: var(--moz-radius-xl);
            background-color: var(--primary-dark);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            will-change: transform;
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
            transition: box-shadow 180ms ease-out;
            transform-style: preserve-3d;
            cursor: grab;
        }

        .personal-card:hover {
            box-shadow: 0.6rem 1rem 1.8rem rgba(0, 0, 0, 0.28);
        }

        .card-container {
            display: flex;
            width: fit-content;
            height: 90%;
            align-items: center;
            z-index: 10;
            pointer-events: none;
            transform: translateZ(26px);
        }

        .image {
            display: flex;
            width: fit-content;
            height: 80%;
            flex-direction: column;
            z-index: 2;
            transform: translateZ(18px);
        }

        .image img.personal {
            width: auto;
            height: 100%;
        }

        .image img.line {
            width: auto;
            height: 0.5rem;
            margin-top: -3px;
            rotate: 180deg;
            filter: invert(1) brightness(100);
        }

        .biodata {
            display: flex;
            width: fit-content;
            height: fit-content;
            margin-top: -2rem;
            margin-left: -4rem;
            padding-bottom: 0;
            flex-direction: column;
            overflow: hidden;
            transform: translateZ(32px);
        }

        .name {
            width: 100%;
            height: fit-content;
            font-family: "Luckiest Guy", cursive;
            font-size: 3.2rem;
            font-weight: 600;
            color: white;
        }

        .subtitle {
            display: flex;
            width: 100%;
            height: fit-content;
            justify-content: flex-end;
            align-items: center;
            gap: var(--spacing-1);
        }

        .subtitle .round {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: white;
        }

        .subtitle p {
            font-size: 0.875rem;
            font-weight: 400;
            color: white;
        }

        .career {
            position: absolute;
            bottom: -1rem;
            right: -1rem;
            width: fit-content;
            height: fit-content;
            font-family: "Lilita One", sans-serif;
            font-size: 5.5rem;
            font-weight: 900;
            line-height: 0.8;
            color: color-mix(in srgb, var(--primary-dark) 90%, white 10%);
            text-align: end;
            pointer-events: none;
            transform: translateZ(8px);
        }

        .doodle {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            -webkit-mask-image: linear-gradient(to right, transparent 30%, black);
            mask-image: linear-gradient(to left, transparent, black);
            pointer-events: none;
            transform: translateZ(0);
        }

        .doodle img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.02;
        }

        @media (max-width: 991px) {
            :host {
                flex-direction: column;
                align-items: center;
                perspective: none;
            }

            .personal-card {
                width: 90%;
                aspect-ratio: 1 / 1.6;
                transform: none !important;
                transition: box-shadow 180ms ease-out;
            }

            .card-container {
                flex-direction: column;
                gap: 2rem;
                transform: none;
            }

            .image {
                display: flex;
                width: fit-content;
                height: 60%;
                transform: none;
            }

            .biodata {
                width: 100%;
                height: fit-content;
                margin: 0;
                justify-content: center;
                transform: none;
            }

            .name {
                font-size: 2rem;
                text-align: center;
            }

            .subtitle {
                font-size: 0.6rem;
            }

            .career {
                font-size: 3rem;
                bottom: 0;
                transform: none;
            }
        }
    `
})
export class SetPersonalComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('magnetCard') magnetCardRef!: ElementRef<HTMLDivElement>;

    age: number = 0;

    private animationFrameId: number | null = null;

    private currentX = 0;
    private currentY = 0;
    private targetX = 0;
    private targetY = 0;

    private currentRotateX = 0;
    private currentRotateY = 0;
    private targetRotateX = 0;
    private targetRotateY = 0;

    private isDesktop = true;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.age = this.calculateAge(1996);
        this.updateScreenMode();
    }

    ngAfterViewInit(): void {
        this.animateMagnet();
    }

    ngOnDestroy(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    calculateAge(birthYear: number): number {
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }

    onMouseMove(event: MouseEvent): void {
        if (!this.isDesktop) return;

        const card = this.magnetCardRef?.nativeElement;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;

        const percentX = deltaX / (rect.width / 2);
        const percentY = deltaY / (rect.height / 2);

        const maxMoveX = rect.width * 0.05;
        const maxMoveY = rect.height * 0.05;
        const maxTilt = 7;

        this.targetX = this.clamp(deltaX * 0.12, -maxMoveX, maxMoveX);
        this.targetY = this.clamp(deltaY * 0.12, -maxMoveY, maxMoveY);

        this.targetRotateY = this.clamp(percentX * maxTilt, -maxTilt, maxTilt);
        this.targetRotateX = this.clamp(percentY * -maxTilt, -maxTilt, maxTilt);
    }

    onMouseLeave(): void {
        this.resetMagnet();
    }

    private animateMagnet = (): void => {
        const easing = 0.12;

        this.currentX += (this.targetX - this.currentX) * easing;
        this.currentY += (this.targetY - this.currentY) * easing;
        this.currentRotateX += (this.targetRotateX - this.currentRotateX) * easing;
        this.currentRotateY += (this.targetRotateY - this.currentRotateY) * easing;

        if (this.magnetCardRef?.nativeElement && this.isDesktop) {
            this.renderer.setStyle(
                this.magnetCardRef.nativeElement,
                'transform',
                `translate3d(${this.currentX}px, ${this.currentY}px, 0) rotateX(${this.currentRotateX}deg) rotateY(${this.currentRotateY}deg)`
            );
        }

        this.animationFrameId = requestAnimationFrame(this.animateMagnet);
    };

    private updateScreenMode(): void {
        this.isDesktop = window.innerWidth > 991;

        if (!this.isDesktop) {
            this.resetMagnet(true);
        }
    }

    private resetMagnet(force = false): void {
        this.targetX = 0;
        this.targetY = 0;
        this.targetRotateX = 0;
        this.targetRotateY = 0;

        if (force) {
            this.currentX = 0;
            this.currentY = 0;
            this.currentRotateX = 0;
            this.currentRotateY = 0;

            if (this.magnetCardRef?.nativeElement) {
                this.renderer.setStyle(
                    this.magnetCardRef.nativeElement,
                    'transform',
                    'none'
                );
            }
        }
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
}