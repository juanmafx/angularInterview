import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrugCategoriesService } from './drug-categories.service';

@Component({
  selector: 'app-drug-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './drug-categories.component.html',
  styleUrl: './drug-categories.component.scss'
})
export class DrugCategoriesComponent {
  private readonly fb = inject(FormBuilder);
  private readonly drugCategoriesService = inject(DrugCategoriesService);

  readonly categories = this.drugCategoriesService.categories;
  readonly error = signal('');

  readonly categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  createCategory(): void {
    this.error.set('');

    if (this.categoryForm.invalid) {
      this.error.set('Name is required.');
      this.categoryForm.markAllAsTouched();
      return;
    }

    const { name, description } = this.categoryForm.getRawValue();
    this.drugCategoriesService.createCategory(name ?? '', description ?? '');
    this.categoryForm.reset();
  }
}
