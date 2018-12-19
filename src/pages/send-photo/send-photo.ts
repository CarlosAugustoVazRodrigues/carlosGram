import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-send-photo',
    templateUrl: 'send-photo.html'
})

export class SendPhotoPage {
    public location: string = '';
    constructor(
        private viewCtrl: ViewController,
        private alertCtrl: AlertController) {
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                this.location = data.coords.latitude + ',' + data.coords.longitude;
            }, (error) => {
                let alert = this.alertCtrl.create({
                    title:'Ops, algo deu errado',
                    subTitle:'Não foi possível obter sua localização',
                    buttons:['Ok']
                });
                alert.present();

            });
        };
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
