import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {
    path: 'showcase',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './loading-indicator-showcase/loading-indicator-showcase.module#LoadingIndicatorShowcaseModule'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'showcase/loading-indicator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
