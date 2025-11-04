import { Routes } from '@angular/router';
import { LayoutComponent } from './Domains/shared/components/layout/layout.component';
import { AuthGuard } from './Domains/shared/guards/auth.guard';



export const routes: Routes = [
    {


        path: '',
        component: LayoutComponent,

        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./Domains/principal/principal.component')
                        .then(m => m.PrincipalComponent)
            },
            {
                path: 'log',
                loadComponent: () =>
                    import('./Domains/shared/components/auth/auth.component')
                        .then(m => m.AuthComponent),

            },
            {
                path: 'perfil',
                loadComponent: () => import('./Domains/shared/components/header/perfil/perfil.component')
                .then(m => m.PerfilComponent),
            },
            {
                path: 'list',
                loadComponent: () =>
                    import('./Domains/shared/components/pages/Product/list/list.component')
                        .then(m => m.ListComponent),
                        //canActivate: [AuthGuard]
            },
            {
                path: 'add',
                loadComponent: () =>
                    import('./Domains/shared/components/pages/Product/product-form/product-form.component')
                        .then(m => m.ProductFormComponent),
            },
            {
                path: 'update/:id_producto',
                loadComponent: () =>
                    import('./Domains/shared/components/pages/Product/product-form/product-form.component')
                        .then(m => m.ProductFormComponent),
            }

        ],

    }
];

