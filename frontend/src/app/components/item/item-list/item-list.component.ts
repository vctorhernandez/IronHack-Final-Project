import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { Item, Paginated } from '../../../models/item.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnDestroy {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sub?: Subscription;

  items?: Paginated<Item>;
  error: string | null = null;

  constructor() {
    // Reacciona a cambios de query params (page, pageSize, search)
    this.sub = this.route.queryParamMap
      .pipe(
        switchMap(params => {
          const page = +(params.get('page') || 1);
          const pageSize = +(params.get('pageSize') || 10);
          const search = params.get('search') || '';
          this.error = null;
          return this.api.listItems({ page, pageSize, search });
        })
      )
      .subscribe({
        next: res => this.items = res,
        error: err => this.error = this.readError(err)
      });
  }

  goto(p: number) {
    const total = this.items?.totalPages || 1;
    const page = Math.min(Math.max(1, p), total);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: { page }
    });
  }

  private readError(e: any): string {
    return e?.error?.error || e?.message || 'Se produjo un error al cargar los items.';
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
