import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';

@Component({
  selector: 'app-error-handler-showcase',
  templateUrl: './error-handler-showcase.component.html',
  styleUrls: ['./error-handler-showcase.component.css'],
})
export class ErrorHandlerShowcaseComponent {
  constructor(private http: HttpClient) {}

  @startLoadingIndicator()
  trigger404Error() {
    this.http.get(this.getUrl()).subscribe(this.handleResult.bind(this));
  }

  triggerRuntimeError() {
    throw new Error('this is a runtime error');
  }

  getUrl(): string {
    return 'wrong/url';
  }

  @stopLoadingIndicator()
  handleResult(result): void {
    console.log(result);
  }
}
