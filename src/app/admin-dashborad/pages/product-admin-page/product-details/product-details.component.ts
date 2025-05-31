import { Product } from '@/products/interfaces/products.interface';
import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductCaruselComponent } from "../../../../products/components/product-carusel/product-carusel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@/utils/form-utils';
import { FormErrorLabelComponent } from '@/shared/form-error-label/form-error-label.component';
import { ProductService } from '@/products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCaruselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  product = input.required<Product>();
  productService = inject(ProductService);
  router = inject(Router);

  waSaved = signal(false);

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];


  fb = inject(FormBuilder);


  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [ 0, [Validators.required, Validators.min(0)]],
    stock: [ 0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],

  });

  async onSubmit(){
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if(!isValid) return;

    const formValue = this.productForm.value;
    const productLike: Partial<Product>={
      ...(formValue as any),
      tags:formValue.tags?.toLocaleLowerCase().split(',').map(tag => tag.trim() ?? [])
    };

    if(this.product().id == 'new'){
    const product = await firstValueFrom(
      this.productService.createProduct(productLike)
    );

        // this.router.navigate(['/admin/products', product.id])
        this.waSaved.set(true);
        setTimeout(() => {
          this.waSaved.set(false);
          this.router.navigate(['/admin/products', product.id]);
        }, 3000);
        return;




    }else {
      await firstValueFrom(
        this.productService.updateProduct( this.product().id,productLike)
      );
    }

//     this.waSaved.set(true);
//     setTimeout(()=>{
// this.waSaved.set(false)
//     }, 3000);


    };

  ngOnInit(): void {
    this.setFormValue(this.product());
  };

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({tags: formLike.tags?.join(',')});
  };
    // this.productForm.patchValue(formLike as any);


    onSizeClicked(size: string){
      const currentSizes = this.productForm.value.sizes ?? [];

        if(currentSizes.includes(size)){
          currentSizes.splice(currentSizes.indexOf(size), 1);
        } else {
          currentSizes.push(size);
        }

        this.productForm.patchValue({sizes:currentSizes})
    }




}
