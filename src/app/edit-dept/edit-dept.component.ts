import { Component, OnInit } from '@angular/core';
import { DeptService } from '../dept/dept.service';
import { SharedModule } from '../shared/shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { depts } from '../shared/Models/depts';
import { editDept } from '../shared/Models/editDept';

@Component({
  selector: 'app-edit-dept',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './edit-dept.component.html',
  styleUrl: './edit-dept.component.scss'
})
export class EditDeptComponent implements OnInit {
  dept!: editDept;
  deptForm!: any;
  submitted: any;

  constructor(
    public activeModal: NgbActiveModal,
    private deptService: DeptService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.deptForm = this.formBuilder.group({
      name: [this.dept.name],
      description: [this.dept.description]
    });
  }

  edit(): void {
    const updatedDeptData = this.deptForm.value;
    this.deptService.editDept(this.dept.id, updatedDeptData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  saveChanges(): void {
    if (this.deptForm.invalid) {
      this.deptForm.markAllAsTouched();
      return;
    }
    this.edit();
  }
}