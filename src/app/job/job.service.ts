import { Injectable } from '@angular/core';
import { jobs } from '../shared/Models/jobs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class JobService {
jobs: jobs[] = [];

  constructor(private http:HttpClient) { }

  getAllJob(): Observable<jobs[]> {
    return this.http.get<jobs[]>(`${environment.apiUrl}/api/Job`).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }
  deletJob(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/Job/${id}`);
  }

  getJobById(id: number): Observable<jobs> {
    return this.http.get<jobs>(`${environment.apiUrl}/api/Job/${id}`).pipe(
      catchError((error: any) => {
        // Handle errors here
        return throwError(error);
      })
    );
  }

  addJob(job: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Job`, job);
  }
  editJob(id: number, job: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/Job/${id}`, job);
  }
}