import { Component, OnInit, inject } from '@angular/core';

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'meorhakimz';
  private breakpointObserver = inject( BreakpointObserver );

  responsive: string = ''
    ngOnInit() {
        this.breakpointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait
        ])
        .subscribe( result => {
            if ( result.matches && !result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = 'mobile'
            } else if (result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = 'mobile-landscape'
            } else {
                this.responsive = ''
            }
        });
    }
}
