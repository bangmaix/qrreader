import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.page.html',
  styleUrls: ['./detail-profile.page.scss'],
})
export class DetailProfilePage implements OnInit {

  token_barier;
  api_url = environment.api_url;
  data_profile={};
  isLoading = true;
  barierToken;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    
  ) { }

  ngOnInit() {
    this.getToken().subscribe();
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

  getProfile(token) {
    const qris = this.route.snapshot.params.id
    console.log(qris)

    var reqHeader = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const body = { qris_value: qris };

    return this.http.post(`${this.api_url}/qris_cek`, body, {headers: reqHeader}).pipe(
      tap(res=>{
        if (res['api_status'] == 0) {
          this.auth.dismissLoader();
          this.auth.showAlertWithAction('Data Tidak Terdaftar', 'Kesahalahan');
        } else {
          this.isLoading = false;
          this.data_profile = res['data'];
          console.log(this.data_profile)
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
