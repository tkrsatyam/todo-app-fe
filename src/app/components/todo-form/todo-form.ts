import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm implements OnChanges {
  todo = input<Todo | null>();
  save = output<Todo>();
  cancel = output<void>();

  formData: Todo = { title: '', description: '', completed: false };
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo']) {
      this.formData = this.todo() ?
        { ...this.todo()! } : 
        { title: '', description: '', completed: false };
    }
  }

  onSubmit(): void {
    if (this.formData.title.trim()) {
      this.save.emit(this.formData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get isEditing(): boolean {
    return !!this.todo()?.id;
  }
}
