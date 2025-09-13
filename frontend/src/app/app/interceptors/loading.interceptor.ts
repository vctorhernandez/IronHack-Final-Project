import { HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject, finalize } from 'rxjs';

export const loading$ = new BehaviorSubject<boolean>(false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  loading$.next(true);
  return next(req).pipe(finalize(() => loading$.next(false)));
};
