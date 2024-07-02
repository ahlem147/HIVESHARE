import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../auth/authentification.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthentificationService);
  const _router = inject(Router)
  if( _auth.getUsrDataFromToken().role == 'admin' ){
    return true;
  }else{
    _router.navigate(['/dashboard/projects']);
    return false;
  }
};
