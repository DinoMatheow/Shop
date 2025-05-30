import { Product } from '@/products/interfaces/products.interface';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { ProductCaruselComponent } from "../../../../products/components/product-carusel/product-carusel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@/utils/form-utils';
import { FormErrorLabelComponent } from '@/shared/form-error-label/form-error-label.component';
import { ProductService } from '@/products/services/products.service';

@Component({
  selector: 'product-details',
  imports: [ProductCaruselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  product = input.required<Product>();
  productService = inject(ProductService);

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

  onSumbit(){
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if(!isValid) return;

    const formValue = this.productForm.value;
    const productLike: Partial<Product>={
      ...(formValue as any),
      tags:formValue.tags?.toLocaleLowerCase().split(',').map(tag => tag.trim() ?? {})
    };
    console.log(this.productForm.value, {productLike});
    this.productService.updateProduct( this.product().id,productLike).subscribe(
      producto => {
        console.log('Producto Actulizado');
      }
    )
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
