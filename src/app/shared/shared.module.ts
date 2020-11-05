import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InfoDialog } from "./info-dialog/info-dialog.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        DropdownDirective,
        InfoDialog
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        InfoDialog,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {}
