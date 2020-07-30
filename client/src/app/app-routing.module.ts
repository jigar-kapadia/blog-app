import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogModule } from './blog/blog.module';
import { AccountModule} from './account/account.module';

const routes: Routes = [
  { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
  //{ path: 'blog', loadChildren: () => import('./blog/blog.module').then(module => module.BlogModule) },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  // { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  { path: '', redirectTo : 'blog', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
