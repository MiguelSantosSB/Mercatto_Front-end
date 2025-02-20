import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Verifica se a requisição é para endpoints que precisam de autenticação
  const authRequired = !req.url.includes('/auth/') && !req.url.includes('/user/create');
  
  if (authRequired) {
    const token = localStorage.getItem('token');
    
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }
  
  return next(req);
};
