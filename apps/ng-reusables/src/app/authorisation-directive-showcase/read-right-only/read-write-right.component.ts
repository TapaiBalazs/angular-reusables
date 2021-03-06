import { Component, Inject, OnInit } from '@angular/core';
import { AUTHORISATION_HANDLER } from '@btapai/ng-authorisation';
import { AuthorisationImplService } from '../../main/authorisation-impl.service';
import { FormControl } from '@angular/forms';
import { ReadRightOnlyComponent } from './read-right-only.component';

@Component({
  selector: 'app-read-right-only',
  templateUrl: './access-rights.component.html',
  styleUrls: ['./access-rights.component.css'],
  providers: [
    {
      provide: 'ROLES',
      useValue: ['BIG_RED_BUTTON_READ', 'BIG_RED_BUTTON_WRITE', 'LAUNCH_CODE_INPUTS_READ', 'LAUNCH_CODE_INPUTS_WRITE'],
    },
    {
      provide: AUTHORISATION_HANDLER,
      useClass: AuthorisationImplService,
    },
  ],
})
export class ReadWriteRightComponent extends ReadRightOnlyComponent {}
