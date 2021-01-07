import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitiserPipe } from './sanitiser.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SanitiserPipe],
  exports: [SanitiserPipe],
})
export class SafePipesModule {}
