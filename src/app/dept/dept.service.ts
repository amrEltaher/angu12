import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { depts } from '../shared/Models/depts';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class DeptService {
  Dept:depts[] = [];

  constructor(private http:HttpClient) { }

 getAllDept(): Observable<depts[]> {
    return this.http.get<depts[]>(`${environment.apiUrl}/api/Dept`).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }
  deletDept(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/Dept/${id}`);
  }

  getDeptById(id: number): Observable<depts> {
    return this.http.get<depts>(`${environment.apiUrl}/api/Dept/${id}`).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }

  editDept(id: number, dept: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/Dept/${id}`, dept);
  }
}