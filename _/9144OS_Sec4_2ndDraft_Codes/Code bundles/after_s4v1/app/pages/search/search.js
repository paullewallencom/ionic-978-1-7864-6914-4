import {Page, NavController} from 'ionic/ionic';
import {Http} from 'angular2/http';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/search/search.html'
})
export class SearchPage {
  constructor(nav: NavController, httpService: Http) {
    this.nav = nav;
    this.results = [];
    this.keyword = '';
    this.http = httpService;
  }

  userPressedCancel() {
    console.debug('User pressed cancel');
  }

  keyHasBeenPressed(e) {
    if(e.keyIdentifier === 'Enter') {
      // TODO
      // API url:
      // https://redapesolutions.com/itunes?term=...
      this.http.get('https://redapesolutions.com/itunes?term='+this.keyword)
        .subscribe((response) => {
          this.results = response.json().results;
        });
    }
  }
}
