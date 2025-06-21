import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  
  {
    path: 'panqueca',
    loadComponent: () => import('./panqueca/panqueca.page').then( m => m.PanquecaPage)
  },
  {
    path: 'panqueca-nutella',
    loadComponent: () => import('./panqueca-nutella/panqueca-nutella.page').then( m => m.PanquecaNutellaPage)
  },
  {
    path: 'especial1',
    loadComponent: () => import('./especial1/especial1.page').then( m => m.Especial1Page)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'feed',
    loadComponent: () => import('./feed/feed.page').then( m => m.FeedPage)
  }
];
