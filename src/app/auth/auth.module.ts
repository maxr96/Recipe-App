import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule.forChild([{
      path: 'login',
      component: LoginComponent
    },{
      path:'signup',
      component: SignupComponent
    } ]), SharedModule
  ]
})
export class AuthModule {}
