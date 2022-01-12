import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API = 'https://hsxbvp329f.execute-api.us-east-2.amazonaws.com/Prod/login';

  private http: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
}

  login(user: User): Observable<User> {
		return this.http.post<User>(this.API, user);
	}

}


