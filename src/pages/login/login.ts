import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private laodingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    afAuth.authState.subscribe(user =>{
      if(user){
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

  
  goToSignup() {
    this.navCtrl.setRoot(SignupPage);
  }

  submit(){
    let loader = this.laodingCtrl.create({content:"Autenticando ..."});
    loader.present();

    this.afAuth.auth
    .signInWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
    .then(()=>{
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    })
    .catch(()=>{
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title:'Falha ao autenticar usuário',
        subTitle:'Usuário e/ou senha incorreto(s)',
        buttons:['Ok']
      });
      alert.present();
      })
    }
}
