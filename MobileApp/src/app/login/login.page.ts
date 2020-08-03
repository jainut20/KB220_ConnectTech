import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { WebrequestService } from '../api/webrequest.service';
import { UserService } from '../user.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/';

import { Plugins } from '@capacitor/core';
import Notiflix from "notiflix";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  fingerprintOptions: any;

  constructor(private faio: FingerprintAIO, private router: Router, public zone: NgZone, private alert: AlertController, public platform: Platform, private web: WebrequestService,
    private user: UserService, private androidPermissions: AndroidPermissions) {

  }
  Email: string
  Password: string
  plt
  data
  showPassword = false;

  ngOnInit() {
    this.plt = this.platform.platforms();
    if (this.plt.includes('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
        result => console.log('Has permission?', String(result.hasPermission)),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
      );
    }

  }
  Login() {
    try {
      Notiflix.Loading.Standard();
      const { Storage } = Plugins;

      this.zone.run(() => {

        let userEmail = this.Email
        let userPassword = this.Password
        let user = { userEmail, userPassword }
        this.web.post('login/student', user).subscribe(async (res: any) => {
          if (res.status == 1) {
           
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('OTP Sent Successfully')
            this.user.setStudent(res.studentDetails)
            this.Email = ''
            this.Password = ''
            console.log(res.studentDetails.studentMobileNo)
            this.web.post('additional/otp' , {studentMobileNo : 9930592116}).subscribe((res:any)=>{
              console.log(res)
              this.user.setOTP(res.otp)
              this.router.navigate(['/otp'])
            })
           
            // this.fingerprintOptions = {
            //   clientId: 'fingerprint-Demo',
            //   clientSecret: 'password', //Only necessary for Android
            //   disableBackup: true  //Only for Android(optional)
            // }
            // if (this.platform.is("android")){
            //   this.faio.isAvailable().then(result => {
            //     if (result == 'biometric') {
            //       this.faio.show(this.fingerprintOptions).then(() => {
            //         this.router.navigate(['/menu'], { replaceUrl: true })
            //       }).catch(err => {
            //         console.log(err)
            //       })
            //     }
            //     else {
            //       this.router.navigate(['/menu'], { replaceUrl: true })
            //     }
            //   })
            // }
            // else{
            //   this.router.navigate(['/menu'], { replaceUrl: true })
            // }

          }
          else if (res.status == -1) {
            Notiflix.Loading.Remove();
            this.showAlert('Error', 'Wrong Password')
          }
          else if (res.status == -2) {
            Notiflix.Loading.Remove();
            this.showAlert('Error', 'User not verified.Wait for verification')
          }
          else if (res.status == -3) {
            Notiflix.Loading.Remove();
            this.showAlert('Error', 'Student not registered')
          }
          else if (res.status == -100) {
            Notiflix.Loading.Remove();
            this.showAlert('Error', 'You have been blocked.')
          }
        })
      })
    }
    catch (err) {
      Notiflix.Loading.Standard();
      this.showAlert('Error', err)
    }

  }

  onOtpChange(event) {
    console.log(event)
  }
  TogglePassword() {
    this.showPassword = !this.showPassword
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }
}
