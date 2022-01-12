import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer.model';

@Injectable()
export class CustomerService {
	API = 'https://hsxbvp329f.execute-api.us-east-2.amazonaws.com/Prod/user';

	private http: HttpClient;

	constructor(httpBackend: HttpBackend) {
	  this.http = new HttpClient(httpBackend);
  }

    getAll(): Observable<Customer[]>{
		return this.http.get<Customer[]>(this.API);
	}

	getById(id: number): Observable<any>{
		return this.http.get(`${this.API}/${id}`);
	}

	updateById(id: number, customer: Customer): Observable<Customer>{
		return this.http.put<Customer>(`${this.API}/${id}`, customer);
	}

	deleteById(id: number): Observable<any>{
		return this.http.delete<Customer>(`${this.API}/${id}`);
	}

	addNew(customer: Customer): Observable<Customer>{
		return this.http.post<Customer>(this.API, customer);
	}
}
