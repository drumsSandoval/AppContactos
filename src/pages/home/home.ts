import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SingInPage } from '../sing-in/sing-in';
import { SingUpPage } from '../sing-up/sing-up';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email=''
  password=''
  //singUp = SingUpPage;
  //singIn = SingInPage;
  users:any;
  singIn = SingInPage;
  singUp = SingUpPage;
  constructor(public navCtrl: NavController, public http: HttpClient,public alertCtrl: AlertController) {

  }

  ionViewWillEnter(){
    this.email='';
    this.password='';
    this.http.get('/contacts/users/').subscribe(data =>{
      console.log(JSON.stringify(data));
      this.users = data;
    }, error =>{
      console.log(JSON.stringify(error));
    });
  }

  SingIn(){
    let band = true;
    this.users.forEach(user => {
      if(user.email == this.email)
        if(user.password == this.password){
          this.navCtrl.push(this.singIn,{id:user.id});
          band=false;
        }
    });
    if(band)
      this.showAlert();
  }

  SingUp(){
    this.navCtrl.push(this.singUp);
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '¡Ooops!',
      subTitle: 'Datos erróneos. Por favor, inténtelo otra vez.',
      buttons: ['OK']
    });
    alert.present();
  }
}
