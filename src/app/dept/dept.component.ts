import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { depts } from '../shared/Models/depts';
import { DeptService } from './dept.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDeptComponent } from '../edit-dept/edit-dept.component';
import { editDept } from '../shared/Models/editDept';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dept',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule
  ],
  templateUrl: './dept.component.html',
  styleUrl: './dept.component.scss'
})
export class DeptComponent implements OnInit{
  departments:any[] = [];
  constructor(private deptserv:DeptService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.deptserv.getAllDept().subscribe((result: depts[]) => {
      this.departments = result;
      console.log(this.departments);
    }
    );
  }
  openEditModal(dept: editDept) {
    const modalRef = this.modalService.open(EditDeptComponent);
    modalRef.componentInstance.dept = dept;

  }
  deleteDepartment(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this department?');
    if (confirmed) {
      this.deptserv.deletDept(id).subscribe({
        next: response => {
          this.departments = this.departments.filter((departments) => departments.id !== id);
        },
        error: error => {
          console.log(error);
        }

      });
    }
  }

}
