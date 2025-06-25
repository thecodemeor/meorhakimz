import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//--- Page Routes ---//
import { HomeComponent } from './pages/home/home.component';
import { SafariPuzzleComponent } from './pages/games/safari-puzzle/safari-puzzle.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'safari-puzzle', component: SafariPuzzleComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
