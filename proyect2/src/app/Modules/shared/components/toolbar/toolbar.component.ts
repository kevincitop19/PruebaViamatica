import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../login/services/user.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from '../../../ventas/services/cart.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule

  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  username: string | null = null;

  constructor(public authService: UserService,
              private router: Router,
              public _ServiceCart: CartService) {}

  ngOnInit(): void {
    // Obtener el nombre del usuario al iniciar el componente
    this.username = this.authService.getUsername(); // Método para obtener el nombre del usuario
  }

  options = [
    { value: 'opcion1', viewValue: 'Opción 1' },
    { value: 'opcion2', viewValue: 'Opción 2' },
    { value: 'opcion3', viewValue: 'Opción 3' }
  ];

  // Método para manejar el cierre de sesión
  logout() {
    this.router.navigate(['']);
  }
  Carrito() {
    this.router.navigate(['/carrito']);
  }

  inicio(){
    this.router.navigate(['/ventas']);
  }
  verFacturas(){
    this.router.navigate(['/factura']);
  }
}
