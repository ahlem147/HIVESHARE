import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../auth/authentification.service';

export const loginGuard: CanActivateFn = (route, state) => {
const _auth=inject(AuthentificationService)
const _router=inject(Router)
if(_auth.isLoggedIn() == false){
  return true;
}else{
  _router.navigate(['/dashboard']);
  return false;
}
};
