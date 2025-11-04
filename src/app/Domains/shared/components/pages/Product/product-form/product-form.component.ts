import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../models/category';
import { CategoriesService } from '../../../../services/categories.service';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})

export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  modoEdicion = false;
  titulo = 'Nuevo Producto';
  textoBoton = 'Agregar';
  idProducto?: String | null = null;
  categories = signal<Category[]>([]);
  private CategoriesService = inject(CategoriesService);
  campoActivo: string | null = null;

  camposBloqueados = {
  id: true,
  nombre: true,
  categoria: true,
  imagen: true
};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getCategories();
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['', Validators.required],
    });

    // Detectar si estamos editando
    this.idProducto = this.route.snapshot.paramMap.get('id_producto');
    if (this.idProducto) {
      this.modoEdicion = true;
      this.titulo = 'Editar producto';
      this.textoBoton = 'Modificar';

      // Cargar los datos del producto
      this.productService.getById(this.idProducto).subscribe(producto => {
        this.form.patchValue({
          //Los siguientes atributos están definidos en el ngOnInit y en el html en el formcontrolname
          id: producto.id_producto,
          nombre: producto.nombre,
          categoria: producto.categoria,
          imagen: producto.imagen
        });
      });
    }

  }

  private getCategories() {
    this.CategoriesService.getAll()
      .subscribe({
        next: (data) => {
          this.categories.set(data);
        },
        error: () => {

        }
      })
  }



  onSubmit() {
    if (this.form.invalid) return;

    this.form.disable(); // 🔒 deshabilita todos los campos al guardar

    const data = this.form.getRawValue(); // obtiene los valores aunque estén deshabilitados

    if (this.modoEdicion && this.idProducto) {
      this.productService.update(this.idProducto, data).subscribe({
        next: () => {
          alert('Producto modificado correctamente');
          this.router.navigate(['/list']);
        },
        error: err => {
          console.error('Error al modificar producto:', err);
        }
      });
    }
  }

  compararCategorias(cat1: any, cat2: any): boolean {
    return cat1 && cat2 ? cat1.idCategoria === cat2.idCategoria : cat1 === cat2;
  }

  activarCampo(campo: string) {
    // Si hay otro campo activo, lo deshabilita
    if (this.campoActivo && this.campoActivo !== campo) {
      this.form.get(this.campoActivo)?.disable();
    }

    // Si el mismo campo se hace doble clic otra vez, no pasa nada
    if (this.campoActivo === campo) return;

    // Habilita el campo clicado
    this.form.get(campo)?.enable();
    this.campoActivo = campo;
  }

  


}
