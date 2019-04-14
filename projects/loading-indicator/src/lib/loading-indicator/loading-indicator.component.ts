import {Component, ComponentFactoryResolver, ComponentRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {LOADING_INDICATOR_CONFIG} from '../loading-indicator.config';
import {LoadingIndicatorConfig} from '../interfaces/loading-indicator.interfaces';
import {IndicatorHostDirective} from '../directives/indicator-host.directive';
import {SpinnerComponent} from '../spinner/spinner.component';

@Component({
  selector: 'btp-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  @ViewChild(IndicatorHostDirective)
  host: IndicatorHostDirective;

  constructor(@Inject(LOADING_INDICATOR_CONFIG)
              private config: LoadingIndicatorConfig,
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
    const component = this.config.indicatorComponent || SpinnerComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();
    const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.color = this.config.color;
    componentRef.instance.size = this.config.size;
  }
}
