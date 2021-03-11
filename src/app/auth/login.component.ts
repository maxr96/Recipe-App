import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from '../shared/info-dialog/info-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  isLoading = false;
  error: string | null = null;
  private storeSub: Subscription | undefined;

  constructor(private store: Store<fromApp.AppState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;

      if (!!this.error) {
        const dialogRef = this.dialog.open(InfoDialog, {
          width: '500px',
          data: { title: 'Login Failed!', message: this.error },
        });

        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
          this.store.dispatch(AuthActions.clearError());
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    const password = form.value.password;
    const username = form.value.username;

    this.isLoading = true;

    this.store.dispatch(AuthActions.loginStart({ username, password }));

    form.reset();
  }
}
