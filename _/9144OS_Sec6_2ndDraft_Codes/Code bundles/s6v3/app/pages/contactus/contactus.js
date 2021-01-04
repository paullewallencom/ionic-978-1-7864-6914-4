import {Page, NavController} from 'ionic/ionic';
@Page({
  templateUrl: 'build/pages/contactus/contactus.html'
})
export class ContactusPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}
