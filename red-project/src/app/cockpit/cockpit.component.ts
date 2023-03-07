import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{ serverName:string, serverContent: string, }>();
  @Output() blueprintCreated = new EventEmitter<{ blueprintName:string, blueprintContent: string, }>();

  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({ serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value, });
    this.cleanFields(nameInput);
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({ blueprintName: nameInput.value, blueprintContent: this.serverContentInput.nativeElement.value, });
    this.cleanFields(nameInput);
  }

  cleanFields(nameInput: HTMLInputElement){
    nameInput.value = "";
    this.serverContentInput.nativeElement.value = "";
  }
}
