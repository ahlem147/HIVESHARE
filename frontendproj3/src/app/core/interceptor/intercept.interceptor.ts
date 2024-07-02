import { HttpInterceptorFn } from '@angular/common/http';

export const interceptInterceptor: HttpInterceptorFn = (req, next) => { 

//interceptor bsh yo3reth req 9bal mayokhrej ml angulr kbal matetbaath
//bsh naaml copoie ml req htha
  const token = localStorage.getItem('token');
const request =req.clone({
  setHeaders:{
    authorization:'Bearer '+token
  }
})
return next(request)

};
