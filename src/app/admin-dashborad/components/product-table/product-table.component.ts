import { Product } from '@/products/interfaces/products.interface';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'product-table',
  imports: [],
  templateUrl: './product-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {

  products = input.required<Product[]>();

}
