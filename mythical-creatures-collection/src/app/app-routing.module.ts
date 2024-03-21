import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaturesComponent } from './creatures/creatures.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatureDetailComponent } from './creature-detail/creature-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'creatures', component: CreaturesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: CreatureDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
