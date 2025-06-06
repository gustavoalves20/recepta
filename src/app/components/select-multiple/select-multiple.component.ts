import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-multiple',
  standalone: false,
  templateUrl: './select-multiple.component.html',
  styleUrl: './select-multiple.component.scss',
})
export class SelectMultipleComponent {
  @Input()
  categories: string[] = [];
  @Input()
  control!: FormControl;

  @Output()
  selectionChange = new EventEmitter<string[]>();

  onChange(): void {
    this.selectionChange.emit(this.control.value);
  }
}
