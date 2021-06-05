import { NgModule } from '@angular/core';
import { LoadingIndicatorShowcaseRoutingModule } from './loading-indicator-showcase.routing.module';
import { LoadingIndicatorShowcaseComponent } from './loading-indicator-showcase.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, LoadingIndicatorShowcaseRoutingModule, ReactiveFormsModule, ],
  declarations: [LoadingIndicatorShowcaseComponent],
})
export class LoadingIndicatorShowcaseModule {}
