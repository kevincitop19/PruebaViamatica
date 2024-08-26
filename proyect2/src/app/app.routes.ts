import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Modules/login/components/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./Modules/login/components/register-user/register-user.component').then(m => m.RegisterUserComponent),
      },
      {
        path:'ventas',
        loadComponent: ()=> import('./Modules/ventas/components/main/main.component').then(m => m.MainComponent)
      },
      {
        path:'carrito',
        loadComponent: ()=> import('./Modules/ventas/components/carrito/carrito.component').then(m => m.CarritoComponent)
      },
      {
        path:'factura',
        loadComponent: ()=> import('./Modules/ventas/components/facturas/facturas.component').then(m => m.FacturasComponent)
      }
];
