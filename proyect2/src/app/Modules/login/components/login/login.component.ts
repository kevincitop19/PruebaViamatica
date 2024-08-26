import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder,private router: Router, private loginService:UserService ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.loginService.login(username, password).subscribe({
        next: response => {
          // Manejo de respuesta exitosa
          console.log('Login successful', response);
          Swal.fire({
            title: 'Login Exitoso',
            text: 'Has iniciado sesión correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            this.loginService.idUser= response.UserId;
            this.router.navigate(['/ventas']);
          });
        },
        error: error => {
          // Manejo de error
          console.error('Login failed', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo iniciar sesión. Verifica tus credenciales.',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        },
        complete: () => {
          // Acción opcional cuando la suscripción se completa
          console.log('Login request completed');
        }
      });
    } else {
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }
  
  registrar(){
    this.router.navigate(['/register']);
  }
  // autores? : Autores[]=[];

  // constructor(private _autoresServices: AutorService){
  //   this.loadData();
  // }

  // loadData(){
  //   this._autoresServices.getAutores().subscribe({
  //     next: (response: Autores[]) => {
  //       this.autores = response;
  //       console.log('Autores obtenidos:', this.autores);
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener autores:', error);
  //     },
  //     complete: () => {
  //       console.log('Proceso completado');
  //     }
  //   });
  // }
}
