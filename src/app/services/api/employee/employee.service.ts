import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7133/api'; // Define base URL here

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/Employee`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/Employee`, employee);
  }
  createEmployeeCSV(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/Employee`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/Employee/`, employee);
  }

  deleteEmployee(emp_ID: string): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${this.baseUrl}/Employee/${emp_ID}`);
  }
}

export interface Employee {
  emp_ID?: string;
  emp_First_Name?: string;
  emp_Last_Name?: string;
  emp_Date_of_Birth?: Date;
  emp_Date_of_Joining?: Date;
  emp_Dept_ID?: number;
  emp_Grade?: string;
  emp_Designation?: string;
  emp_Basic?: number;
  emp_Gender?: string;
  emp_Marital_Status?: string;
  emp_Home_Address?: string;
  emp_Contact_Num?: string;
}
