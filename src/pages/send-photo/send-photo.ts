import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, Slides, ViewController, AlertController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from "firebase";

@Component({
    selector: 'page-send-photo',
    templateUrl: 'send-photo.html'
})

export class SendPhotoPage {
    @ViewChild(Slides) slides: Slides;
    public user: string = '';
    public photos: AngularFireList<any>;
    public form: FormGroup;
    public location: string = '';
    public photo: string = '';
    public filter: string = 'original';
    public filters: string[] = [
        "original",
        "_1977",
        "aden",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "willow",
    ];

    constructor(
        private fb: FormBuilder,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private db: AngularFireDatabase,
        private afAuth: AngularFireAuth) {
        this.photos = db.list('/photos');
        this.photo = this.navParams.get('photo');
        afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user.email;
            }
        });

        this.form = this.fb.group({
           title:['', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(40),
                Validators.required
            ])],
        message:['', Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(255),
            Validators.required])]
        });
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                this.location = data.coords.latitude + ',' + data.coords.longitude;
            }, (error) => {
                let alert = this.alertCtrl.create({
                    title: 'Ops, algo deu errado',
                    subTitle: 'Não foi possível obter sua localização',
                    buttons: ['Ok']
                });
                alert.present();

            });
        }
    }
    changeFilter() {
        let currentContext = this.slides.getActiveIndex();
        this.filter = this.filters[currentContext];
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    submit(){
        let loader = this.loadingCtrl.create({content:"Enviando ..."});
        loader.present();

        this.photos
      .push({
        user: this.user,
        image: this.photo,
        filter: this.filter,
        location: this.location,
        title: this.form.controls['title'].value,
        message: this.form.controls['message'].value,
        date: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      });
    //O catch não está funcionado, psh não é uma promiselike - Verificar isso
    //   .catch(() => {
    //     loader.dismiss();
    //     let alert = this.alertCtrl.create({
    //       title: 'Ops, algo deu errado',
    //       subTitle: 'Não foi possível enviar sua imagem.',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   });
    }

    pushPhotos(){

    }
}
