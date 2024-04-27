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
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];
    console.log('Login successful');

    if (this.loginForm.valid) {
      this.accountservice.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          // Navigate to a different route after successful login
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
}
