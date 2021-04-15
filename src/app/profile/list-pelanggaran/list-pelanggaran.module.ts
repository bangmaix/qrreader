import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPelanggaranPageRoutingModule } from './list-pelanggaran-routing.module';

import { ListPelanggaranPage } from './list-pelanggaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPelanggaranPageRoutingModule
  ],
  declarations: [ListPelanggaranPage]
})
export class ListPelanggaranPageModule {}
