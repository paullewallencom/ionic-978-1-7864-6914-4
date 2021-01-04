import {Page, NavController, ActionSheet, Modal} from 'ionic/ionic';
import {PreviewModal} from './preview';
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

  openPreview(track) {
    let modal = Modal.create(PreviewModal, {
      track: track
    });
    this.nav.present(modal);
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
  openFilters() {
    let sheet = ActionSheet.create({
      title: 'Filter by...',
      buttons: [
        {
          text: 'Movies only',
          handler: () => {
            this.results = this._unfilteredResults.filter((item) => item.kind === 'feature-movie');
            this.usesFilter = true;
          }
        },
        {
          text: 'Songs only',
          handler: () => {
            this.results = this._unfilteredResults.filter((item) => item.kind === 'song');
            this.usesFilter = true;
          }
        },
        {
          text: 'Clear',
          style: 'destructive',
          handler: () => {
            console.debug('Clearing filter');
            this.results = this._unfilteredResults;
            this.usesFilter = false;
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    })
    this.nav.present(sheet);
  }
}
