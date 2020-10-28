import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from "@ngrx/store";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private storeSub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(){
        this.storeSub = this.store.select('auth').subscribe(authState =>{
            this.isLoading = authState.loading;
            this.error = authState.authError;
        })
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        const username = form.value.username;

        this.isLoading = true;

        if (this.isLoginMode) {
            this.store.dispatch(AuthActions.loginStart({email, username, password}));

        } else {
            this.store.dispatch(AuthActions.signupStart({email, username, password}))
        }

        form.reset();
    }

    onHandleError() {
        this.store.dispatch(AuthActions.clearError());
    }
}
