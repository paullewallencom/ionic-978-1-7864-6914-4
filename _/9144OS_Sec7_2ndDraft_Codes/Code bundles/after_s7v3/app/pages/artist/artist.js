import {Page, NavController, NavParams} from 'ionic/ionic';
import {Itunes} from '../../itunes/itunes';

@Page({
  templateUrl: 'build/pages/artist/artist.html'
})
export class ArtistPage {
  constructor(private nav: NavController, params: NavParams, itunes: Itunes) {
    this.artist = params.data;
    itunes.loadAlbums(this.artist.id)
      .then(albums => this.albums = albums);
  }
}
