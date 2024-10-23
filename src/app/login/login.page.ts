import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  submitted: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ingresar() {
    this.submitted = true;

    if (this.username && this.password) {
      this.usuarioService.login(this.username, this.password).subscribe(response => {
        if (response.success) {
          // Almacenar el usuario completo en localStorage
          localStorage.setItem('currentUser', JSON.stringify({ conductorId: response.user.id, ...response.user }));
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      }, error => {
        alert('Error al iniciar sesión');
        console.error(error);
      });
    } else {
      alert('Por favor, ingresa tanto el nombre de usuario como la contraseña');
    }
  }

  restablecerContrasena() {
    this.router.navigate(['/reset-password']);
  }
}
