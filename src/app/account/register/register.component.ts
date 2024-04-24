import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { share } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {
    this.initializeForm();
  }
  registerForm:FormGroup = new FormGroup({});
  submitted = false;
  errorMassages : string[] = [];

  constructor(private accountservice:AccountService,
               private formBuilder:FormBuilder
              ) { }
  initializeForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      department: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')]],
      phone: ['', [Validators.required,Validators.pattern('^01[01245][0-9]{8}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required, this.confirmPasswordValidator.bind(this)]
    });
  }
  
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;
  
    if (confirmPassword !== password) {
      return { passwordsDontMatch: true }; // Custom error key
    }
  
    return null;
  }
  register() {
    this.submitted = true;
    this.errorMassages = [];
    this.accountservice.register(this.registerForm.value).subscribe({
      next: response => {
        console.log(response);
        },
        error:error=> {
        console.log(error);
        }
    })
  } 
}
