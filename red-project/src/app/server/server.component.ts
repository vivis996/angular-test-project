import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class ServerComponent {
  @Input("srvElement") element: {
    type: string;
    name: string;
    content: string;
  };
}
