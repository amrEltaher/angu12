import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DeptService } from '../../dept/dept.service';
import { JobService } from '../../job/job.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
      ],
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup = new FormGroup({});
  submitted = false;
  errorMassages : string[] = [];
  departments: any[] = [];
  jobsarray: any[] = [];
   photo = new FormData();


  ngOnInit(): void {
    this.initializeForm();
    this.depts.getAllDept().subscribe((result: any[]) => {
      console.log(result);
      this.departments = result;
    });
      this.jobs.getAllJob().subscribe((result: any[]) => {
      console.log(result);
      this.jobsarray = result;
    });
   
  }

  constructor(private accountservice:AccountService,
               private formBuilder:FormBuilder,
               private depts:DeptService,
                private jobs:JobService
              ) { 
                console.log("hello");
              }
  async initializeForm() {
    this.registerForm = this.formBuilder.group({
      UserName: [''],
      FullName: [''],
      Email: ['', [Validators.required, Validators.pattern("^[^\s@]+@[^\s@]+\.[^\s@]+$")]], 
      PhoneNumber: ['', [Validators.required, Validators.pattern("^01[01245][0-9]{8}$")]], 
      Password: [''],
      confirmPassword: ['', this.confirmPasswordValidator],
      Address: [''],
      deptId: [''],
      jobId: [''],
      birthDate: [''],
      Age: [''],
      photo: ['']
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
    console.log(this.photo);
    // if (this.registerForm.valid) {
      //console.log(this.registerForm.value);
      const formData = new FormData();
      formData.append('photo', this.registerForm.value.photo);
      const data = {
  "userName": this.registerForm.value.UserName,
  "fullName": this.registerForm.value.FullName,
  "email": this.registerForm.value.Email,
  "phoneNumber": this.registerForm.value.PhoneNumber,
  "password": this.registerForm.value.Password,
  "confirmPassword": this.registerForm.value.confirmPassword,
  "address": this.registerForm.value.Address,
  "deptId": this.registerForm.value.deptId,
  "jobId": this.registerForm.value.jobId,
  "birthDate": this.registerForm.value.birthDate,
      };
      console.log(data);
      // Object.keys(this.registerForm.value).forEach(key => {
      //   formData.append(key, this.registerForm.value[key]);
      // });
      Object.keys(data).forEach(key => {
        formData.append(key, data[key as keyof typeof data]);
      });
      
      this.accountservice.register(formData).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    
  }
  
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.registerForm.patchValue({ photo: file });
  }
  
  
}
