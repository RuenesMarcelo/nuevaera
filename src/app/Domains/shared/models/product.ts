import { Category } from './category';
export interface Product{
    id_producto: String;
    nombre: String;
    precio: DoubleRange;
    stock: number;
    Categoria: Category
}