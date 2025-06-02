import { Routes } from '@angular/router';
import { LayoutComponent } from './Domains/shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,

        children: [
            {
                path:'',
                loadComponent: () => import('./Domains/principal/principal.component').then(m => m.PrincipalComponent)
            }

        ]
    }
];
