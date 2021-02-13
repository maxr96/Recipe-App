import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoCopyPasteDirective } from './no-copy-paste.directive';
import { MatCheckboxModule } from '@angular/material/checkbox'; 


@NgModule({
  declarations: [LoginComponent, SignupComponent, NoCopyPasteDirective],
  imports: [FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule.forChild([{
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },{
      path: 'login',
      component: LoginComponent
    },{
      path:'signup',
      component: SignupComponent
    } ]), SharedModule
  ]
})
export class AuthModule {}
