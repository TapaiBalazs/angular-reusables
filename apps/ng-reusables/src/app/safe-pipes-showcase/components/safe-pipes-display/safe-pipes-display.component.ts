import {Component, Inject, OnInit, StaticProvider} from '@angular/core';
import {TranslateService} from '../../services/translate.service';
import {HttpClient} from '@angular/common/http';
import {distinctUntilChanged, pluck, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {createHtmlTextProvider} from '../../utils/html-injector.util';

const LEGAL_TEXT_URL = '/assets/legal/$lang$/legal_text.html';

@Component({
  selector: 'btp-safe-pipes-display',
  templateUrl: './safe-pipes-display.component.html',
  styleUrls: ['./safe-pipes-display.component.css'],
  providers: [
    createHtmlTextProvider(LEGAL_TEXT_URL)
  ]
})
export class SafePipesDisplayComponent {

  constructor(@Inject(LEGAL_TEXT_URL) public readonly injection$: Observable<string>) {
  }
}
