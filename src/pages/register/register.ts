import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TabsYayasanPage } from '../tabs-yayasan/tabs-yayasan';
import { AngularFireAuth } from 'angularfire2/auth'


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

	    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let password1 = AC.get('password1').value; // to get value in input tag
        if(password != password1) {
            console.log('false');
            AC.get('password1').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }

	    registerForm: FormGroup;
	    submitAttempt: boolean = false;


  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
        nama: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6)  , Validators.required])],
        password1: ['']
    }, {
      validator: RegisterPage.MatchPassword // your validation method
    }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

 /* daftar(){

  //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.push(TabsPage);

  }*/
  daftar(){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log('got data', data);
    })

    .catch (error => {
      console.log('got an error', error);
    })

  //this.navCtrl.setRoot(TabsPage);
    //this.navCtrl.push(TabsYayasanPage);

  }

}
