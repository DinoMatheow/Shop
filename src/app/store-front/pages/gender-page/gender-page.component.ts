import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductService } from '@/products/services/products.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent {

  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  gender = toSignal(this.route.params.pipe(
      map(({gender})=> gender
    ))
  );




  productsResource = rxResource({
    request: ()=> ({gender: this.gender()}),
    loader: ({request}) =>{
      return  this.productService.getProduct({
          gender: request.gender
      });

    }
  });

}
