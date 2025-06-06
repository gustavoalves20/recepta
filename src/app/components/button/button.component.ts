import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  isHover: boolean = false;

  @Input() 
  text: string = '';
  @Input() 
  color!: string;
  @Input() 
  disabled: boolean = false;
  @Input() 
  type: string = 'button';
  @Input() 
  outlined: boolean = false;

  @Output() clickEvent = new EventEmitter<void>();

  onClick(): void {
    this.clickEvent.emit();
  }
}
