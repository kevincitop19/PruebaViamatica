import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../../shared/components/toolbar/toolbar.component";
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../interfaces/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/producto';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ToolbarComponent,ProductsComponent, CommonModule, MatToolbarModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit {
   catergoriaSelect: string = '';
  productList: Product[]= [];
  options: Category[] =[];
  constructor(private categoryService: CategoriasService) { }

  ngOnInit(): void {
    this.categoryService.getListCategorias().subscribe({
      next: (data: Category[]) => {
        this.options = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
      complete: () => {
        console.log('Category fetching completed');
      }
    });
  }

  onSelectionChange(event: MatSelectChange): void {
  
    this.categoryService.getByType(event.value).subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      },
      complete: () => {
        console.log('La solicitud ha sido completada.');
      }
    });
    // Aquí puedes manejar el valor seleccionado según tus necesidades
  }

 
}
