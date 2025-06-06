import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input()
  categories: string[] = [];
  @Input()
  selected: string = '';

  @Output()
  selectedChange = new EventEmitter<string>();
  @Output()
  categoryChange = new EventEmitter<string>();

  onChange(): void {
    this.selectedChange.emit(this.selected);
    this.categoryChange.emit(this.selected);
  }
}
