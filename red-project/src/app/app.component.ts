import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string = null;
  errSubscription: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.errSubscription.unsubscribe();
  }

  onCreatePost(postData: Post): void  {
    this.errSubscription = this.postService.error.subscribe(errorMessage => this.error = errorMessage);
    // Send Http request
    this.postService.create(postData.title, postData.content);
  }

  private fetchPosts(): void {
    this.isFetching = true;
    this.postService.getAll()
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      }, error => {
        this.error = error.status + ' - ' + error.error.error;
      });
  }

  onFetchPosts(): void  {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts(): void  {
    // Send Http request
    this.postService.deleteAll()
      .subscribe(() => this.loadedPosts = [],
      error => {
        this.error = error.status + ' - ' + error.error.error;
      });
  }
}
