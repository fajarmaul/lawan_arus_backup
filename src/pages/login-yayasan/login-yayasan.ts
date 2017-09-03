import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';
import { RegisterYayasanPage } from '../register-yayasan/register-yayasan';


/**
 * Generated class for the LoginYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-yayasan',
  templateUrl: 'login-yayasan.html',
})
export class LoginYayasanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginYayasanPage');
  }

  login(){

	//this.navCtrl.setRoot(TabsPage);
		this.navCtrl.push(TabsYayasanPage);

	}
daftar(){

  //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.push(RegisterYayasanPage);

  }

}