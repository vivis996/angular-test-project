import { NgFor } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);

  increment() {
    // this.counter.update((oldValue) => oldValue + 1);
    this.counter.set(this.counter() + 1);
    this.actions.mutate((oldValue) => oldValue.push('INCREMENT'));
    // this.actions.push('INCREMENT');
  }

  decrement() {
    // this.counter.update((oldValue) => oldValue - 1);
    this.counter.set(this.counter() - 1);
    this.actions.update((oldValue) => [...oldValue, 'DECREMENT']);
    // This will no work: this.actions.update((oldValue) => oldValue.push('DECREMENT'));
    // this.actions.push('DECREMENT');
  }
}
