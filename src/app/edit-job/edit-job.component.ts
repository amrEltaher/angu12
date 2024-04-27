import { Component, OnInit } from '@angular/core';
import { editJob } from '../shared/Models/editJob';
import { JobService } from '../job/job.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent implements OnInit{
  job!: editJob;
  jobForm!: FormGroup;
  submitted: any;

  constructor(
    public activeModal: NgbActiveModal,
    private deptService: JobService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      name: [this.job.name],
      description: [this.job.description]
    });
  }

  edit(): void {
    const updatedDeptData = this.jobForm.value;
    this.deptService.editJob(this.job.id, updatedDeptData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  saveChanges(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    this.edit();
  }
}

