import { Component, input, output, signal } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { ConfirmModal } from "../confirm-modal/confirm-modal";

@Component({
  selector: 'app-todo-item',
  imports: [ConfirmModal],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  todo = input.required<Todo>();
  toggle = output<number>();
  edit = output<Todo>();
  delete = output<number>();
  expanded = signal(false);
  showDeleteModal = signal(false);

  onToggle(): void {
    this.toggle.emit(this.todo().id!);
  }

  onEdit(): void {
    this.edit.emit(this.todo());
  }

  onDelete(): void {
    this.showDeleteModal.set(true);
  }

  confirmDelete(): void {
    this.showDeleteModal.set(false);
    this.delete.emit(this.todo().id!);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
  }

  toggleExpanded(): void {
    if (this.todo().description) {
      this.expanded.set(!this.expanded());
    }
  }
}
