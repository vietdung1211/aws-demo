import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/Customer.model';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];
  public subscription: Subscription;

  constructor(
    public customerService: CustomerService,
    private routerService: Router
  ) { }

  ngOnInit() {
    this.subscription=this.customerService.getAll().subscribe(data=>{
      this.customers=data;
    });
  }

  onDelete(id: number){
    this.subscription = this.customerService.deleteById(id).subscribe((data: Customer) =>{
      this.routerService.navigateByUrl('customer');
    });
  }



}
