import {Page, NavController, NavParams} from 'ionic/ionic';
import {Itunes} from '../../itunes/itunes';
import {ToSymbolPipe} from '../../itunes/symbol';

@Page({
  templateUrl: 'build/pages/artist/artist.html',
  pipes: [ToSymbolPipe]
})
export class ArtistPage {
  constructor(private nav: NavController, params: NavParams, itunes: Itunes) {
    this.artist = params.data;
    itunes.loadAlbums(this.artist.id)
      .then(albums => this.albums = albums);
  }
}
