import {Page, NavController, ActionSheet, Modal, Keyboard, Alert} from 'ionic/ionic';
import {PreviewModal} from './preview';
import {Itunes} from '../../itunes/itunes';
import * as lodash from 'lodash';
import * as ProgressIndicator from '../../../plugins/org.pbernasconi.progressindicator/www/progressIndicator';

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
    // Documentation says microseconds but it's .1ms, so use 10000 for 1s
    ProgressIndicator.showBarWithLabel(true, 50000, 'Waiting for iTunes');
    this.itunes.search(this.keyword).then((results) => {
      if(!results.length) {
        let alert = Alert.create({
          title: 'The iTunes API says....',
          subTitle: 'No match found!'
          buttons: ["I'll try again"]
        });
        this.nav.present(alert);
      } else {
        this.results = results;
        this._unfilteredResults = results;
        this.usesFilter = false;
      }
      ProgressIndicator.hide();
    });
  }

  openPreview(track) {
    let alert = Alert.create({
      title: 'Are you sure?',
      subTitle: 'that you want to open a preview...',
      buttons: [{
        text: 'Nah',
      },{
        text: 'Yes!',
        handler: () => {
          // Alternatively this.nav.last() instead of alert
          alert.dismiss().then(() => {
            // Resolves once animation is completed
            let modal = Modal.create(PreviewModal, {
              track: track
            });
            this.nav.present(modal);
          })
          // Prevent the alert from being dismissed "automatically"
          return false;
        }
      }]
    })
    this.nav.present(alert);
  }

  userPressedCancel() {
    console.debug('User pressed cancel');
  }

  keyHasBeenPressed(e) {
    this.keyboard.close();
    if(this.keyword === '') {
      let alert = Alert.create({
        title: 'Empty search not allowed',
        subTitle: 'Please key in your search below',
        inputs: [{
          name: 'term',
          placeholder: 'Search for...'
        }],
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Search',
            handler: data => {
              if(data.term) {
                this.keyword = data.term;
                this.search();
                // automatically dismiss
                return true;
              }
              // Don't allow to dismiss
              return false;
            }
          }
        ]
      })
      this.nav.present(alert);
    } else {
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
