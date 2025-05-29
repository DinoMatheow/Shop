import { Product } from '@/products/interfaces/products.interface';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductCaruselComponent } from "../../../../products/components/product-carusel/product-carusel.component";

@Component({
  selector: 'product-details',
  imports: [ProductCaruselComponent],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {

  product = input.required<Product>();

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

}
