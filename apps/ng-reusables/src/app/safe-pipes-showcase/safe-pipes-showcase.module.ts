import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipesDisplayComponent} from './components/safe-pipes-display/safe-pipes-display.component';
import {SafePipesShowcaseRoutingModule} from './safe-pipes-showcase-routing.module';
import {SafePipesModule} from '@btapai/ng-safe-pipes';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';


@NgModule({
  declarations: [SafePipesDisplayComponent, LanguageSelectorComponent],
  imports: [
    CommonModule,
    SafePipesShowcaseRoutingModule,
    SafePipesModule
  ]
})
export class SafePipesShowcaseModule {
}
