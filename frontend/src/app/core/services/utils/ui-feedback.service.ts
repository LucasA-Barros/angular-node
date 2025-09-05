import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogErrorComponent } from "../../../shared/components/dialog-error/dialog-error.component";
import { DialogSuccessComponent } from "../../../shared/components/dialog-success/dialog-success.component";
import { DialogWarningComponent } from "../../../shared/components/dialog-warning/dialog-warning.component";
import { DataError } from "../../../shared/interfaces/system-interfaces";

@Injectable({
  providedIn: 'root'
})
export class UiFeedbackService {
  private _dialog = inject(MatDialog);

  public showError(data?: DataError, callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogErrorComponent, {
      id: 'ERROR',
      disableClose: true,
      data: data
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public showSuccess(data?: string[], callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogSuccessComponent, {
      id: 'SUCCESS',
      disableClose: true,
      data: data
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public showWarning(data?: string[], callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogWarningComponent, {
      id: 'WARNING',
      disableClose: true,
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public closeError(): void {
    const DIALOD = this._dialog.getDialogById('ERROR');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeSuccess(): void {
    const DIALOD = this._dialog.getDialogById('SUCCESS');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeWarning(): void {
    const DIALOD = this._dialog.getDialogById('WARNING');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeAll(): void {
    this._dialog.closeAll();
  }
}
