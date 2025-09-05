
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
],
  templateUrl: './dialog-success.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSuccessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}
