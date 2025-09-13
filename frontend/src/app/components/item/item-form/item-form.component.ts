import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  private toast = inject(ToastService);

  id: number | null = null;
  title = '';
  description: string | null = null;
  tagsText = '';

  isEdit = signal(false);

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEdit.set(true);
      this.api.getItem(this.id).subscribe({
        next: (it: Item) => {
          this.title = it.title;
          this.description = it.description ?? null;
          this.tagsText = (it.tags || []).join(', ');
        },
        error: () => this.toast.show('No se pudo cargar el item')
      });
    }
  }

  private parseTags(): string[] {
    return (this.tagsText || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  save() {
    const payload: Partial<Item> = {
      title: (this.title || '').trim(),
      description: this.description?.toString() ?? null,
      tags: this.parseTags()
    };

    if (!payload.title) {
      this.toast.show('El título es obligatorio.');
      return;
    }

    if (this.isEdit() && this.id) {
      this.api.updateItem(this.id, payload).subscribe({
        next: (it) => {
          this.toast.show('Item actualizado');
          this.router.navigate(['/item', it.id]);
        },
        error: () => this.toast.show('No se pudo actualizar el item')
      });
    } else {
      this.api.createItem(payload).subscribe({
        next: (it) => {
          this.toast.show('Item creado');
          this.router.navigate(['/item', it.id]);
        },
        error: () => this.toast.show('No se pudo crear el item')
      });
    }
  }

  remove() {
    if (!this.id) return;
    if (!confirm('¿Seguro que deseas borrar este item?')) return;

    this.api.deleteItem(this.id).subscribe({
      next: () => {
        this.toast.show('Item borrado');
        this.router.navigate(['/']);
      },
      error: () => this.toast.show('No se pudo borrar el item')
    });
  }
}
