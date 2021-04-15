import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pelanggaran',
  templateUrl: './pelanggaran.page.html',
  styleUrls: ['./pelanggaran.page.scss'],
})
export class PelanggaranPage implements OnInit {

  api_url = environment.api_url;
  jenis_pelanggaran;
  check_pelanggaran: any = [];
  token_barier;
  id_pendaftar;
  checkedIdx = 0;
  isLoading = true;
  barierToken;
  constructor(private http: HttpClient,
              private auth: AuthService,
              private route: ActivatedRoute,
              private nav: NavController,
              private alertCtrl: AlertController,
              ) { }

  ngOnInit() {
    this.getToken().subscribe();
  }

  getToken(){
    this.auth.showHideLoader();
    const s_key = environment.secret_key;

    let secret = {
    'secret': s_key
    }

    return this.http.post(`${this.api_url}/get-token`, secret).pipe(
      tap(res=>{
        if (res['api_status'] == 0) {
          this.auth.showAlert(res['api_message'], 'Gagal');
          this.auth.dismissLoader();
        } else {
          const data = res['data'];
          this.barierToken = data.access_token
          this.getListPelanggaran(this.barierToken).subscribe();
        }

      }),
      catchError(e => {
        this.auth.dismissLoader();
        this.auth.showAlertWithAction('Terjadi Kesalahan pada server, ulangi proses kembali', 'Kesalahan');
        throw new Error(e);
      })

    )
  }


  getListPelanggaran (token){

      var reqHeader = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
     })

    return this.http.get(`${this.api_url}/jenis_pelanggaran`, { headers: reqHeader }).pipe(
      tap(res=>{
        if(res['api_status'] == 0){
          this.auth.showAlert(res['api_message'], 'Kesalahan');
           this.auth.dismissLoader();
        } else {
          this.jenis_pelanggaran = res['data'];
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


  simpanPelanggaran(){
   
    const id = this.route.snapshot.params.id;

    var reqHeader = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${this.barierToken}`
    })

    var body = {
      id_pendaftar: id,
      id_jenis_pelanggaran: this.checkedIdx
    };

    this.http.post(`${this.api_url}/pelanggaran`, body, { headers: reqHeader }).subscribe(res => {
      if(res['api_status'] == 0){
        this.auth.showAlert('Data Gagal Disimpan', 'Kesalahan')
      } else {
        this.auth.showAlertWithAction('Data Berhasil Disimpan', 'Berhasil')
      }
    })

  }


}
