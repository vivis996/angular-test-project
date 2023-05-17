import { Component, OnDestroy, OnInit, } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isToggle: boolean = true;
  subscription: Subscription;
  private userSub: Subscription;
  
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
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

  onLogout(): void {
    this.authService.logout();
  }
}
