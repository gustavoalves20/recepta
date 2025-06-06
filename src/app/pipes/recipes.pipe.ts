import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipes',
  standalone: false,
})
export class RecipesPipe implements PipeTransform {
  transform(value: any): string {
    return value ? value : '-';
  }
}
