import { JsonpInterceptor } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { consumerPollProducersForChange } from 'node_modules/@angular/core/weak_ref.d-DWHPG08n';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn =  async(
  route: Route,
  segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthtenticated = await firstValueFrom(authService.checkStatus() )
    console.log(isAuthtenticated);

  if( isAuthtenticated){
    router.navigateByUrl('/')
    return false;
  }
  return true;
}