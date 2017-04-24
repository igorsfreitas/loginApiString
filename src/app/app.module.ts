import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import {Signup} from '../pages/signup/signup';
import {Userpage} from '../pages/userpage/userpage';
import {AuthService} from '../pages/home/authservice';
import { GlobalServices } from '../pages/home/globalServices';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Userpage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Userpage
  ],
  providers: [AuthService, GlobalServices]
})
export class AppModule {}