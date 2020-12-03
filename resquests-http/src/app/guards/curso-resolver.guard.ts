import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CursosService } from '../cursos/cursos.service';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private cursosService: CursosService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    if (route.params && route.params['id']) {
      return this.cursosService.loadByID(route.params['id']);
    }
    return {
      id: null,
      nome: null,
    };
  }
}
