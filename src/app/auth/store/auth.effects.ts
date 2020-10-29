import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';


export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    username: string,
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (expiresIn: string, email: string, username: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, username, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authenticateSuccess({email, username, userId, token, expirationDate, redirect: true});
}

const handleError = (errorRes) => {
    let errorMessage = 'An uknown error occured!'

    if(!errorRes.error || !errorRes.error.error){
        return of(AuthActions.authenticateFail({errorMessage}));
    }
    switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists.';
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is incorrect.'
    }
    return of(AuthActions.authenticateFail({errorMessage}));
}

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.signupStart),
        switchMap(signupAction => {
            return this.http.post<AuthResponseData>(environment.serverUrl + '/sign-up',
        {
            username: signupAction.username,
            email: signupAction.email,
            password: signupAction.password
        }).pipe(
            catchError(errorRes => handleError(errorRes))
    )}))

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.loginStart),
        switchMap(authData => {
            return this.http.post(environment.serverUrl + '/login',
            {
                username: authData.username,
                password: authData.password
            }, {observe: 'response'}).pipe(
                tap(resData => {
                  console.log(resData.headers.get('authorization'))
                    // this.authService.setLogoutTimer(+resData.headers.get('Authorization').expiresIn * 1000);
                })
                // map(resData => handleAuthentication(resData.expiresIn, resData.email, resData.username, resData.localId, resData.idToken)),
                // catchError(errorRes => handleError(errorRes))
        )}));

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap(authSuccessAction => {
            if(authSuccessAction.redirect) {
                this.router.navigate(['/']);}
            }
    ));

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.logout), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }))

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        map(() => {
            const userData: {
                email: string;
                username: string
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return {type: 'DUMMY'};
            }

            const loadedUser = new User(userData.email, userData.username, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return AuthActions.authenticateSuccess({email: loadedUser.email,
                    username: loadedUser.username,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                });
            }

            return {type: 'DUMMY'}
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}
}
