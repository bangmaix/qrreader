import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'pelanggaran/:id',
    loadChildren: () => import('./pelanggaran/pelanggaran.module').then( m => m.PelanggaranPageModule)
  },
  {
    path: 'list-pelanggaran/:id',
    loadChildren: () => import('./list-pelanggaran/list-pelanggaran.module').then( m => m.ListPelanggaranPageModule)
  },
  {
    path: 'detail-profile/:id',
    loadChildren: () => import('./detail-profile/detail-profile.module').then( m => m.DetailProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
