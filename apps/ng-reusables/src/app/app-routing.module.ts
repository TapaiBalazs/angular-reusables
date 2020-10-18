import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'loading-indicator',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./loading-indicator-showcase/loading-indicator-showcase.module').then((m) => m.LoadingIndicatorShowcaseModule),
      },
    ],
  },
  {
    path: 'error-handler',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./error-handler-showcase/error-handler-showcase.module').then((m) => m.ErrorHandlerShowcaseModule),
      },
    ],
  },
  {
    path: 'authorisation-handler',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./authorisation-directive-showcase/authorisation-directive-showcase.module').then((m) => m.AuthorisationDirectiveShowcaseModule),
      },
    ],
  },
  {
    path: 'search-polling',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./search-polling/search-polling.module').then((m) => m.SearchPollingModule),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'loading-indicator/spinner',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
