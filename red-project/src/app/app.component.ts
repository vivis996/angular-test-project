import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  urlDatabaseFireBase: string = 'https://angular-the-complete-gui-3c98a-default-rtdb.firebaseio.com/';
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<{ name: string }>(this.urlDatabaseFireBase + 'posts.json', postData)
            .subscribe(responseData => {
              console.log(responseData);
            });
  }

  private fetchPosts(){
    this.http
      .get<{ [key: string]: Post}>(this.urlDatabaseFireBase + 'posts.json')
      .pipe(map(responseData =>{
        return Object.entries(responseData).map(([id, post]) => ({ ...post, id}));
      }))
      .subscribe(posts => {
        console.log(posts[0].title);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
