import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loading$ as httpLoading$ } from '../../interceptors/loading.interceptor';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  loading$ = httpLoading$;
}
