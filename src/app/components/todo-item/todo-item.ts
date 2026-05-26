import { Component, input, output, signal } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  todo = input.required<Todo>();
  toggle = output<number>();
  edit = output<Todo>();
  delete = output<number>();
  expanded = signal(false);

  onToggle(): void {
    this.toggle.emit(this.todo().id!);
  }

  onEdit(): void {
    this.edit.emit(this.todo());
  }

  onDelete(): void {
    this.delete.emit(this.todo().id!);
  }

  toggleExpanded(): void {
    if (this.todo().description) {
      this.expanded.set(!this.expanded());
    }
  }
}
