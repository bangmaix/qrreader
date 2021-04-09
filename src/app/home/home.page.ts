import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  qrData = "test";
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';


  constructor(private barcodeScanner: BarcodeScanner,
              private base64ToGallery: Base64ToGallery,
              private toastCtrl: ToastController,
              private router: Router,
              private auth: AuthService) {}

  ngOnInit() {
    this.auth.getTokenBarier();
    // const token = this.auth.token
    
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text;

        this.directToProfile(this.scannedCode)
        // this.directToProfile(6)
      }
    );
  }

  directToProfile(qris){
    this.router.navigate(['profile', { qrisValue: qris }])
  }


}
