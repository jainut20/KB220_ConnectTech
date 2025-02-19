import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DatetimelineDirective } from './datetimeline.directive';
import { Camera } from '@ionic-native/camera/ngx/';
import { File } from '@ionic-native/file/ngx';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx'
import {ImageServiceService} from './image-service.service'
import { NgOtpInputModule } from  'ng-otp-input';

library.add(fas);


@NgModule({
  declarations: [AppComponent, DatetimelineDirective],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), NgOtpInputModule,AppRoutingModule,HttpClientModule,FontAwesomeModule],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    HTTP,
    Camera,
    ImageServiceService,
    File,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {}
