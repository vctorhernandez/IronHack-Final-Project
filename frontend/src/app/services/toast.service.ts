import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message$ = new BehaviorSubject<string | null>(null);
  show(msg: string) {
    this.message$.next(msg);
    setTimeout(() => this.message$.next(null), 3500);
  }
}
