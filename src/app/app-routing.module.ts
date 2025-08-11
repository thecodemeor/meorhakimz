import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//--- Page Routes ---//
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/chat/test/test.component';

const routes: Routes = [
    { path: '', redirectTo: 'skill', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'test', component: TestComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
