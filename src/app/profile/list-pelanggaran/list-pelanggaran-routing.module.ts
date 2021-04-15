import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPelanggaranPage } from './list-pelanggaran.page';

const routes: Routes = [
  {
    path: '',
    component: ListPelanggaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPelanggaranPageRoutingModule {}
