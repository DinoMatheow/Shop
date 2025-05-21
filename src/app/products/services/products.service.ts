import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductsResponse } from '../interfaces/products.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;
interface Options{
  limit?:number;
  offset?: number;
  gender?: string;
}



@Injectable({providedIn: 'root'})
export class ProductService {

  private  http = inject(HttpClient);

  getImageProdcut(images: string):Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(`${baseUrl}/files/product/${images}`)
  };


  getProduct(options:Options):Observable<ProductsResponse>{

    const { limit = 9, offset = 0, gender = ''} = options;

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    })
    .pipe(
      tap((resp)=> console.log(resp))
    );
  }


  getProductByIdSlug(idSlug: string):Observable<Product>{
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
  }



}