import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const msg = (error?.error && (error.error.error || error.error.message)) || error.message || 'Error inesperado';
      toast.show(`Error ${error.status || ''}: ${msg}`);
      return throwError(() => error);
    })
  );
};
