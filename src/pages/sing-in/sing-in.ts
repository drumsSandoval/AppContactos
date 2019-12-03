import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AddContactPage } from '../add-contact/add-contact';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ContactPage } from '../contact/contact';
/**
 * Generated class for the SingInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sing-in',
  templateUrl: 'sing-in.html',
})
export class SingInPage {
  Contact = {
    id:'',
    name: '',
    email: '',
    image:'',
    facebook: '',
    twitter:'',
    instagram:'',
    phone:'',
    user_id:''
  }
  id:any
  contacts:any;
  addContacts = AddContactPage;
  contactPage = ContactPage;
  mostrarc=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public DomSantizer:DomSanitizer, public http : HttpClient, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('Yay');
  }

  ionViewWillEnter(){
    let aux;
    this.id = this.navParams.get('id');
    this.http.get('/contacts/contacts/').subscribe(data =>{
      console.log(JSON.stringify(data));
      aux = data;
      this.mostrar(aux);
    }, error =>{
      console.log(JSON.stringify(error));
    });

  }

  mostrar(aux){
    this.contacts=[]
    aux.forEach(c => {
      if(c.user_id == this.id){
        this.contacts.push(c);
      }
    });

  }

  clickAdd(){
    this.navCtrl.push(this.addContacts,{
      id: this.id
    });
  }

  clickContact(c){
    this.navCtrl.push(this.contactPage,{
      contact: c
    }
      );
  }


}
