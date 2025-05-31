import { ProductTableComponent } from '@/admin-dashborad/components/product-table/product-table.component';
import { ProductService } from '@/products/services/products.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produtcs-admin-page',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
  templateUrl: './produtcs-admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutcsAdminPageComponent {

  productService = inject(ProductService);
  paginatioService =inject(PaginationService);


  productsPerPage = signal(10);

  productsResource = rxResource({
    request: ()=> ({
      page: this.paginatioService.currentPage()-1,
      limit: this.productsPerPage()

    }),
    loader: ({request}) =>{
      return  this.productService.getProduct({
        offset: request.page * 9,
        limit: request.limit,
      });

    }
  });



}
