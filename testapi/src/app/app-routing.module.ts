import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { StudentsComponent } from './students/students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { LoginComponent } from './login/login.component';

import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'student-form/:id', component: StudentFormComponent , canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { 
    path: 'customer', 
    component: CustomerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CustomerListComponent
      },
      {
        path: ':id/edit',
        component: CustomerFormComponent
      },
      {
        path: 'add',
        component: CustomerFormComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  // { path: 'form', component: FormComponent },
  // { path: 'reactiveform', component: ReactiveFormComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
