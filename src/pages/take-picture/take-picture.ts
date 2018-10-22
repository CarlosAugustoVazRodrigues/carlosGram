import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'Page-take-picture',
    templateUrl: 'take-picture.html'
})

export class TakePicturePage {
    constructor(
        private viewCtrl: ViewController) {
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
