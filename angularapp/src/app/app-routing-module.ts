import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Authguard } from './components/authguard/authguard';
import { Error } from './components/error/error';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { Aboutus } from './aboutus/aboutus';
import { Contactus } from './contactus/contactus';
import { Createmedicine } from './components/createmedicine/createmedicine';
import { RoleGuard } from './services/role.guard';
import { Viewmedicine } from './components/viewmedicine/viewmedicine';
import { Suppliereditmedicine } from './components/suppliereditmedicine/suppliereditmedicine';
import { Createfeed } from './components/createfeed/createfeed';
import { Viewfeed } from './components/viewfeed/viewfeed';
import { Suppliereditfeed } from './components/suppliereditfeed/suppliereditfeed';
import { Supplierrequests } from './components/supplierrequests/supplierrequests';
import { Adminviewfeedback } from './components/adminviewfeedback/adminviewfeedback';
import { Createlivestock } from './components/createlivestock/createlivestock';
import { Viewlivestock } from './components/viewlivestock/viewlivestock';
import { Ownereditlivestock } from './components/ownereditlivestock/ownereditlivestock';
import { Ownerviewmedicine } from './components/ownerviewmedicine/ownerviewmedicine';
import { Ownerviewfeed } from './components/ownerviewfeed/ownerviewfeed';
import { Ownerviewrequest } from './components/ownerviewrequest/ownerviewrequest';
import { Useraddfeedback } from './components/useraddfeedback/useraddfeedback';
import { Userviewfeedback } from './components/userviewfeedback/userviewfeedback';
import { Requestform } from './components/requestform/requestform';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'authguard', component: Authguard },
  { path: 'error', component: Error },
  { path: 'registration', component: Registration },
  { path: 'login', component: Login },
  { path: 'aboutus', component: Aboutus },
  { path: 'contactus', component: Contactus },

  {
    path: 'addMedicine',
    component: Createmedicine,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },
  {
    path: 'viewMedicine',
    component: Viewmedicine,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },
  {
    path: 'supplierEditMedicine/:medicineId',
    component: Suppliereditmedicine,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },
  {
    path: 'addFeed',
    component: Createfeed,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },
  {
    path: 'viewFeed',
    component: Viewfeed,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },
  {
    path: 'supplierEditFeed/:feedId',
    component: Suppliereditfeed,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },
  {
    path: 'supplierRequest',
    component: Supplierrequests,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },
  {
    path: 'adminViewFeedBack',
    component: Adminviewfeedback,
    canActivate: [RoleGuard],
    data: { role: 'SUPPLIER' },
  },

  {
    path: 'addLivestock',
    component: Createlivestock,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'viewLivestock',
    component: Viewlivestock,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'ownerEditLiveStock/:livestockId',
    component: Ownereditlivestock,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'ownerViewMedicine',
    component: Ownerviewmedicine,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'ownerViewFeed',
    component: Ownerviewfeed,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'ownerRequest',
    component: Ownerviewrequest,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'addFeedBack',
    component: Useraddfeedback,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'ViewFeedBack',
    component: Userviewfeedback,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
  {
    path: 'requestForm',
    component: Requestform,
    canActivate: [RoleGuard],
    data: { role: 'OWNER' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
