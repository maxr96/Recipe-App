import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import * as AuthActions from '../auth/store/auth.actions';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  @Output() sidenavClose = new EventEmitter<void>();
  isAutheticated = false;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
        this.isAutheticated = !!user;
    });
}
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.onSidenavClose();
}
ngOnDestroy() {
    this.userSub.unsubscribe();
}
}
