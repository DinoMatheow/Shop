import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender, Product, ProductsResponse } from '../interfaces/products.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@/auth/interfaces/auth.interface';


const baseUrl = environment.baseUrl;
interface Options{
  limit?:number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product ={
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Kid,
  images: [],
  user: {} as User,
  tags: []
}



@Injectable({providedIn: 'root'})
export class ProductService {

  private  http = inject(HttpClient);
  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();


  getImageProdcut(images: string):Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(`${baseUrl}/files/product/${images}`)
  };


  getProduct(options:Options):Observable<ProductsResponse>{

    const { limit = 9, offset = 0, gender = ''} = options;
    const key = `${limit}-${offset}-${gender}`;
    if(this.productsCache.has(key)){ return of(this.productsCache.get(key)!)}

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    })
    .pipe(
      tap((resp)=> console.log(resp)),
      tap((resp)=> this.productsCache.set(key, resp)),
    );
  }


  getProductByIdSlug(idSlug: string):Observable<Product>{

    if(this.productCache.has(idSlug)){
      return of(this.productCache.get(idSlug)!)}





    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
    .pipe(
      tap((product)=> this.productCache.set(idSlug, product))
    );
  }

  getProductById(id: string):Observable<Product>{

      if(id == 'new'){
        return of(emptyProduct);
      }


    if(this.productCache.has(id)){
      return of(this.productCache.get(id)!)}





    return this.http.get<Product>(`${baseUrl}/products/${id}`)
    .pipe(
      tap((product)=> this.productCache.set(id, product))
    );
  }
  createProduct(productLike: Partial<Product>): Observable<Product> {
    return this.http
      .post<Product>(`${baseUrl}/products`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProduct(id: string, productLike: Partial<Product>): Observable<Product> {
    console.log('Actualizando producto');

     return  this.http
     .patch<Product>(`${ baseUrl }/products/${id}`, productLike)
     .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProductCache(product: Product){
    const productID = product.id;
    this.productCache.set(productID, product);
    this.productsCache.forEach( productsResponse =>{
      productsResponse.products = productsResponse.products.map((currentProduct)=>{
        return currentProduct.id == productID ? product : currentProduct;
      });
    });
    console.log('Cache Actulizado')
  }

}