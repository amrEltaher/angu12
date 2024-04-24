import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    AccountRoutingModule,
    SharedModule,
    LoginComponent,
    RegisterComponent,
    HttpClientModule
    ]
})
export class AccountModule { }
