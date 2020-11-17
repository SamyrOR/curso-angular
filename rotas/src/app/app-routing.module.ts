import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursoGuard } from './guards/curso.guard';
import { AlunosGuard } from './guards/alunos.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos.module').then((mod) => mod.CursosModule),
    canActivate: [AuthGuard],
    canActivateChild: [CursoGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'alunos',
    loadChildren: () =>
      import('./alunos/alunos.module').then((m) => m.AlunosModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
