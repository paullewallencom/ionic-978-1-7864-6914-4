import {Page, NavController} from 'ionic/ionic';
import {Validators, FormBuilder} from 'angular2/common';
@Page({
  templateUrl: 'build/pages/contactus/contactus.html',
})
export class ContactusPage {
  constructor(nav: NavController, fb: FormBuilder) {
    this.nav = nav;
    this.contactForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  submitForm() {
    debugger;
  }
}
