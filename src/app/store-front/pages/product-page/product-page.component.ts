import { Product } from '@/products/interfaces/products.interface';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCaruselComponent } from '@/products/components/product-carusel/product-carusel.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCaruselComponent],
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {


activateRoute = inject(ActivatedRoute);
productService = inject(ProductService);


productIdSlug: string = this.activateRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    request: ()=> ({idSlug: this.productIdSlug}),
    loader:({request})=> {
      return this.productService.getProductByIdSlug(request.idSlug)
    },
  })

}
