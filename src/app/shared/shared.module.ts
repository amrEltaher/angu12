import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule

    ],
  exports:[
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }
