import {Page, NavController, ActionSheet, Modal, Keyboard} from 'ionic/ionic';
import {PreviewModal} from './preview';
import {Itunes} from '../../itunes/itunes';
import * as lodash from 'lodash';

@Page({
  templateUrl: 'build/pages/search/search.html',
  viewProviders: []
})
export class SearchPage {
  constructor(nav: NavController, private itunes: Itunes, private keyboard:Keyboard) {
    this.nav = nav;
    this.results = [];
    this._unfilteredResults = [];
    this.usesFilter = false;
    this.keyword = '';
  }

  reloadData(refresher) {
    this.results = [];
    this.itunes.search(this.keyword).then(results => {
      console.log(results);
      refresher.complete();
      this.results = lodash.shuffle(results);
      console.log(this.results);
    })
  }

  search() {
    this.itunes.search(this.keyword).then((results) => {
      this.results = results;
      this._unfilteredResults = results;
      this.usesFilter = false;
    });
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
      this.keyboard.close();
      this.search();
    }
  }

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
