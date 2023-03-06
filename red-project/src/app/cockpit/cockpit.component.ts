import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{ serverName:string, serverContent: string, }>();
  @Output() blueprintCreated = new EventEmitter<{ blueprintName:string, blueprintContent: string, }>();

  newServerName = '';
  newServerContent = '';

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({ serverName: nameInput.value, serverContent: this.newServerContent, });
    this.cleanFields();
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({ blueprintName: nameInput.value, blueprintContent: this.newServerContent, });
    this.cleanFields();
  }

  cleanFields(){
    this.newServerName = "";
    this.newServerContent = "";
  }
}
