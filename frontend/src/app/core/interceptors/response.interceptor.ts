import { HttpEvent, HttpErrorResponse, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UiFeedbackService } from '../services/utils/ui-feedback.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private _uiFeedbackService: UiFeedbackService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!(error.error instanceof ErrorEvent)) {
          if(error.status >= 400 && error.status < 500) {
              this._uiFeedbackService.showWarning([error.error]);
          }
          else if(error.status >= 500) {
            this._uiFeedbackService.showError(error.error);
          }
        }

        return throwError(() => new Error(error.error));
      })
    );
  }
}
