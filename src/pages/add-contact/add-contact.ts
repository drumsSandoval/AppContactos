import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { normalizeURL } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AddContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {
  Contact = {
    id:'',
    name: '',
    email: '',
    image: '',
    facebook: '',
    twitter:'',
    instagram:'',
    phone:'',
    user_id:''
  }
  user_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public camera:Camera,public DomSantizer:DomSanitizer, public http : HttpClient) {
    this.user_id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

  OpenFileDialog(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }).then(resultado => {
      this.Contact.image = normalizeURL(resultado);
    }).catch(error =>{
      console.log(error);
    })
    console.log(this.Contact.image)
  }

  saveContact(){
    this.Contact.user_id = this.user_id;
    console.log(JSON.stringify(this.Contact));
    this.http.post('/contacts/contacts/',this.Contact).subscribe(data =>{
      console.log(JSON.stringify(data));
      this.navCtrl.pop();
    },error =>{
      console.log(JSON.stringify(error));
      this.navCtrl.pop();
    });
  }

}
