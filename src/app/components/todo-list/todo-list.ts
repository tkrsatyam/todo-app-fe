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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAll().subscribe(todos => {
      this.todos.set(todos);
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
    if (todo.id) {
      this.todoService.update(todo.id, todo).subscribe(() => {
        this.loadTodos();
        this.closeForm();
      })
    } else {
      this.todoService.create(todo).subscribe(() => {
        this.loadTodos();
        this.closeForm();
      })
    }
  }

  onToggle(id: number): void {
    this.todoService.toggleComplete(id).subscribe(() => {
      this.loadTodos();
    })
  }

  onEdit(todo: Todo): void {
    this.editingTodo.set(todo);
    this.showForm.set(true);
  }

  onDelete(id: number): void {
    this.todoService.delete(id).subscribe(() => {
      this.loadTodos();
    })
  }

}
