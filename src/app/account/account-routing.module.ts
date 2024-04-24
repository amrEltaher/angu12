import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports:[
    RouterModule
  ] 
})
export class AccountRoutingModule { }
