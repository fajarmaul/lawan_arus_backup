import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { UploadPage } from "../upload/upload";
import { FIREBASE_CONFIG } from "../../app/firebase.config";
import { Camera, CameraOptions} from "@ionic-native/camera";
import { storage, initializeApp} from 'firebase';

/**
 * Generated class for the Home1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {
  image: string;

  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
  }

  async takePicture(){
    try {
      const options : CameraOptions = {
        quality: 50, //to reduce img size
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL, //to make it base64 image
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result =  await this.camera.getPicture(options);

      this.image = 'data:image/jpeg;base64,' + result;

      const picture = storage().ref('picture/photo/');
      picture.putString(this.image, 'data_url');
      

    }
    catch (e) {
      console.error(e);
      alert("error");
    }

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

      const picture = storage().ref('picture/photo/');
      picture.putString(this.image, 'data_url');
      
            
      }, (err) => {
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home1Page');
  }

/*  detail(){

	//this.navCtrl.setRoot(DetailPage);
		this.navCtrl.push(DetailPage);

	}*/
}
