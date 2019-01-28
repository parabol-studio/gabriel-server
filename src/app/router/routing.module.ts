// Import Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import custom components
import { AuthComponent } from '../components/auth/auth.component';
import { ReportsComponent } from '../components/reports/reports.component';

// Import resolvers
import { AuthResolver } from '../resolvers/auth.resolver';

// Define routes
const routes: Routes = [
  { path: '', redirectTo: '/gabriel/view', pathMatch: 'full' },
  {
    path: 'gabriel', children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      },
      {
        path: 'view',
        component: ReportsComponent,
        resolve: { auth: AuthResolver }
      },
      {
        path: 'auth',
        component: AuthComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
