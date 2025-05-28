import { Component, inject } from '@angular/core';
import { ProductService } from '@/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, PaginationComponent],
})
export class HomePageComponent {
  productService = inject(ProductService);

  paginatioService =inject(PaginationService);

  productsResource = rxResource({
    request: ()=> ({page: this.paginatioService.currentPage()-1}),
    loader: ({request}) =>{
      return  this.productService.getProduct({
        offset: request.page * 9,

      });

    }
  });



}
