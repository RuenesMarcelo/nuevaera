import { Routes } from '@angular/router';
import { LayoutComponent } from './Domains/shared/components/layout/layout.component';
import { AuthComponent } from './Domains/shared/components/auth/auth.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,

        children: [
            {
                path:'',
                loadComponent: () => import('./Domains/principal/principal.component').then(m => m.PrincipalComponent)
            },
            {
                path:'log',
                loadComponent: () => import('./Domains/shared/components/auth/auth.component').then (m => m.AuthComponent)
            },
            {
                path: 'list',
                loadComponent: () => import ('./Domains/shared/components/pages/Product/list/list.component').then (m => m.ListComponent)
            }

        ]
    }
];
