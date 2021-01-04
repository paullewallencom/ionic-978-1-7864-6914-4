import {Page, NavController} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/search/search.html'
})
export class SearchPage {
  constructor(nav: NavController) {
    this.nav = nav;
    this.results = [];
    this.keyword = '';
  }

  userPressedCancel() {
    console.debug('User pressed cancel');
  }

  keyHasBeenPressed(e) {
    if(e.keyIdentifier === 'Enter') {
      // TODO
      // API url:
      // https://itunes.apple.com/search
    }
  }
}
