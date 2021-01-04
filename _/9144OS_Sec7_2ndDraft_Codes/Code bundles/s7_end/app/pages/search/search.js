import {Page, NavController, ActionSheet, Modal, Keyboard, Alert} from 'ionic/ionic';
import {PreviewModal} from './preview';
import {FilterByTypePipe} from './filter';
import {ArtistPage} from '../artist/artist';
import {Itunes} from '../../itunes/itunes';
import * as lodash from 'lodash';
import * as ProgressIndicator from '../../../plugins/org.pbernasconi.progressindicator/www/progressIndicator';

@Page({
  templateUrl: 'build/pages/search/search.html',
  viewProviders: [],
  pipes: [FilterByTypePipe]
})
export class SearchPage {
  constructor(private nav: NavController, private itunes: Itunes, private keyboard:Keyboard) {
    this.results = [];
    this.usesFilter = null;
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

  goToArtist(result) {
    this.nav.push(ArtistPage, {
      id:result.artistId,
      name: result.artistName
    });
  }

  search() {
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
        this.usesFilter = null;
      }
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
            this.usesFilter = 'feature-movie';
          }
        },
        {
          text: 'Songs only',
          handler: () => {
            this.usesFilter = 'song';
          }
        },
        {
          text: 'Clear',
          style: 'destructive',
          handler: () => {
            console.debug('Clearing filter');
            this.usesFilter = null;
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
