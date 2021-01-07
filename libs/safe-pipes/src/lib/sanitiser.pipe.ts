import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';

type SecurityContextType = 'NONE' | 'HTML' | 'STYLE' | 'SCRIPT' | 'URL' | 'RESOURCE_URL';

@Pipe({
  name: 'sanitiser',
  pure: true
})
export class SanitiserPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(value: string, securityContext: SecurityContextType): SafeValue {
    return this.domSanitizer.sanitize(SecurityContext[securityContext], value)
  }
}
