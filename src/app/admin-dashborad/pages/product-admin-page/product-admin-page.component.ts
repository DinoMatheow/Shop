import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import {  rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from '../../../products/services/products.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAdminPageComponent {
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  productID = toSignal(
    this.activedRoute.params.pipe(map((params)=> params['id']))
  )

  productsResource = rxResource({
    request: () => ({id:this.productID()}),
    loader: ({request}) => {
      return this.productService.getProductById(request.id)
    }
  });

  redirectEffect = effect(()=> {
    if(this.productsResource.error()){
      this.router.navigate(['/admin/products']);
    }
  })

}
