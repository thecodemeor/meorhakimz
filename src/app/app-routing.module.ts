import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//--- Page Routes ---//
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
