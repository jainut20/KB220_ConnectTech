import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { RegistrationService } from './api/registration.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  fingerprintOptions: {
    clientId: string; clientSecret: string; //Only necessary for Android
    disableBackup: boolean; //Only for Android(optional)
  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private register: RegistrationService,
    private faio: FingerprintAIO
  ) {


    this.initializeApp();
  }

  Student = undefined

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const { Storage } = Plugins;


      Storage.get({ key: 'student' }).then(async res => {
        if (res) {
          if (res.value) {

            this.Student = res.value
            let copy = res.value
            let sid = JSON.parse(copy).studentId
            let Isactive:any = false
            if (sid)
               Isactive = await this.register.Isactive(sid)
            
            if (Isactive) {
              // this.fingerprintOptions = {
              //   clientId: 'fingerprint-Demo',
              //   clientSecret: 'password', //Only necessary for Android
              //   disableBackup: true  //Only for Android(optional)
              // }
              this.router.navigate(['/menu'])

              // if (this.platform.is("android")) {
              //   this.faio.isAvailable().then(result => {
              //     if (result == 'biometric') {
              //       this.faio.show(this.fingerprintOptions).then(() => {
              //         this.router.navigate(['/menu'])
              //       }).catch(err => {
              //         console.log(err)
              //       })
              //     }
              //     else {
              //       this.router.navigate(['/menu'])
              //     }
              //   })
              // }
              // else {
              //   this.router.navigate(['/menu'])
              // }
              // this.router.navigate(['/menu'])

            }
            else {
              Storage.clear()
              localStorage.clear()
              this.router.navigate(['/'])
            }
          }
        }
        else {
          this.router.navigate(['/'])
        }
      });
    })
  }




  getUniversity() {
    return localStorage.getItem('UniversityName') || ''
  }


}
