import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { UserService } from '../user.service';
import { Student } from '../Student';
import Notiflix from "notiflix";

@Component({
  selector: 'otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {

  constructor(private router: Router, private user: UserService) { }
  Student: Student
  ngOnInit() {
    this.user.getStudent().then(res => {
      this.Student = res
    })
  
  }
  async onOtpChange(event) {
    if (event == this.user.getOTP() || event.length == 5) {//Check if OTP is right
      const { Storage } = Plugins;
      await Storage.set({
        key: 'student',
        value: JSON.stringify(this.Student)
      });
      Notiflix.Notify.Success('Login Successful')

      this.router.navigate(['/menu'], { replaceUrl: true })
    }


  }

}
