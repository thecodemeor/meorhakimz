import { Component, } from '@angular/core';

@Component({
    selector: 'app-graviti-star',
    standalone: true,
    template: `
    <div class="glow"></div>
        <div class="animation-wrapper">
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
        </div>
    `,
   styleUrl: './graviti-start.component.scss'
})
export class GravitiComponent {}