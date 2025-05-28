import { ProductTableComponent } from '@/admin-dashborad/components/product-table/product-table.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-produtcs-admin-page',
  imports: [ProductTableComponent],
  templateUrl: './produtcs-admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutcsAdminPageComponent { }
