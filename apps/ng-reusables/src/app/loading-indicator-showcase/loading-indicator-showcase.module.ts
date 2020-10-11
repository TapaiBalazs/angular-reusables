import { NgModule } from '@angular/core';
import { LoadingIndicatorShowcaseRoutingModule } from './loading-indicator-showcase.routing.module';
import { LoadingIndicatorShowcaseComponent } from './loading-indicator-showcase.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [LoadingIndicatorShowcaseRoutingModule, CommonModule],
  declarations: [LoadingIndicatorShowcaseComponent],
})
export class LoadingIndicatorShowcaseModule {}
