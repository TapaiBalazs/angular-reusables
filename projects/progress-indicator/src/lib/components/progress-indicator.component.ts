import {Component, ComponentFactoryResolver, ComponentRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IndicatorHostDirective} from '../directives/indicator-host.directive';
import {PROGRESS_INDICATOR_CONFIG} from '../progress-indicator.config';
import {ProgressIndicatorConfig} from '../interfaces/progress-indicator.interfaces';

@Component({
  selector: 'btp-progress-indicator',
  template: `
    <btp-overlay>
      <div class="btp-progress-indicator__container">
        <ng-template btpIndicatorHost></ng-template>
      </div>
    </btp-overlay>
  `,
  styles: [`
    .btp-progress-indicator__container {
      pointer-events: none;
      position: relative;
      z-index: 10000;
    }`]
})
export class ProgressIndicatorComponent implements OnInit, OnDestroy {
  @ViewChild(IndicatorHostDirective)
  host: IndicatorHostDirective;

  constructor(@Inject(PROGRESS_INDICATOR_CONFIG)
              private config: ProgressIndicatorConfig,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  get indicatorSize(): string {
    return `${this.config.size}px`;
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    this.host.viewContainerRef.clear();
  }

  private loadComponent() {
    const component = null;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component as any);
    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();
    const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.color = 'pink';
    componentRef.instance.size = '200px';
  }
}
