import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { WebrequestService } from 'src/app/api/webrequest.service';
import { Plugins } from '@capacitor/core';
import { Student } from 'src/app/Student';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {

  constructor(private router: Router, public zone: NgZone, private web: WebrequestService) { }



  Faqs = []
  ngOnInit() {
    this.getFaqs();

  }

  async getFaqs() {
    const { Storage } = Plugins;
    await Storage.get({ key: 'student' }).then(res => {
      if (res) {
        let Student: Student = JSON.parse(res.value)
        this.web.Get('faqs/faq/' + Student.instituteId).subscribe((res: Array<any>) => {
          if (res) {
            this.Faqs = res
            setInterval(() => {
              const items = document.querySelectorAll(".accordion button");
              function toggleAccordion() {
                const itemToggle = this.getAttribute('aria-expanded');
                if (itemToggle == 'false') {
                  this.setAttribute('aria-expanded', 'true');
                }
                if (itemToggle == 'true') {
                  this.setAttribute('aria-expanded', 'false');
                }
              }
              items.forEach(item => item.addEventListener('click', toggleAccordion));
            }, 1000)
            console.log(this.Faqs)
          }
        })
      }
    })
  }

}