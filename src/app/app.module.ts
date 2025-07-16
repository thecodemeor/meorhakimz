// ---  Angular Package  --- //
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

// --- Angular Material --- //
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'

// --- Extra Component --- //
// import { LogoComponent } from 'src/assets/components/logo.component';
import { ButtonComponent } from 'src/assets/components/button.component';
import { InputComponent } from 'src/assets/components/input.component';
import { ToggleComponent } from 'src/assets/components/toggle.component';

import { CursifyComponent } from 'src/assets/components/cursify.component';

// --- Page List --- //
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ChatComponent,

        // LogoComponent,
        ButtonComponent,
        InputComponent,
        ToggleComponent,
        CursifyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,

        // Angular Material
        MatCardModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
