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
  duration = input<number>(5000);
  dismiss = output<void>();

  private timer: any;

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      this.dismiss.emit();
    }, this.duration());
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
