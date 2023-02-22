import { Component } from '@angular/core';

@Component({
  // As a div attribute selector: '[app-servers]',
  // As a div class selector: '.app-servers',
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer: boolean = false;
  serverCreationStatus: string = "No server was created!";
  serverName: string = "TestServer";

  constructor(){
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer(){
    this.serverCreationStatus = "Server was created! Name is " + this.serverName;
    this.serverName = "";
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
