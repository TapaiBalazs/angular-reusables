import { Component, Inject, OnInit } from '@angular/core';
import { AUTHORISATION_HANDLER } from '@btapai/ng-authorisation';
import { AuthorisationImplService } from '../../main/authorisation-impl.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-read-right-only',
  templateUrl: './access-rights.component.html',
  styleUrls: ['./access-rights.component.css'],
  providers: [
    {
      provide: 'ROLES',
      useValue: ['BIG_RED_BUTTON_READ', 'LAUNCH_CODE_INPUTS_READ'],
    },
    {
      provide: AUTHORISATION_HANDLER,
      useClass: AuthorisationImplService,
    },
  ],
})
export class ReadRightOnlyComponent implements OnInit {
  formControl = new FormControl('test');

  launchCodesForm = this.formBuilder.group({
    firstOfficerAccessCode: ['testInput1'],
    secondOfficerAccessCode: ['testInput2'],
  });

  constructor(private auth: AuthorisationImplService, @Inject('ROLES') roles: string[], private formBuilder: FormBuilder) {
    this.auth.setRoles(roles);
  }

  ngOnInit(): void {}
}
