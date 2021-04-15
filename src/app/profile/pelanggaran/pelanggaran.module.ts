import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PelanggaranPageRoutingModule } from './pelanggaran-routing.module';

import { PelanggaranPage } from './pelanggaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PelanggaranPageRoutingModule
  ],
  declarations: [PelanggaranPage]
})
export class PelanggaranPageModule {}
