import { Component, Inject, OnInit } from '@angular/core';
import { AUTHORISATION_HANDLER } from '@nx-reusables/authorisation';
import { AuthorisationImplService } from '../../main/authorisation-impl.service';

@Component({
  selector: 'app-read-right-only',
  templateUrl: './read-right-only.component.html',
  styleUrls: ['./read-right-only.component.css'],
  providers: [
    {
      provide: 'ROLES',
      useValue: ['BIG_RED_BUTTON_READ']
    },
    {
      provide: AUTHORISATION_HANDLER,
      useClass: AuthorisationImplService
    }
  ]
})
export class ReadRightOnlyComponent implements OnInit {
  constructor(private auth: AuthorisationImplService, @Inject('ROLES') roles: string[]) {
    this.auth.setRoles(roles);
  }

  ngOnInit(): void {
  }
}
