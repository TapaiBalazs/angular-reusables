import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisationShowcaseComponent } from './authorisation-showcase/authorisation-showcase.component';
import { ReadRightOnlyComponent } from './read-right-only/read-right-only.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisationShowcaseComponent,
    children: [
      {
        path: 'read-only',
        component: ReadRightOnlyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorisationDirectiveShowcaseRoutingModule {}
