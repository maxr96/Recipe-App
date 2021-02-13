import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";
import { InfoDialog } from "../shared/info-dialog/info-dialog.component";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./auth.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
    hide = true;
    isLoading = false;
    error: string | null = null;
    private storeSub: Subscription | undefined;
    private readonly DIALOG_TITLE = 'Signup Failed!';
    private readonly DIALOG_WIDTH = '500px';

    constructor(private store: Store<fromApp.AppState>, public dialog: MatDialog) {}

    ngOnInit(){
        this.storeSub = this.store.select('auth').subscribe(authState =>{
            this.isLoading = authState.loading;
            this.error = authState.authError;

            if(!!this.error){
              const dialogRef = this.dialog.open(InfoDialog, {
                width: this.DIALOG_WIDTH,
                data: {title: this.DIALOG_TITLE, message: this.error}
              });

              dialogRef.afterClosed().subscribe(() => {
                this.store.dispatch(AuthActions.clearError());
              });
            }
        })
    }

    ngOnDestroy() {
      if(this.storeSub){
        this.storeSub.unsubscribe();
      }
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        if(form.value.password !== form.value.password2) {
          this.dialog.open(InfoDialog, {
            width: this.DIALOG_WIDTH,
            data: {title: this.DIALOG_TITLE, message: "The passwords you entered don't match. Please enter them again."}
          }).afterClosed().subscribe(() => {
            this.resetForm(form.form);
          });
          return;
        }
        const email = form.value.email;
        const password = form.value.password;
        const username = form.value.username;

        this.isLoading = true;

        this.store.dispatch(AuthActions.signupStart({email, username, password}))

        this.resetForm(form.form);
    }

    resetForm(form: FormGroup) {
      form.get('password')?.reset();
      form.get('password2')?.reset();
    }
}
