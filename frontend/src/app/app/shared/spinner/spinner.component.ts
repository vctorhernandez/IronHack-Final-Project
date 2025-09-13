import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loading$ } from '../../interceptors/loading.interceptor';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  loading = signal(false);
  private sub = loading$.subscribe(v => this.loading.set(v));
}
