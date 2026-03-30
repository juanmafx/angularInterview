import { Injectable, signal } from '@angular/core';
import { Category } from './category.model';

@Injectable({ providedIn: 'root' })
export class DrugCategoriesService {
  private readonly categoriesState = signal<Category[]>([
    {
      id: 1,
      name: 'Analgesics',
      description: 'Pain relief drugs'
    }
  ]);

  readonly categories = this.categoriesState.asReadonly();

  createCategory(name: string, description: string): void {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      return;
    }

    const nextCategory: Category = {
      id: this.categoriesState().length + 1,
      name: trimmedName,
      description: trimmedDescription
    };

    this.categoriesState.update((current) => [...current, nextCategory]);
  }
}
