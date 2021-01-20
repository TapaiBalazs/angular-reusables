import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * This is a service which implements a certain part of a translation library, based on transloco
 */
export class TranslateService {

  private currentLanguage = new BehaviorSubject<string>('hu');
  readonly langChanges$ = this.currentLanguage.asObservable();

  setLanguage(lang: string): void {
    this.currentLanguage.next(lang);
  }


}
