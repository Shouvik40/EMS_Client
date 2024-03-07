import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): any {
    let url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get(url);
  }
}
