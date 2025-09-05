
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { DataError } from '../../interfaces/system-interfaces';

@Component({
  selector: 'app-dialog-error',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatTooltipModule
],
  templateUrl: './dialog-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DataError) {}
}
