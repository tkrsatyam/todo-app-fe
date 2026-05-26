import { AfterViewInit, Component, effect, ElementRef, input, OnDestroy, output, signal, ViewChild } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { ConfirmModal } from "../confirm-modal/confirm-modal";

@Component({
  selector: 'app-todo-item',
  imports: [ConfirmModal],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem implements AfterViewInit, OnDestroy {
  todo = input.required<Todo>();
  toggle = output<number>();
  edit = output<Todo>();
  delete = output<number>();

  expanded = signal(false);
  showExpandIcon = signal(false);
  showDeleteModal = signal(false);

  @ViewChild('descriptionRef') descriptionRef!: ElementRef<HTMLSpanElement>;

  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      const _ = this.todo();
      this.checkOverflow();
    })
  }

  ngAfterViewInit(): void {
    this.checkOverflow();

    this.resizeObserver = new ResizeObserver(() => {
      this.checkOverflow();
    });

    if (this.descriptionRef?.nativeElement) {
      this.resizeObserver.observe(this.descriptionRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  checkOverflow(): void {
    const element = this.descriptionRef?.nativeElement;
    if (!element) return;

    if (this.expanded()) {
      this.showExpandIcon.set(true);
      return;
    }

    this.showExpandIcon.set(element.scrollHeight > element.clientHeight);
  }

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
    this.expanded.set(!this.expanded());
    setTimeout(() => this.checkOverflow(), 0);
  }
}
