import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  urlDatabaseFireBase: string = 'https://angular-the-complete-gui-3c98a-default-rtdb.firebaseio.com/';
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(this.urlDatabaseFireBase + 'posts.json', postData)
            .subscribe(responseData => {
              console.log(responseData);
            });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
