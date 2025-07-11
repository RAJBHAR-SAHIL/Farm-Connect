import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { Adminnav } from './components/adminnav/adminnav';
import { Adminviewfeedback } from './components/adminviewfeedback/adminviewfeedback';
import { Authguard } from './components/authguard/authguard';
import { Createfeed } from './components/createfeed/createfeed';
import { Createlivestock } from './components/createlivestock/createlivestock';
import { Createmedicine } from './components/createmedicine/createmedicine';
import { Error } from './components/error/error';
import { Footer } from './components/footer/footer';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Navbar } from './components/navbar/navbar';
import { Ownereditlivestock } from './components/ownereditlivestock/ownereditlivestock';
import { Ownerviewfeed } from './components/ownerviewfeed/ownerviewfeed';
import { Ownerviewmedicine } from './components/ownerviewmedicine/ownerviewmedicine';
import { Ownerviewrequest } from './components/ownerviewrequest/ownerviewrequest';
import { Registration } from './components/registration/registration';
import { Requestform } from './components/requestform/requestform';
import { Suppliereditfeed } from './components/suppliereditfeed/suppliereditfeed';
import { Suppliereditmedicine } from './components/suppliereditmedicine/suppliereditmedicine';
import { Supplierrequests } from './components/supplierrequests/supplierrequests';
import { Useraddfeedback } from './components/useraddfeedback/useraddfeedback';
import { Usernav } from './components/usernav/usernav';
import { Userviewfeedback } from './components/userviewfeedback/userviewfeedback';
import { Viewfeed } from './components/viewfeed/viewfeed';
import { Viewlivestock } from './components/viewlivestock/viewlivestock';
import { Viewmedicine } from './components/viewmedicine/viewmedicine';
import { Aboutus } from './aboutus/aboutus';
import { Contactus } from './contactus/contactus';
import { AuthInterceptor } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    App,
    Adminnav,
    Adminviewfeedback,
    Authguard,
    Createfeed,
    Createlivestock,
    Createmedicine,
    Error,
    Footer,
    Home,
    Login,
    Navbar,
    Ownereditlivestock,
    Ownerviewfeed,
    Ownerviewmedicine,
    Ownerviewrequest,
    Registration,
    Requestform,
    Suppliereditfeed,
    Suppliereditmedicine,
    Supplierrequests,
    Useraddfeedback,
    Usernav,
    Userviewfeedback,
    Viewfeed,
    Viewlivestock,
    Viewmedicine,
    Aboutus,
    Contactus,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
