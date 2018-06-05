import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from '../auth.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authService.isAuthenticated;
  }
}
