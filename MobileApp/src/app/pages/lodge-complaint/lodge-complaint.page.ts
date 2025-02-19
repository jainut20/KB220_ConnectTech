import { Component, OnInit } from '@angular/core';
import { Grievance } from 'src/app/Grievance';
import { WebrequestService } from 'src/app/api/webrequest.service';
import { Plugins } from '@capacitor/core';
import { Student } from 'src/app/Student';
import { Platform, AlertController } from '@ionic/angular';
import Notiflix from "notiflix";
import { Camera } from '@ionic-native/camera/ngx/'
import { ImageServiceService } from '../../image-service.service'
import { RegistrationService } from 'src/app/api/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lodge-complaint',
  templateUrl: './lodge-complaint.page.html',
  styleUrls: ['./lodge-complaint.page.scss'],
})
export class LodgeComplaintPage implements OnInit {
  grievance: Grievance = {}
  imgPreview: any;
  imageSet: boolean;
  itemPicturesStoreURL: unknown;
  Categories = []
  plt: any
  Student: Student = {}
  FindFaq: any
  base64Image
  constructor(private web: WebrequestService, private register: RegistrationService, public platform: Platform, private router: Router, private alert: AlertController, private camera: Camera, public imageProvider: ImageServiceService) { }

  async ngOnInit() {
    this.plt = this.platform.platforms();
    this.GetCategories()
    const { Storage } = Plugins;
    await Storage.get({ key: 'student' }).then(res => {
      if (res) {
        this.Student = JSON.parse(res.value)
      }
    })
    this.grievance.complaintStudentId = this.Student.studentId;
  }


  GetCategories() {
    this.web.Get('categories').toPromise().then((data: Array<any>) => {
      this.Categories = data
    })
  }
  async DetectComplaint() {
    try {
      if (this.grievance.complaintDetail && this.grievance.complaintTitle) {
        await this.web.post('grievances/check/spam', { complaintDetail: this.grievance.complaintDetail }).toPromise().then(async (res: any) => {
          if (res) {
            if (res.status == -100) {
              Notiflix.Notify.Failure('Spam Complaints not allowed.Simplify your complaint')
            }
            else if (res.status == 1) {
              await this.web.post('grievances/check/category', { complaintDetail: this.grievance.complaintDetail }).toPromise().then((res: any) => {
                this.grievance.categoryId = res.categoryId
                Notiflix.Notify.Success('Category has been detected')

              })
            }
          }
          else {
            Notiflix.Notify.Failure('Server Error while detecting category.Try again in sometime')
          }
        })
      }
      else {
        Notiflix.Notify.Failure('Please add more detail/ add title to the complaint.')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  /*************************Check FAQs*********************************************/

  async CheckFaq() {
    await this.web.post('grievances/check/faq', { complaintDetail: this.grievance.complaintDetail, complaintCommitteeId: this.Student.instituteId }).toPromise().then(async (res: any) => {
      this.FindFaq = res
    })

  }

  /*********************ASK FOR CONFIRMATIoN */

  async confirmation() {
    let alert = await this.alert.create({
      header: 'Same Question found in FAQs',
      message: `Complaint Question: ${this.FindFaq.faqDetails} ?  Complaint Answer : ${this.FindFaq.faqComment} . \n Do you still want to lodge the complaint ?`,
      buttons: [
        {
          text: 'Yes',
          role: 'Submit',
          handler: () => {
            this.PushComplaint()
          }
        },
        {
          text: 'No',
          handler: () => {
            Notiflix.Notify.Warning('Complaint not pushed. You can check FAQs page.')
          }
        }
      ]
    });
    alert.present();
  }

  /**********************************************Lodging Complaint**********************************/
  async LodgeComplaint() {
    try {
      Notiflix.Loading.Standard();
      if (!this.grievance.categoryId) {
        await this.DetectComplaint()
      }
      if (this.grievance.complaintDetail.length < 15) {
        Notiflix.Loading.Remove();
        Notiflix.Notify.Warning('Please add more detail to the complaint.')
      }
      else if (this.grievance.complaintDetail && this.grievance.complaintTitle && this.grievance.categoryId && (this.grievance.complaintIsAnonymous == 0 || this.grievance.complaintIsAnonymous == 1)) {
        let isActive = await this.register.Isactive(this.Student.studentId)
        if (isActive) {
          await this.CheckFaq();
          if (this.FindFaq) {
            Notiflix.Loading.Remove();
            this.confirmation()
          } else {
            this.PushComplaint()
          }
        }
        else {
          Notiflix.Loading.Remove();
          this.showAlert('Error', 'You have been blocked')
          localStorage.clear()
          const { Storage } = Plugins;
          Storage.clear()
          this.router.navigate(['/'])
        }
      }
      else {

        Notiflix.Loading.Remove();
        Notiflix.Notify.Warning('Empty Complaint Not allowed.Make sure your category is detected')
      }
    }
    catch (err) {
      this.showAlert('Failed', 'Something Went Wrong.' + err)
      Notiflix.Loading.Remove();
    }
  }

  /***************************************** PUSH COmplaint ***************************/
  async PushComplaint() {

    console.log('Hello')
    await this.submitForm();
    if (this.imageSet)
      this.grievance.imageUrl = 'https://sih2020complaints.s3.amazonaws.com/' + this.itemPicturesStoreURL
    else
      this.grievance.imageUrl = ''

    this.web.post('grievances/grievance', this.grievance).subscribe((res: any) => {
      Notiflix.Loading.Remove();
      if (res) {
        if (res.status == 1) {
          this.showAlert('Sucess', 'Complaint logded successfully.')

          this.grievance = {}
          this.grievance.complaintStudentId = this.Student.studentId
          this.imgPreview = null
          this.imageSet = false
        }
        else {
          this.showAlert('Failed', 'Something Went Wrong.')
        }
      }
      else {
        Notiflix.Notify.Failure('Server did not responding while posting grievance.')
      }

    })
  }
  FileChange(event) {
    let file = event.target.files[0];
    // let 
    console.log(file)
    this.imgPreview = file
    this.imageSet = true;
  }

  async submitForm() {
    if (this.imageSet) {
      let imageName = 'Complaint_';
      await this.imageProvider.uploadImage(this.imgPreview, imageName).then((res) => {
        console.log("Response", res);
        this.itemPicturesStoreURL = res;
      }).catch(async (err) => {
        await this.showAlert("Error is", err)
      })
    }
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
