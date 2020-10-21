import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAutheticated = false;
    private userSub: Subscription;
    
    constructor(private authService: AuthService, private dataStorageService: DataStorageService, private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => {
            this.isAutheticated = !!user;
        });
    }
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
       this.dataStorageService.fetchRecipes().subscribe(); 
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
