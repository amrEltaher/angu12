import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { AddressBook } from '../shared/Models/addressBook';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';
import { editAddressBook } from '../shared/Models/editAddressBook';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DeptService } from '../dept/dept.service';
import { depts } from '../shared/Models/depts';
import { FormsModule } from '@angular/forms';
import { addreebook } from '../shared/Models/register';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent implements OnInit{
  addressbook: AddressBook[] = [];
  filteredEmployees: AddressBook[] = [];
  searchQuery: string = '';

  constructor( private router: Router,
    private addressbookservice:DashboardService,
    private modalService: NgbModal,
    private deptserv:DeptService
  ) { }

  ngOnInit() {
    this.addressbookservice.getAllAddressBook().subscribe((result: AddressBook[]) => {
      this.addressbook = result;
      this.filteredEmployees = result;
      console.log(this.addressbook);
      console.log(result);
      //photo : String =
    });
  }
  
  filterEmployees() {
    if (!this.searchQuery) {
      this.filteredEmployees = this.addressbook;
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredEmployees = this.addressbook.filter(employee =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.address.toLowerCase().includes(query) ||
        employee.deptId.toLowerCase().includes(query) ||
        employee.jobId.toLowerCase().includes(query)
      );
      return;
    }
  }
  

  openEditModal(employee: editAddressBook) {
    const modalRef = this.modalService.open(EditEmployeeModalComponent);
    modalRef.componentInstance.employee = employee;
  }

  

  deleteAddressBook(id: number) {
    // Display a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this address book entry?');
    
    // Check if user confirmed
    if (confirmed) {
      // If confirmed, delete the address book entry
      this.addressbookservice.deleteAddressBook(id).subscribe({
        next: response => {
          // Update the address book list
          this.addressbook = this.addressbook.filter((addressbook) => addressbook.id !== id);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  ExportToExcel() {
    this.addressbookservice.ExportToExcel().subscribe((response) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  transformPhotoPath(photoPath: string): string {
    return photoPath.replace(/\\/g, '/');
  }
}
