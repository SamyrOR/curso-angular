import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = `${environment.API}/cursos`;
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Curso[]>(this.API).pipe(delay(2000));
  }

  loadByID(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso: Curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }
}
