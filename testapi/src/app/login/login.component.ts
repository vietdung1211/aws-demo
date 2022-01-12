import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { LoginService } from '../Services/login.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentUser: User = new User();
  subscription: Subscription;
  subscriptionParams: Subscription;
  router: any;

  constructor(
    private loginService: LoginService,
    private routerService: Router,
    private activeRouterService: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void { 
  }

  onAdd(){
    this.subscription = this.loginService.login(this.currentUser).subscribe((data:any) => {
      localStorage.setItem ('token', data.token);
      console.log(data.token);
      console.log(data);
      const now = new Date().getTime().toString();;
      console.log(now);
      // setTimeout(() => {
      //   localStorage.removeItem('token');
      // }, 1000 * 60);
      this.backClicked();
    },(error) => {
      localStorage.setItem ('token', '');
      alert(error.error.message);  
    });
  }

  Onsubmit(){
    console.log(this.currentUser);
    this.onAdd();
  }

  backClicked() {
    this._location.back();
  }
   
}

