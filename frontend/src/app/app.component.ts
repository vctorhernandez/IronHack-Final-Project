import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/components/header/header.component';
import { SpinnerComponent } from './app/shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ToastService } from './app/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SpinnerComponent],
  template: `
  <app-header></app-header>
  <main class="container">
    <p style="margin:12px 0">App cargada ✅</p>
    <router-outlet></router-outlet>
  </main>
  <app-spinner></app-spinner>
`,
  styles: [`
    .container{max-width:960px;margin:18px auto;padding:0 12px}
    .toast{position:fixed;right:12px;bottom:12px;background:#333;color:#fff;padding:10px 14px;border-radius:8px}
  `]
})
export class AppComponent {
  toast = inject(ToastService);
}
