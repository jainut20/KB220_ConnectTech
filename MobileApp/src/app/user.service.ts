import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  student:Student 
  Response = []
  OTP:string
  constructor() { }

  setReponse(res){
    this.Response = res
  }
  setOTP(s){
    this.OTP=s
  }
  setStudent(s:Student){
    this.student =s
  }
  getOTP(){
    return this.OTP
  }
  getResponse(){
    return this.Response
  }

  async getStudent(){
    if(this.student == undefined){
      const { Storage } = Plugins;
      let res = await Storage.get({ key: 'student' });
     this.setStudent(JSON.parse(res.value))
    }
    return this.student
  }
}
