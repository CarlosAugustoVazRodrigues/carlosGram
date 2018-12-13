import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
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
  }

  submit() {
    let loader = this.laodingCtrl.create({ content: "Cadastrando..." });
    loader.present();

    this.afAuth.auth
      .createUserWithEmailAndPassword(
        this.form.controls['email'].value,
        this.form.controls['password'].value)
      .then(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Bem vindo!',
          subTitle: 'Estamos felizes por ter você aqui! Seu acesso já está pronto, aproveite!',
          buttons: ['Ok']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);

      }).catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Ops! Parece que algo deu errado...',
          subTitle: 'Não foi possível realizar seu cadastro. Revise suas informações e tente novamente.',
          buttons: ['Ok']
        });
        alert.present();
      });

  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
