import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { editAddressBook } from '../shared/Models/editAddressBook';
import { DashboardService } from '../dash-board/dashboard.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-edit-employee-modal',
  standalone: true,
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.scss'],
  imports: [
    SharedModule
  ] 
})
export class EditEmployeeModalComponent implements OnInit {
  @Input() 
  employee!: editAddressBook;
  employeeForm!: FormGroup; // Define the form group
submitted: any;
registerForm: any;

  constructor(
    public activeModal: NgbActiveModal,
    private dashservice: DashboardService,
    private formBuilder: FormBuilder // Inject FormBuilder for creating form controls
  ) {}

  ngOnInit(): void {
    // Initialize the form with employee details
    this.employeeForm = this.formBuilder.group({
      name: [this.employee.name],
      email: [this.employee.email],
      phone: [this.employee.phoneNumber],
      password: [''],
      confirmPassword: ['']
    });
  }

  // Method to update the employee
  edit(): Observable<any> {
    const updatedEmployeeData = this.employeeForm.value;
    return this.dashservice.updateAddressBook(this.employee.id, updatedEmployeeData);
  }

  saveChanges(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    // Call the edit method and subscribe to the observable
    this.edit().subscribe({
      next: (response) => {
        // Handle successful response
        console.log('Employee updated:', response);
        // Close the modal or perform other actions as needed
        this.activeModal.close();
      },
      error: (error) => {
        // Handle error
        console.error('Error updating employee:', error);
        // Close the modal or perform other actions as needed
        this.activeModal.dismiss();
      }
    });
  }
}
