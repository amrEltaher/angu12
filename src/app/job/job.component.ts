import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { jobs } from '../shared/Models/jobs';
import { JobService } from './job.service';
import { SharedModule } from '../shared/shared.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { editJob } from '../shared/Models/editJob';
import { EditJobComponent } from '../edit-job/edit-job.component';


@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit{
  jobs:jobs[] = [];
  constructor(private jobserv:JobService,
    private modalService: NgbModal,
  ) { }
  ngOnInit() {
    this.jobserv.getAllJob().subscribe((result: jobs[]) => {
      this.jobs = result;
      console.log(this.jobs);
    });
  }
  openEditModal(job: editJob) {
    const modalRef = this.modalService.open(EditJobComponent);
    modalRef.componentInstance.job = job;
    
  }
  deleteJob(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (confirmed) {
      this.jobserv.deletJob(id).subscribe({
        next: response => {
          this.jobs = this.jobs.filter((jobs) => jobs.id !== id);
        },
        error: error => {
          console.log(error);
        }

      });
    }
  }

}
