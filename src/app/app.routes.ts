import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DeptComponent } from './dept/dept.component';
import { JobComponent } from './job/job.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  // Lazy loading for account module
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'department', component: DeptComponent },
  { path: 'jobs', component: JobComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];
