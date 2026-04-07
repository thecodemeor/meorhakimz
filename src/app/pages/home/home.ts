import { AfterViewInit, Component, Renderer2, computed, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

// --- Page List --- //
import { Chat } from 'src/app/pages/chat/chat';

// --- Extra Component --- //
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { ButtonComponent } from 'src/assets/components/button.component';
import { InputComponent } from 'src/assets/components/input.component';
import { ToggleComponent } from 'src/assets/components/toggle.component';

// --- Extra Services --- //
import packageJson from '../../../../package.json';
import { animate, stagger } from 'animejs';
import { ResponsiveService } from 'src/services/responsive.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        InputComponent,
        ToggleComponent,
        Chat,
        MatMenuModule,
        MatCardModule
    ],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
    author: string = 'thecodemeor';
    version: string = packageJson.version;
    licenseYear: number = new Date().getFullYear();

    private document = inject(DOCUMENT);
    private renderer = inject(Renderer2);
    private responsiveService = inject(ResponsiveService);

    screen = computed(() => this.responsiveService.breakpoint());

    theme = true;
    userInput = '';
    loading = false;

    menus = ['me', 'projects', 'skills', 'contact'];

    themes = [
        { label: 'red', code: '#ff2323' },
        { label: 'rose', code: '#ff27ac' },
        { label: 'violet', code: '#803bff' },
        { label: 'malibu', code: '#06aaf1' },
        { label: 'chartreuse', code: '#63e600' },
    ];

    ngAfterViewInit(): void {
        animate('app-input', {
            width: { from: '4rem' },
            easing: 'easeOutBack',
            duration: 600,
            delay: 300
        });

        animate('app-button.link', {
            translateY: { from: '4rem' },
            opacity: { from: '0' },
            easing: 'easeOutBack',
            duration: 600,
            delay: stagger(150)
        });

        animate('app-button.setting', {
            translateX: { from: '4rem' },
            easing: 'easeOutBack',
            duration: 600,
        });
    }

    selectTheme(payload: { checked: boolean; event: Event }): void {
        this.theme = payload.checked;

        if (this.theme) {
            this.renderer.addClass(this.document.body, 'light');
            this.renderer.removeClass(this.document.body, 'dark');
        } else {
            this.renderer.addClass(this.document.body, 'dark');
            this.renderer.removeClass(this.document.body, 'light');
        }
    }

    selectColor(event: MouseEvent, color: string): void {
        event.stopPropagation();

        for (const item of this.themes) {
            if (color === item.label) {
                this.renderer.addClass(this.document.body, item.label);
            } else {
                this.renderer.removeClass(this.document.body, item.label);
            }
        }
    }

    getValue(value: string): void {
        this.userInput = value;
    }

    getLoading(status: boolean): void {
        this.loading = status;
    }

    signalInput(name: string): void {
        this.userInput = '';
        queueMicrotask(() => {
            this.userInput = `preset:${name}`;
        });
    }
}