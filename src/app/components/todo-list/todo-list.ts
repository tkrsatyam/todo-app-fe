import { Component, signal } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo';
import { TodoForm } from "../todo-form/todo-form";
import { TodoItem } from "../todo-item/todo-item";

@Component({
  selector: 'app-todo-list',
  imports: [TodoForm, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos = signal<Todo[]>([]);
  editingTodo = signal<Todo | null>(null);
  showForm = signal(false);
  loading = signal(false);

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
      },
      error: () => this.loading.set(false)
      });
    } else {
      this.todoService.create(todo).subscribe({
        next: () => {
        this.loadTodos();
        this.closeForm();
      },
      error: () => this.loading.set(false)
      });
    }
  }

  onToggle(id: number): void {
    this.todoService.toggleComplete(id).subscribe({
      next: () => this.loadTodos(),
      error: () => this.loading.set(false)
    });
  }

  onEdit(todo: Todo): void {
    this.editingTodo.set(todo);
    this.showForm.set(true);
  }

  onDelete(id: number): void {
    this.todoService.delete(id).subscribe({
      next: () => this.loadTodos(),
      error: () => this.loading.set(false)
    });
  }

}
