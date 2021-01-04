import {Page, NavController} from 'ionic/ionic';
import {Itunes} from '../../itunes/itunes';

@Page({
  templateUrl: 'build/pages/search/search.html',
  viewProviders: [Itunes]
})
export class SearchPage {
  constructor(nav: NavController, itunes: Itunes) {
    this.nav = nav;
    this.results = [];
    this.keyword = '';
    this.itunes = itunes;
  }

  userPressedCancel() {
    console.debug('User pressed cancel');
  }

  keyHasBeenPressed(e) {
    if(e.keyIdentifier === 'Enter') {
      this.itunes.search(this.keyword).then((results) => this.results = results);
    }
  }
}
