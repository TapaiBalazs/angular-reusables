import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipesDisplayComponent} from './safe-pipes-display/safe-pipes-display.component';
import {SafePipesShowcaseRoutingModule} from './safe-pipes-showcase-routing.module';
import {SafePipesModule} from '@btapai/ng-safe-pipes';


@NgModule({
  declarations: [SafePipesDisplayComponent],
  imports: [
    CommonModule,
    SafePipesShowcaseRoutingModule,
    SafePipesModule
  ]
})
export class SafePipesShowcaseModule {
}
