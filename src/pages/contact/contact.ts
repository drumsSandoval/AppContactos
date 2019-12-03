import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contact: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public  alertCtrl: AlertController,public DomSantizer:DomSanitizer,public http : HttpClient) {
    this.contact = this.navParams.get('contact');
    console.log(this.contact);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
  ionViewWillEnter(){
    this.contact = this.navParams.get('contact');
  }


  Delete(){
    this.showAlert();
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Delete',
    message: '¿Delete Contact?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },

      },
      {
        text: 'Ok',
        handler: () => {
          this.DeleteContact();
        }
      }
    ]
    });
    alert.present();
  }
  DeleteContact(){
    this.http.post('/contacts/delete/',this.contact).subscribe(data =>{
      console.log(JSON.stringify(data));
      this.navCtrl.pop();
    },error =>{
      console.log(JSON.stringify(error));
      this.navCtrl.pop();
    });
  }

}
