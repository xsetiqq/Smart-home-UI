import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const apiPrefixInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (req.url.startsWith('/')) {
    const apiReq = req.clone({
      url: `/api${req.url}`,
    });
    return next(apiReq);
  }

  return next(req);
};
