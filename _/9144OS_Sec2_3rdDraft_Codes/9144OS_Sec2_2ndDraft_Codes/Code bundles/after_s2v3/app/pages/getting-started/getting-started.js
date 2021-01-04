import {Page, NavController} from 'ionic/ionic';
import {SearchPage} from '../search/search';

@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage {
  constructor(nav: NavController) {
    this.nav = nav;
    this.theSearchPage = SearchPage;
  }
  goToSearch() {
    this.nav.setRoot(SearchPage);
  }
}
