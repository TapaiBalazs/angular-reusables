import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisationShowcaseComponent } from './authorisation-showcase/authorisation-showcase.component';
import { ReadRightOnlyComponent } from './read-right-only/read-right-only.component';
import { ReadWriteRightComponent } from './read-right-only/read-write-right.component';
import { NoRightsComponent } from './read-right-only/no-rights.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisationShowcaseComponent,
    children: [
      {
        path: 'read-only',
        component: ReadRightOnlyComponent,
      },
      {
        path: 'read-write',
        component: ReadWriteRightComponent,
      },
      {
        path: 'no-access',
        component: NoRightsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorisationDirectiveShowcaseRoutingModule {}
