import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {distinctUntilChanged, pluck, switchMap, tap} from 'rxjs/operators';
import {TranslateService} from '../services/translate.service';
import {StaticProvider} from '@angular/core';

export function createHtmlTextProvider(url: string): StaticProvider {
  const getURL = (lang: string) => url.replace('$lang$', lang)
  return {
    provide: url,
    deps: [HttpClient, TranslateService],
    useFactory: (http: HttpClient, translateService: TranslateService) => {
      const CACHE = new Map();
      return translateService
        .langChanges$
        .pipe(
          distinctUntilChanged(),
          switchMapToHtml(CACHE, http, getURL)
        );
    }
  }
}

function getText(http: HttpClient, url): Observable<string> {
  return http.get(url, {observe: 'response', responseType: 'text'})
    .pipe(pluck('body'));
}

function switchMapToHtml(
  CACHE: Map<string, string>,
  http: HttpClient,
  getURL: (lang: string) => string): (s$: Observable<string>) => Observable<string> {
  return s$ => s$.pipe(
    switchMap((lang: string) => {
        const cached = CACHE.get(lang);
        if (cached) {
          return of(cached);
        }
        return getText(http, getURL(lang)).pipe(
          tap((content: string) => CACHE.set(lang, content))
        );
      }
    ),
  );
}
