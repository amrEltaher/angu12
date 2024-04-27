import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { AddressBook } from '../shared/Models/addressBook';
import { HttpClient } from '@angular/common/http';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';

@Injectable({
  providedIn: 'any' ,
})
export class DashboardService {
selectedAddressBook: AddressBook | undefined;
  constructor(private http: HttpClient,
  ) { }

  getAllAddressBook(): Observable<AddressBook[]> {
    return this.http.get<AddressBook[]>(`${environment.apiUrl}/api/AddressBook`).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }

  getAddressBookById(id: number): Observable<AddressBook> {
    return this.http.get<AddressBook>(`${environment.apiUrl}/api/AddressBook/${id}`).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }
  addAddressBook(addressBook: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/post`,addressBook);
    
    }

    updateAddressBook(id: number, addressBook: any): Observable<any> {
      return this.http.put(`${environment.apiUrl}/api/AddressBook/${id}`, addressBook).pipe(
        catchError((error: any) => {
          // Handle errors here
          return throwError(error);
        })
      );
    }
    

  deleteAddressBook(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/AddressBook/${id}`);
  }

  getSelectedAddressBook(): AddressBook | undefined {
    return this.selectedAddressBook;
  }
 
  ExportToExcel(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/AddressBook/export`, { responseType: 'blob' });
  }
}
