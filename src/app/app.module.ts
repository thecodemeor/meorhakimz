// ---  Angular Package  --- //
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --- Extra Component --- //
import { LogoComponent } from '../assets/components/logo/logo.component';

// --- Page List --- //
import { HomeComponent } from './pages/home/home.component';
import { SafariPuzzleComponent } from './pages/games/safari-puzzle/safari-puzzle.component';

// --- Directives --- //
// import { ParallaxDirective } from './pages/blog/ts/parallax.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    LogoComponent,
     SafariPuzzleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
