import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageTricksShowcaseComponent} from './image-tricks-showcase.component';
import {ImageTricksShowcaseRoutingModule} from './image-tricks-showcase.routing.module';
import { ImagePlaceholderPipe } from './pipes/image-placeholder.pipe';


@NgModule({
  declarations: [ImageTricksShowcaseComponent, ImagePlaceholderPipe],
  imports: [
    CommonModule,
    ImageTricksShowcaseRoutingModule
  ]
})
export class ImageTricksShowcaseModule {
}
