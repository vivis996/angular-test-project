import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private urlDatabaseFireBase: string = 'https://angular-the-complete-gui-3c98a-default-rtdb.firebaseio.com/';
  error = new Subject<string>();
  
  constructor(private http: HttpClient) {}

  create(title: string, content: string): void {
    const post: Post = { title, content };
    this.http
      .post<{ name: string }>(this.urlDatabaseFireBase + 'posts.json', post,
      {
        observe: 'response',
      }
      )
      .subscribe((responseData) => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  getAll(): Observable<Post[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('extra', 'value');
    return this.http
      .get<{ [key: string]: Post}>(this.urlDatabaseFireBase + 'posts.json', {
        headers: new HttpHeaders({ "Custom-Header": "Hello there!" }),
        params: searchParams,
      })
      .pipe(map(responseData =>{
        if (!responseData) {
          return [];
        }
        const posts = Object.entries(responseData).map(([id, post]) => ({ ...post, id}));
        return posts;
      },
      catchError(errorRes => {
        // Send to analytics server
        return throwError(errorRes);
      })));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.urlDatabaseFireBase + 'posts.json',
    {
      observe: 'events',
      responseType: 'text',
    }).pipe(tap(event => {
        if (event.type === HttpEventType.Sent) {
          console.log('Request was sent');
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }
    ));
  }
}
