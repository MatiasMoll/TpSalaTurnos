import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  {path:'',redirectTo:'ingreso/login',pathMatch:'full'},
  {path: 'home',component: HomeComponent},
  /*{path: 'chat',component:CompleteChatComponent},
  {path: 'registro',component: RegistroComponent},
  {path: 'quien-soy',component: QuienSoyComponent},*/
  { path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule) },
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
