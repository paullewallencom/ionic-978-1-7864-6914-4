import {Page, NavController} from 'ionic/ionic';
import {LanguageSetting} from './language';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  select(country) {
    this.selectCountry = country
    // Also keep inside service
    this.setting.country = country;
  }
  constructor(private nav: NavController, private setting: LanguageSetting) {
    this.countries = setting.countries;
  }
}
