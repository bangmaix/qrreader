import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-pelanggaran',
  templateUrl: './list-pelanggaran.page.html',
  styleUrls: ['./list-pelanggaran.page.scss'],
})
export class ListPelanggaranPage implements OnInit {

  list_pelanggaran;
  token_barier;
  api_url = environment.api_url;
  barierToken;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private auth: AuthService) { }

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

  getListPelanggaran(token){
    
    const id = this.route.snapshot.params.id;

    var reqHeader = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    var reqParams = new HttpParams().set('id_pendaftar', id)

    var option = {
      headers: reqHeader,
      params: reqParams
    }

    return this.http.get(`${this.api_url}/data_pelanggaran`, option).pipe(
      tap(res=>{
        if(res['api_status'] == 0){
          this.auth.dismissLoader();
          this.auth.showAlert('Data Tidak Ditemukan', 'Kesalahan')
        }else {
          this.auth.dismissLoader();
          this.list_pelanggaran = res['data'];
        }
      }),
      catchError(e => {
        this.auth.dismissLoader();
        this.auth.showAlertWithAction('Terjadi Kesalahan pada server, ulangi proses kembali', 'Kesalahan')
        throw new Error(e);
      })

    )


  }

}
