import { Component } from '@angular/core';
import { LoadingController,ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { ShowMapPage } from "../show-map/show-map";


@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class PhotosPage {

  public photos: any[]=[];

  constructor(
    db: AngularFireDatabase,
    private loaderCtrl: LoadingController,
    private modalCtrl:ModalController) {

    let loader = this.loaderCtrl.create({ content: "Carregando ..." });
    loader.present();
    db.list('/photos').valueChanges().subscribe(photos => {
      this.photos = photos.reverse();
      loader.dismiss();
    }, error=>{
      loader.dismiss();
      console.log("Faió: ",error);
    });
  
  }
  showMap(location){
    let modal = this.modalCtrl.create(ShowMapPage, {location: location});
    modal.present();
  }

}
