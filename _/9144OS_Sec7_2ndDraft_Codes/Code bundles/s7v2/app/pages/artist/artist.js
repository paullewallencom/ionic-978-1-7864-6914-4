import {Page, NavController} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/artist/artist.html',
})
export class ArtistPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}
