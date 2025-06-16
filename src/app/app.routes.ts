import { Routes } from '@angular/router';
import { LayoutComponent } from './Domains/shared/components/layout/layout.component';

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
            }

        ]
    }
];
