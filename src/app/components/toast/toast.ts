import { Component, input, OnDestroy, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit, OnDestroy {
  message = input.required<string>();
  type = input<'success' | 'error'>('success');
  dismiss = output<void>();

  private timer: any;

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      this.dismiss.emit();
    }, 10000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
