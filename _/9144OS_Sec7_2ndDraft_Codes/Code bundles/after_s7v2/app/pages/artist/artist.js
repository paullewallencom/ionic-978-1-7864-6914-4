import {Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/artist/artist.html'
})
export class ArtistPage {
  constructor(private nav: NavController, params: NavParams) {
    this.artist = params.data;
  }
}
