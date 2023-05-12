import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private urlDatabaseFireBase: string = 'https://angular-the-complete-gui-3c98a-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}

  create(title: string, content: string): void {
    const post: Post = { title, content };
    this.http
      .post<{ name: string }>(this.urlDatabaseFireBase + 'posts.json', post)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  getAll(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post}>(this.urlDatabaseFireBase + 'posts.json')
      .pipe(map(responseData =>{
        if (!responseData) {
          return [];
        }
        const posts = Object.entries(responseData).map(([id, post]) => ({ ...post, id}));
        return posts;
      }));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.urlDatabaseFireBase + 'posts.json');
  }
}
