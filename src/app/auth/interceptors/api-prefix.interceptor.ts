import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export const apiPrefixInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
 return next(
   req.clone({
     url: `${environment.smartHomeApiBaseUrl}/api${req.url}`,
   })
 );
};
