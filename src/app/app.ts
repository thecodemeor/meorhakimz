import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// --- Extra Component --- //
import { ResponsiveService } from 'src/services/responsive.service';

// --- Layout Component --- //
import { CursifyLayout } from 'src/assets/components/cursify.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CursifyLayout],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('meorhakimz');

    private responsive = inject(ResponsiveService);
    screen = computed(() => this.responsive.breakpoint());
}