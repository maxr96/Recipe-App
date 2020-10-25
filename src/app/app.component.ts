import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        `app-icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/app-icon.svg")
      );
    }
  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(AuthActions.autoLogin());
    }
  }
}
