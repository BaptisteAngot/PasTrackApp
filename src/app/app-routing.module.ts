import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
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
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
    path: 'disconnected',
    loadChildren: () => import('./disconnected/disconnected.module').then( m => m.DisconnectedPageModule)
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
