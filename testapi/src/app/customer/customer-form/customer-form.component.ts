import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { Customer } from 'src/app/models/Customer.model';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  currentCustomer: Customer = new Customer();
  subscription: Subscription;
  subscriptionParams: Subscription;

  public customerModelID = 0; 
  public formTitle;

  constructor(
    private customerService: CustomerService,
    private routerService: Router,
    private activeRouterService: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.subscriptionParams = this.activeRouterService.paramMap.subscribe(params => {
      let id = params.get("id");
      if (id) {
        this.customerModelID = Number(id);
        this.subscription = this.customerService.getById(this.customerModelID).subscribe((data: Customer) =>{
          this.currentCustomer = data;
        })
      }
    });
  }

  onUpdate(){
    this.subscription = this.customerService.updateById(this.customerModelID, this.currentCustomer).subscribe(data =>{
      this.routerService.navigateByUrl('customer');
    });
  }

  onAdd(){
    this.subscription = this.customerService.addNew(this.currentCustomer).subscribe(data => {
      this.routerService.navigateByUrl('customer');
    });
  }

  Onsubmit(){
    if (!this.customerModelID || this.customerModelID === 0) {
      this.onAdd();
    } else {
      this.onUpdate();
    }
  }

}
