// ---  Angular Package  --- //
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

// --- Extra --- //

// --- Extra Component --- //
// import { LogoComponent } from 'src/assets/components/logo.component';
import { ButtonComponent } from 'src/assets/components/button.component';
import { InputComponent } from 'src/assets/components/input.component';

import { SpaceRingCursor } from 'src/assets/components/curify/space-ring.component';

// --- Page List --- //
import { HomeComponent } from 'src/app/pages/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,

        // LogoComponent,
        ButtonComponent,
        InputComponent,
        SpaceRingCursor
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
