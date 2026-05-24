import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoItem } from "./components/todo-item/todo-item";
import { Todo } from './models/todo.model';
import { TodoForm } from "./components/todo-form/todo-form";
import { TodoList } from "./components/todo-list/todo-list";

@Component({
  selector: 'app-root',
  imports: [TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-app-fe');

  todo: Todo = {
    title: "Item 1",
    description: "Item 1 in Todo list",
    completed: false
  }
}
