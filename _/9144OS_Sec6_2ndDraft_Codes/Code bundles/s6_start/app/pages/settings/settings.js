import {Page, NavController} from 'ionic/ionic';
import {Itunes} from '../../itunes/itunes';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  constructor(nav: NavController, itunes:Itunes) {
    this.nav = nav;
    this.countries = [
      {
        name: 'United States',
        local_name: 'USA',
        code: 'US',
        currency: '$'
      },
      {
        name: 'United Kingdom',
        code: 'UK',
        local_name: 'The UK',
        currency: '£'
      },
      {
        name: 'Russia',
        local_name: 'Россия',
        code: 'RU'
      },
      {
        name: 'Israel',
        rtl: true,
        code: '',
        local_name: 'יִשְׂרָאֵל'
      }
    ];
  }
}
