import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { ProfilYayasanPage } from '../profil-yayasan/profil-yayasan';
import { FIREBASE_CONFIG } from "../../app/firebase.config";
import { Camera, CameraOptions} from "@ionic-native/camera";
import { storage, initializeApp} from 'firebase';

/**
 * Generated class for the EditYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-yayasan',
  templateUrl: 'edit-yayasan.html',
})
export class EditYayasanPage {
	namapemilik: string;
  email: string;
  alamat: string;
  hp: number;
  image: string;
  id_yayasan: string;

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,	
  			public app: App,
  			public alertCtrl: AlertController,
        private fire: AngularFireAuth,
        private camera: Camera,
  			private firedata: AngularFireDatabase

  			) {

              var user = this.fire.auth.currentUser;
          this.firedata.object('/data_yayasan/'+user.uid).subscribe(data=>{
            this.namapemilik = data.namaPemilik;
            this.alamat= data.alamat;
            this.hp = data.noHp;
            this.id_yayasan = data.id;
            this.email = data.email;
            //this.email = data.email;
          })
  }

  getPhotoFromGallery(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      // this.base64Image = imageData;
      // this.uploadFoto();
      this.image = 'data:image/jpeg;base64,' + imageData;

      const picture = storage().ref('picture/dpYayasan/'+this.id_yayasan);
      picture.putString(this.image, 'data_url');
      
      storage().ref().child('picture/dpYayasan/'+ this.id_yayasan).getDownloadURL().then(url =>{
        this.image=url;
        this.firedata.object('/data_yayasan/'+this.id_yayasan).update({
          image:this.image
        });
      })
      
            
      }, (err) => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditYayasanPage');
  }

    edit(){
  		var user = this.fire.auth.currentUser;
  		this.firedata.object('/data_yayasan/'+user.uid).update({
        namaPemilik: this.namapemilik,
        email: this.email,
        alamat: this.alamat,
        hp:this.hp

  		});
  		this.navCtrl.setRoot(ProfilYayasanPage);

  }

}
