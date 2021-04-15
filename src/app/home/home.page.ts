import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  scannedCode = null;


  constructor(private barcodeScanner: BarcodeScanner,
              private base64ToGallery: Base64ToGallery,
              private toastCtrl: ToastController,
              private router: Router,
              private auth: AuthService, ) {}

  ngOnInit() {
  }

  scanCode() {

    this.directToProfile('00020101021126660020ID.CO.BANKNAGARI.WWW011893600118110406001802091040600180303UMI51440014ID.CO.QRIS.WWW0215ID10210677478110303UMI5204763153033605802ID5911DINA ARLOJI6011BUKITTINGGI61052612462070703A0163044391')
   
    const options = {
      prompt: 'Tempatkan QrCode di dalam kotak untuk melakukan scan dengan tepat'
    }

    this.barcodeScanner.scan(options).then(
      barcodeData => {
        this.scannedCode = barcodeData.text;
        this.directToProfile(this.scannedCode);
      }
    );

  }

  directToProfile(qris){
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(qris)
      }
    }
    this.router.navigate(['profile'], navigationExtras);
 
  }


}
