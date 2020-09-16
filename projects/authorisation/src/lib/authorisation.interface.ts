import {Observable} from 'rxjs';


export interface AuthorisationInterface {
  onUserChange$: Observable<any>;
  hasReadAccess(role: string): boolean;
  hasWriteAccess(role: string): boolean;
}
