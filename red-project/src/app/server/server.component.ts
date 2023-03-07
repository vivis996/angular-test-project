import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input('srvElement') element: {
    type: string;
    name: string;
    content: string;
  };

  @Input() name: string = '';

  constructor() {
    console.log('Constructor called.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called.');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called.');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called.');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called.');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called.');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called.');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called.');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called.');
  }
}
