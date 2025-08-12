// ---  Angular Package  --- //
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

// --- External Libraries --- //
import { NgxChartsModule } from '@swimlane/ngx-charts';

// --- Angular Material --- //
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'

// --- Extra Component --- //
import { LogoComponent } from 'src/assets/shared/logo/logo.component';
import { ButtonComponent } from 'src/assets/components/button.component';
import { InputComponent } from 'src/assets/components/input.component';
import { ToggleComponent } from 'src/assets/components/toggle.component';
import { LoadingComponent } from 'src/assets/components/loading.component';
import { GravitiComponent } from 'src/assets/components/graviti-star.component';

import { CursifyComponent } from 'src/assets/components/cursify.component';

// --- Page List --- //
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ChatComponent } from 'src/app/pages/chat/chat.component';
import { TestComponent } from 'src/app/pages/chat/test/test.component';
import { SetPersonalComponent } from 'src/assets/shared/set-personal.component';
import { SetProjectComponent } from 'src/assets/shared/set-projects.component';
import { SetSkillsComponent } from 'src/assets/shared/set-skills/set-skills.component';
import { SetContactComponent } from 'src/assets/shared/set-contact.component';
import { Model02Component } from './pages/chat/model-02/model-02.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ChatComponent,
        TestComponent,

        // Set
        SetPersonalComponent,
        SetProjectComponent,
        SetSkillsComponent,
        SetContactComponent,

        LogoComponent,
        ButtonComponent,
        InputComponent,
        ToggleComponent,
        CursifyComponent,
        LoadingComponent,
        GravitiComponent,
        Model02Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,

        // External Service
        NgxChartsModule,

        // Angular Material
        MatCardModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
