import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = environment.api_url;
  // api_mobile = environment.api_mobile;
  token = new BehaviorSubject(null);
  
  
  constructor( private alertCtrl: AlertController,
               private http: HttpClient,
               private plt: Platform,
               private nativeHttp: HTTP,
               private loadingController: LoadingController,
               private nav: NavController ) { }

  //method ini akan dieksekusi apabila server dirunning pada browser
  getTokenBarier(){
    
    const s_key = environment.secret_key;
    let token_key = '';

    //secret key
    let secret = {
      'secret': s_key
    }

  //get token
   return this.http.post(`${this.api_url}/get-token`, secret).subscribe(res => {
      if(res['api_status'] == 0){
        this.showAlert(res['api_message'], 'Gagal');
      }else{
        const data = res['data'];
        token_key = data.access_token
        this.token.next(token_key);
      }
    
    })

  }

  //loader create
  async showHideLoader() {
    this.loadingController.create({
      message: 'Tunggu Sebentar, Kami Sedang Mengambil Data',
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!', dis);
      });
    });
  }

  //loader dismiss
  dismissLoader() {
    this.loadingController.getTop().then(v => v ? this.doStopLoader() : null);
  }
  
  doStopLoader() {
    this.loadingController.dismiss();
  }

    
  showAlert(msg, header) {
    let alert = this.alertCtrl.create({
      message: msg,
      header: header,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  showAlertWithAction(msg, header) {
    let alert = this.alertCtrl.create({
      message: msg,
      header: header,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.nav.back();
        }
      }],

    });
    alert.then(alert => alert.present());
  }

}
