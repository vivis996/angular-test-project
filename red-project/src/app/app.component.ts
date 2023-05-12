import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string = null;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post): void  {
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
