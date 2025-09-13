import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item, Paginated } from '../models/item.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  health(): Observable<{status: string; db: string}> {
    return this.http.get<{status: string; db: string}>(`${this.base}/health`);
  }

  listItems(opts: { page?: number; pageSize?: number; search?: string }): Observable<Paginated<Item>> {
    let params = new HttpParams();
    if (opts.page) params = params.set('page', opts.page);
    if (opts.pageSize) params = params.set('pageSize', opts.pageSize);
    if (opts.search) params = params.set('search', opts.search);
    return this.http.get<Paginated<Item>>(`${this.base}/items`, { params });
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.base}/items/${id}`);
  }

  createItem(payload: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(`${this.base}/items`, payload);
  }

  updateItem(id: number, payload: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${this.base}/items/${id}`, payload);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/items/${id}`);
  }
}
