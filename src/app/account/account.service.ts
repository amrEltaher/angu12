import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { AddressBook } from '../shared/Models/addressBook';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'any'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Account/login`, loginData).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }

  register(registerData: any): Observable<any> {
    //const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    console.log(registerData);
    return this.http.post(`${environment.apiUrl}/api/Account/register`, registerData).pipe(
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
