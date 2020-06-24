import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, Subject} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {catchError, map, shareReplay, switchMap} from 'rxjs/operators';

@Pipe({
  name: 'imagePlaceholder'
})
export class ImagePlaceholderPipe implements PipeTransform {

  private loadingImage$ = this.http.get('/assets/undraw_loading.svg', {responseType: 'blob'})
    .pipe(shareReplay());
  private notFoundImage$ = this.http.get('/assets/undraw_404.svg', {responseType: 'blob'})
    .pipe(shareReplay());

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  transform(url: string, loadingUrl?: string): Observable<SafeUrl> {
    return merge(this.loadingImage$, this.http.get(url, {responseType: 'blob'}))
      .pipe(
        catchError(error => this.notFoundImage$),
        switchMap(blob => {
          return this.generateDataUrl(blob as Blob);
        }),
        map(base64 => this.sanitizer.bypassSecurityTrustUrl(base64))
      );
  }

  private generateDataUrl(blob: Blob): Observable<string> {
    const subject = new Subject<string>();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      subject.next(reader.result as string);
      subject.complete();
    };

    reader.onerror = (e) => {
      subject.error(e);
    };

    return subject.asObservable();
  }

}
