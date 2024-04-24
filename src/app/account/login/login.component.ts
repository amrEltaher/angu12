import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];

  constructor(
    private accountservice: AccountService,
    private formBuilder: FormBuilder,
    private router: Router // Use nullish coalescing for optional injection
  ) { }

  ngOnInit(): void {
    console.log('hello');
    this.initializeForm();
    console.log('helllllllllllllo');
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.loginForm.valid) {
      this.accountservice.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          // Navigate to a different route after successful login
          this.router.navigate(['/desired-route']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
}
