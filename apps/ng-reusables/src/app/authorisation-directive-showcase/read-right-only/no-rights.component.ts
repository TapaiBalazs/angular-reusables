import { Component } from '@angular/core';
import { AUTHORISATION_HANDLER } from '@nx-reusables/authorisation';
import { AuthorisationImplService } from '../../main/authorisation-impl.service';
import { ReadRightOnlyComponent } from './read-right-only.component';

@Component({
  selector: 'app-read-right-only',
  templateUrl: './access-rights.component.html',
  styleUrls: ['./access-rights.component.css'],
  providers: [
    {
      provide: 'ROLES',
      useValue: [],
    },
    {
      provide: AUTHORISATION_HANDLER,
      useClass: AuthorisationImplService,
    },
  ],
})
export class NoRightsComponent extends ReadRightOnlyComponent {}
