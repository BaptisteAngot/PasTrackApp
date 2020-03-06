import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: 'hearth*', pathMatch: 'full'},
    {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapPageModule)
    },
    {
        path: 'person',
        loadChildren: () => import('./person/person.module').then(m => m.PersonPageModule)
    },
    {
        path: 'heart',
        loadChildren: () => import('./heart/heart.module').then(m => m.HeartPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
      path: 'modal',
      loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
    },
  {
    path: 'parameters',
    loadChildren: () => import('./parameters/parameters.module').then( m => m.ParametersPageModule)
  }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
