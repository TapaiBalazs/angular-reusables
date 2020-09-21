import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[btpIndicatorHost]',
})
export class IndicatorHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
