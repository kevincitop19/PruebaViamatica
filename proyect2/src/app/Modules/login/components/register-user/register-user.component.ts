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
import { UserCreate } from '../../interfaces/user';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private _userService : UserService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required]],
     
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      let userData : UserCreate = this.registerForm.value;
      userData.carts = [];
      console.log(userData)
      this._userService.registerUser(userData).subscribe({

        next:response => {
          console.log('User registered successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'El usuario ha sido registrado exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['']);
        },
        error :error => {
          console.error('Error registering user', error);
        }
      
      });
        
 
      
    }

  }
  
}
