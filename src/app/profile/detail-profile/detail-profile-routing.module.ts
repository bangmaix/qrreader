import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProfilePage } from './detail-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProfilePageRoutingModule {}
