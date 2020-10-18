import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchPollingRoutingModule} from './search-polling-routing.module';
import {SearchPollingComponent} from './search-polling/search-polling.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SearchPollingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchPollingRoutingModule
  ]
})
export class SearchPollingModule {
}
