import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
// import { AccountModule } from './account/account.module';

export const routes: Routes = [
  {
    path: '',component: HomeComponent},
    //implement lazy loading 
    {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent,pathMatch: 'full' 
  },
  {
    path:'dashboard',
    component: DashBoardComponent
  }
 
];

