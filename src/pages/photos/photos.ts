import { Component } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class PhotosPage {
  public photos: Observable<any[]> ;
  constructor(
    db:AngularFireDatabase,
    private  loaderCtrl: LoadingController) {

    let loader = this.loaderCtrl.create({ content: "Carregando ..." });
    loader.present();

    this.photos = db.list('/photos').valueChanges();
    
    
      loader.dismiss();
    

  }

}
