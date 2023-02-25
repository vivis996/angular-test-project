import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements = [
    {
      type: 'server',
      name: 'Server test',
      content: 'This is a server test',
    },
    {
      type: 'blueprint',
      name: 'Blueprint test',
      content: 'This is a blueprint test',
    },
  ];
}
