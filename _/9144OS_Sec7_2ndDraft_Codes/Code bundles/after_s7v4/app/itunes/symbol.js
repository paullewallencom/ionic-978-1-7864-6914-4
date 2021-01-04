import {Pipe} from 'angular2/core';
import {LanguageSetting} from '../pages/settings/language';

@Pipe({
  name: 'toSymbol'
})
export class ToSymbolPipe {
  constructor(settings: LanguageSetting) {
    this.settings = settings;
  }
  transform(v, args) {
    return this.settings.country.currency || v;
  }
}
