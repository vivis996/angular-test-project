import { Component, OnDestroy, } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  isToggle: boolean = true;
  subscription: Subscription;
  
  constructor(private dataStorageService: DataStorageService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.subscription = this.dataStorageService.fetchRecipes().subscribe();
  }
  
  onToggleNavbar(): void {
    this.isToggle = !this.isToggle;
  }
}
