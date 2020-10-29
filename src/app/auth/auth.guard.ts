import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
          take(1),
          map(authState => {
              const isAuth = !!authState.user;
              if(isAuth) {
                  return true;
              }
              return this.router.createUrlTree(['/auth']);
          }));
    }
}
