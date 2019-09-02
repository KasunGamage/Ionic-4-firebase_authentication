import { Injectable, ErrorHandler, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    @Inject(ToastService) private toastService: ToastService
  ) {}

  handleError(error: any): void {
    // Server or connection error happened
    if (error instanceof HttpErrorResponse) {
      console.error('Server or connection error happened', error);
      const errorDisplay = error.status + ' ' + error.message;
      this.toastService.presentToastWithOptions(
        'server error',
        errorDisplay,
        'bottom',
        4000
      );
    } else {
      console.error('other error', error);
      this.toastService.presentToastWithOptions(
        'other error',
        error.message,
        'bottom',
        4000
      );
    }
    // log error to the third party service. such as rollbar, sentry
  }
}
