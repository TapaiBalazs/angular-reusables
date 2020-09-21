import { InjectionToken } from '@angular/core';
import { AuthorisationInterface } from './authorisation.interface';

export const AUTHORISATION_HANDLER = new InjectionToken<AuthorisationInterface>('AUTHORISATION_HANDLER');
export const AUTHORISATION_CLASS = new InjectionToken<string>('AUTHORISATION_CLASS');
