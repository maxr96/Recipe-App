import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAutheticated = false;
    private userSub: Subscription;
    
    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => {
            this.isAutheticated = !!user;
        });
    }
    onSaveData() {
        this.store.dispatch(RecipeActions.storeRecipes());
    }

    onFetchData() {
        this.store.dispatch(RecipeActions.fetchRecipes());
    }

    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
