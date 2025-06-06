import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('expandDown', [
      state('closed', style ({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('open', style({
        height: '*',
        overflow: 'hidden',
        opacity: 1
      })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SidebarComponent {
  isRecipesOpen = false;

  toggleRecipes() {
    this.isRecipesOpen = !this.isRecipesOpen;
  }
}
