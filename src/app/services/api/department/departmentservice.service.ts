import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentserviceService {
  private baseUrl = 'https://localhost:7133/api'; // Define base URL here

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/Department`);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/Department`, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}/Department`, department);
  }

  deleteDepartment(departmentId: number): Observable<Department[]> {
    return this.http.delete<Department[]>(
      `${this.baseUrl}/Department/${departmentId}`
    );
  }
}

export class Department {
  dept_ID?: number;
  dept_Name?: string;
}
