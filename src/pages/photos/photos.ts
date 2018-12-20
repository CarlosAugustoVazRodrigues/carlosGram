import { Component } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class PhotosPage {

  public photos: any[]=[];

  constructor(
    db: AngularFireDatabase,
    private loaderCtrl: LoadingController) {

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

}
