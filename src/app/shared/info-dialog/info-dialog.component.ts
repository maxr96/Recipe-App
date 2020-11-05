import { Component, Inject, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  title: string;
  message: string;
}

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html'
})
export class InfoDialog {
    @Input() title: string;
    @Input() message: string;

    constructor(public dialogRef: MatDialogRef<InfoDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData){}
}
