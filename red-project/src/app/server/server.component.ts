import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
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
  @ViewChild("heading", { static: true, }) header: ElementRef;
  @ContentChild("contentParagraph", { static: true, }) paragraph: ElementRef;

  constructor() {
    console.log('Constructor called.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called.');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called.');
    console.log("Text content: " + this.header.nativeElement.textContent);
    console.log("Text content of paragraph: " + this.paragraph.nativeElement.textContent);
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
    console.log("Text content: " + this.header.nativeElement.textContent);
    console.log("Text content of paragraph: " + this.paragraph.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called.');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called.');
  }
}
