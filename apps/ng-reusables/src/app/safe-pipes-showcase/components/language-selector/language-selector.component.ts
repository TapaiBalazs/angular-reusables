import {Component} from '@angular/core';
import {TranslateService} from '../../services/translate.service';

@Component({
  selector: 'btp-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {

  currentLang$ = this.translateService.langChanges$;

  constructor(private translateService: TranslateService) {
  }

  set language(lang: string) {
    this.translateService.setLanguage(lang);
  }


}
