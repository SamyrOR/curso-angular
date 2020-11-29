import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cidade } from '../models/cidade';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' },
    ];
  }

  getTecs() {
    return [
      { nome: 'html', desc: 'HTML5' },
      { nome: 'css', desc: 'CSS3' },
      { nome: 'js', desc: 'JavaScript' },
      { nome: 'ts', desc: 'TypeScript' },
      { nome: 'angular', desc: 'Angular' },
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' },
    ];
  }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json').pipe(
      map((cidades: Cidade[]) => {
        cidades.filter((c: Cidade) => c.estado === idEstado);
      })
    );
  }
}
