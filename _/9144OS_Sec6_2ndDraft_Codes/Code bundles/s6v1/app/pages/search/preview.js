import {Page, NavParams, ViewController} from 'ionic/ionic';

@Page({
  template: `
  <ion-content padding>
    <h2>{{track.trackName}}</h2>
    <audio [src]="track.previewUrl" *ngIf="track.kind === 'song'"  autoplay="autoplay" controls="controls">
      Browser doesn't support
    </audio>
    <video [src]="track.previewUrl" *ngIf="track.kind === 'feature-movie'"  autoplay="autoplay" controls="controls">
      Browser doesn't support
    </video>
    <button (click)="close()">Close</button>
  </ion-content>`,
})
export class PreviewModal {
  constructor(params: NavParams, public viewCtrl: ViewController) {
    console.debug(params.data);
    this.track = params.data.track;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
