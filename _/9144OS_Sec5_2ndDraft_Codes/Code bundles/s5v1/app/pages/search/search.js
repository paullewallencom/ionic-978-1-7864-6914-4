import {Page, NavController} from 'ionic/ionic';
import {Itunes} from '../../itunes/itunes';

@Page({
  templateUrl: 'build/pages/search/search.html',
  viewProviders: []
})
export class SearchPage {
  constructor(nav: NavController, itunes: Itunes) {
    this.nav = nav;
    this.results = [];
    this._unfilteredResults = [];
    this.usesFilter = false;
    this.keyword = '';
    this.itunes = itunes;
  }

  userPressedCancel() {
    console.debug('User pressed cancel');
  }

  keyHasBeenPressed(e) {
    if(e.keyIdentifier === 'Enter') {
      this.itunes.search(this.keyword).then((results) => {
        this.results = results;
        this._unfilteredResults = results;
        this.usesFilter = false;
      });
    }
  }

  // Filtering function for case where user presses "Movies only" or "Songs only"
  // this.results = this._unfilteredResults.filter((item) => item.kind === '<the kind of items - feature-movie or song>');
}
