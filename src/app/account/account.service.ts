import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { AddressBook } from '../shared/Models/addressBook';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Account/Login`, loginData).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Account/Register`, registerData).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }

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
}
