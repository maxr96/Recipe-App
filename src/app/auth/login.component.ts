import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from "@ngrx/store";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
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

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const password = form.value.password;
        const username = form.value.username;

        this.isLoading = true;

        this.store.dispatch(AuthActions.loginStart({username, password}));

        form.reset();
    }

    onHandleError() {
        this.store.dispatch(AuthActions.clearError());
    }
}
