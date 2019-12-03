import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the SingUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sing-up',
  templateUrl: 'sing-up.html',
})
export class SingUpPage {
  user = {
    email: '',
    password:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public http : HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingUpPage');
  }
  addUser(){
    console.log(JSON.stringify(this.user));
    this.http.post('/contacts/users/',this.user).subscribe(data =>{
      console.log(JSON.stringify(data));
      this.navCtrl.pop();
    },error =>{
      console.log(JSON.stringify(error));
      this.navCtrl.pop();
    });

  }
}
