import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);
  private api = inject(ApiService);
  private toast = inject(ToastService);

  q = '';
  theme: 'light' | 'dark';

  constructor() {
    const saved = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    this.theme = saved;
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }

  submit() {
    this.router.navigate(['/'], { queryParams: { search: this.q || null, page: 1 }, queryParamsHandling: 'merge' });
  }

  clear() {
    this.q = '';
    this.router.navigate(['/'], { queryParams: { search: null, page: 1 }, queryParamsHandling: 'merge' });
  }

  testHealth() {
    this.api.health().subscribe({
      next: r => this.toast.show(r?.db === 'connected' ? 'Conexión abierta' : 'Sin conexión con la DB'),
      error: () => this.toast.show('Sin conexión con la DB')
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
    localStorage.setItem('theme', this.theme);
  }
}
