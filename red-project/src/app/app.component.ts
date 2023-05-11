import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post): void  {
    // Send Http request
    this.postService.create(postData.title, postData.content)
  }

  private fetchPosts(): void {
    this.postService.getAll();
  }

  onFetchPosts(): void  {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts(): void  {
    // Send Http request
  }
}
