import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 1;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
