import { Injectable } from "@angular/core";
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { exhaustMap, map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.user),
            exhaustMap(user => {
            if(!user){
                return next.handle(req);
            }
            const modifiedReq = req.clone({headers: new HttpHeaders().set('Authorization', user.token)});
            return next.handle(modifiedReq);
        }));
    }
}
