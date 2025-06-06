import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input()
  value!: string | number;
  @Input()
  label!: string;
  @Input()
  icon!: string;
  @Input()
  header: boolean = false;
  @Input()
  footer: boolean = false;
}
