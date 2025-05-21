import { Component, inject } from '@angular/core';
import { ProductService } from '@/products/services/products.service';
  import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from '../product-page/product-page.component';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, PaginationComponent],
})
export class HomePageComponent {
  productService = inject(ProductService);

  productsResource = rxResource({
    request: ()=> ({}),
    loader: (request) =>{
      return  this.productService.getProduct({

      });

    }
  });
}
