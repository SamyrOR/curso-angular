import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAut: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'usuario@email.com' && usuario.senha === '123456') {
      this.usuarioAut = true;
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/']);
    } else {
      this.mostrarMenuEmitter.emit(false);
      this.usuarioAut = false;
    }
  }

  usuarioEstaAutenticado(): boolean {
    console.log('pçá');
    return this.usuarioAut;
  }
}
