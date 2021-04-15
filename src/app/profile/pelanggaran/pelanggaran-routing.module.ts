import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PelanggaranPage } from './pelanggaran.page';

const routes: Routes = [
  {
    path: '',
    component: PelanggaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PelanggaranPageRoutingModule {}
