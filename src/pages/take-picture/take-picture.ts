import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { SendPhotoPage } from '../send-photo/send-photo';

@Component({
    selector: 'page-take-picture',
    templateUrl: 'take-picture.html'
})

export class TakePicturePage {
    constructor(
        private viewCtrl: ViewController,
        private modalCrtl: ModalController) {
    }
    takePicture(){
        
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
