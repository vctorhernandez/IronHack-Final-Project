import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  item?: Item;
  error: string | null = null;

  constructor() {
    const id = +(this.route.snapshot.paramMap.get('id') || 0);
    if (id) {
      this.api.getItem(id).subscribe({
        next: (x) => this.item = x,
        error: (e) => this.error = e?.error?.error || 'No se pudo cargar el item.'
      });
    } else {
      this.error = 'Identificador no válido.';
    }
  }
}
