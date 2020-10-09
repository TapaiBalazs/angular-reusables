import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ReadRightOnlyComponent} from './read-right-only/read-right-only.component';
import {LocationChangeEvent, LocationStrategy} from '@angular/common';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlockBackNavigationService implements CanDeactivate<any> {
  navigationPressed = false;

  constructor(private location: LocationStrategy) {
    this.location.onPopState((event: LocationChangeEvent) => {
      if (event && (<any>event).oldURL) {
        console.log(event);
        // Prevents every navigation except when the target URL contains 'loading-indicator'
        // this prevents Back button navigation as well.
        this.navigationPressed = (<any>event).oldURL.includes('read-only') &&  (<any>event).newURL.includes('loading-indicator');
      } else {
        console.log('event is undefined');
        this.navigationPressed = true
      }
      console.log(this.navigationPressed);
    });
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component instanceof ReadRightOnlyComponent) {
      console.log('returns a check, navigation came from ReadRightOnlyComponent')
      if (this.navigationPressed) {
        history.pushState(null, null, location.href);
      }
      return !this.navigationPressed;
    }
    console.log('returns true because not ReadRightOnlyComponent')
    return true;
  }
}
