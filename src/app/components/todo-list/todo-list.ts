import { Component, signal } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo';
import { TodoForm } from "../todo-form/todo-form";
import { TodoItem } from "../todo-item/todo-item";
import { Toast } from "../toast/toast";

@Component({
  selector: 'app-todo-list',
  imports: [TodoForm, TodoItem, Toast],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos = signal<Todo[]>([]);
  editingTodo = signal<Todo | null>(null);
  showForm = signal(false);
  loading = signal(false);

  toast = signal<{ message: string; type: 'success' | 'error'; duration: number } | null>(null);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading.set(true);
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.showToast('Failed to load todos. Please try again.', 'error');
      }
    });
  }

  openNewForm(): void {
    this.editingTodo.set(null);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.editingTodo.set(null);
    this.showForm.set(false);
  }

  onSave(todo: Todo): void {
    this.loading.set(true);
    if (todo.id) {
      this.todoService.update(todo.id, todo).subscribe({
        next: () => {
          this.loadTodos();
          this.closeForm();
          this.showToast('Todo updated successfully');
        },
        error: () => {
          this.loading.set(false)
          this.showToast('Failed to update todo. Please try again.', 'error');
        }
      });
    } else {
      this.todoService.create(todo).subscribe({
        next: () => {
          this.loadTodos();
          this.closeForm();
          this.showToast('Todo created successfully');
        },
        error: () => {
          this.loading.set(false)
          this.showToast('Failed to create todo. Please try again.', 'error');
        }
      });
    }
  }

  onToggle(id: number): void {
    this.todoService.toggleComplete(id).subscribe({
      next: () => {
        this.loadTodos();
        this.showToast('Todo updated successfully');
      },
      error: () => {
        this.loading.set(false)
        this.showToast('Failed to update todo. Please try again.', 'error');
      }
    });
  }

  onEdit(todo: Todo): void {
    this.editingTodo.set(todo);
    this.showForm.set(true);
  }

  onDelete(id: number): void {
    this.todoService.delete(id).subscribe({
      next: () => {
        this.loadTodos();
        this.showToast('Todo deleted successfully');
      },
      error: () => {
        this.loading.set(false)
        this.showToast('Failed to delete todo. Please try again.', 'error');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    const duration = type === 'error' ? 10000 : 5000;
    this.toast.set({ message, type, duration });
  }

  dismissToast(): void {
    this.toast.set(null);
  }

}
