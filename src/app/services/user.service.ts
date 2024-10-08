import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { API_BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${API_BASE_URL}`; 
  constructor(private http: HttpClient, private route: Router) { }


  userLogin(data: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + '/user/login/', data, { headers });
  }
}
