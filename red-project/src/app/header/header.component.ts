import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();
  headerSelected: string = 'recipe';

  onSelect(feature: string) {
    this.headerSelected = feature;
    this.featureSelected.emit(feature);
  }
}
