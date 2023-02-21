import { Component } from '@angular/core';

@Component({
  // As a div attribute selector: '[app-servers]',
  // As a div class selector: '.app-servers',
  selector: 'app-servers',
  template: '<app-server></app-server><app-server></app-server>',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

}
