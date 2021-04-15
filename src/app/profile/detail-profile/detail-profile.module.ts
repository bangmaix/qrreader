import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProfilePageRoutingModule } from './detail-profile-routing.module';

import { DetailProfilePage } from './detail-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProfilePageRoutingModule
  ],
  declarations: [DetailProfilePage]
})
export class DetailProfilePageModule {}
