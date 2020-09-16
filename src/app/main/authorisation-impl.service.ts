import {Inject, Injectable} from '@angular/core';
import {AuthorisationInterface} from '@btapai/ng-authorisation';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationImplService implements AuthorisationInterface {

  private userSubject = new BehaviorSubject(null);
  private roles = new Set();

  constructor(@Inject('ROLES') roles: string[]) {
    this.setRoles(roles);
  }

  onUserChange$: Observable<any> = this.userSubject.asObservable();

  hasReadAccess(role: string): boolean {
    return this.roles.has(`${role}_READ`);
  }

  hasWriteAccess(role: string): boolean {
    return this.roles.has(`${role}_WRITE`);
  }

  setRoles(roles: string[]): void {
    this.roles = new Set(roles);
    this.userSubject.next({ id: Math.floor(Math.random() * 5000)});
  }
}
