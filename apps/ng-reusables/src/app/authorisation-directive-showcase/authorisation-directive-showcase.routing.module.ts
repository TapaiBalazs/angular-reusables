import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisationShowcaseComponent } from './authorisation-showcase/authorisation-showcase.component';
import { ReadRightOnlyComponent } from './read-right-only/read-right-only.component';
import { ReadWriteRightComponent } from './read-right-only/read-write-right.component';
import { NoRightsComponent } from './read-right-only/no-rights.component';
import {BlockBackNavigationService} from './block-back-navigation.service';

const routes: Routes = [
  {
    path: '',
    component: AuthorisationShowcaseComponent,
    children: [
      {
        path: 'read-only',
        component: ReadRightOnlyComponent,
        canDeactivate: [BlockBackNavigationService]
      },
      {
        path: 'read-write',
        component: ReadWriteRightComponent,
        canDeactivate: [BlockBackNavigationService]
      },
      {
        path: 'no-access',
        component: NoRightsComponent,
        canDeactivate: [BlockBackNavigationService]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorisationDirectiveShowcaseRoutingModule {}
