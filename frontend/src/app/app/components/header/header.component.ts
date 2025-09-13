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

  submit() {
    this.router.navigate(['/'], { queryParams: { search: this.q || null, page: 1 } });
  }

  testHealth() {
    this.api.health().subscribe({
      next: (r) => this.toast.show(r?.db === 'connected' ? 'Conexión abierta' : 'Sin conexión con la DB'),
      error: () => this.toast.show('Sin conexión con la DB')
    });
  }
}