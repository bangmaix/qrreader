import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { HTTP } from '@ionic-native/http/ngx';
import { tap, catchError, finalize } from 'rxjs/operators';
import { NavigationExtras, ActivatedRoute, Router, Route } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  api_url = environment.api_url;
  api_mobile = environment.api_mobile;
  barierToken='';
  qris: any;
  data_profil={};
  isLoading = true;

  constructor(private auth: AuthService,
              private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpNative: HTTP,
              private plt: Platform
              ) { 
  
              }

  ngOnInit() {

    this.getToken().subscribe();

    // if(this.plt.is('cordova')){
    //   this.getTokenNative();
    // }else {
    //   this.getToken().subscribe;
    // }
  }
  

  getToken() {
    this.auth.showHideLoader();
    const s_key = environment.secret_key;

    let secret = {
      'secret': s_key
    }

    return this.http.post(`${this.api_url}/get-token`, secret).pipe(
      tap(res => {
        if (res['api_status'] == 0) {
          this.auth.showAlert(res['api_message'], 'Gagal');
          this.auth.dismissLoader();
        } else {
          const data = res['data'];
          this.barierToken = data.access_token
          this.getProfile(this.barierToken).subscribe();
        }

      }),
      catchError(e => {
        this.auth.dismissLoader();
        this.auth.showAlertWithAction('Terjadi Kesalahan pada server, ulangi proses kembali', 'Kesalahan');
        throw new Error(e);
      })

    )
  }

  //function ini untuk melakukan request api menggunakan http native
  //http native hanya dapat dieksekusi pada mobile (cordova)
  getTokenNative(){
    // this.auth.showHideLoader();
    const s_key = environment.secret_key;
    let secret = {
      'secret': s_key
    }

    let nativeCall = this.httpNative.post(`${this.api_mobile}/get-token`, secret, {
      'Content-Type': 'application/json'
    });

    from(nativeCall).pipe (
      finalize(() => {
      })
    )
    .subscribe(res => {
      var str = res.data;
      this.auth.showAlert(str, 'data')
      // this.getProfileNative('123')
    }, err => {
      this.auth.showAlert(err.error, 'Kesalahan')
    });

  }

  getProfileNative(token){

    this.auth.showAlert(token, 'token')
    this.isLoading = true;

    //get the qrisValue dinamically using router queryparams
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.qris = JSON.parse(params.special);
      }
    })

    var reqHeader = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    const body = {qris_value: this.qris};

    this.httpNative.post(`${this.api_mobile}/qris_cek`, body, reqHeader)
      .then(res => {
        this.data_profil = res['data'];
        // this.auth.dismissLoader();
        this.auth.showAlert(this.data_profil, 'berhasil')
        this.isLoading = false;
      })
      .catch(err => {
        // this.auth.dismissLoader();
        this.auth.showAlert(err.error, 'gagal')

      })

  }

  //get profile
  getProfile(token){
    
    this.isLoading = true;
    //get the qrisValue dinamically using router queryparams
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.qris = JSON.parse(params.special);  
      }
    })

    var reqHeader = new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    })

    const body = { qris_value: this.qris };

    return this.http.post(`${this.api_url}/qris_cek`, body, { headers: reqHeader }).pipe(
      tap(res=>{
        if (res['api_status'] == 0) {
          this.auth.dismissLoader();
          this.auth.showAlertWithAction('Data tidak terdaftar', 'Kesalahan');

        } else {
          this.data_profil = res['data'];
          this.isLoading = false;
          this.auth.dismissLoader();
        }
      }),
      catchError(e => {
        this.auth.dismissLoader();
        this.auth.showAlertWithAction('Terjadi Kesalahan pada server, ulangi proses kembali', 'Kesalahan');
        throw new Error(e);
      })

    )

   }

 

}
